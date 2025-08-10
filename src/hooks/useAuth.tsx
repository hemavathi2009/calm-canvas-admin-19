import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface UserData {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'user';
  created_at: string;
  last_seen: string;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchUserData(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchUserData(session.user.id);
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user data:', error);
        return;
      }

      if (data) {
        setUserData(data);
        
        // Update last_seen
        await supabase
          .from('users')
          .update({ last_seen: new Date().toISOString() })
          .eq('id', userId);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if this is the admin login
      if (email === 'ayurvedic@h.com' && password === 'ayurvedic@h.com') {
        if (data.user) {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.user.id)
            .single();

          if (userError && userError.code === 'PGRST116') {
            // User doesn't exist, create admin user
            await supabase
              .from('users')
              .insert({
                id: data.user.id,
                email: email,
                fullName: 'Administrator',
                role: 'admin',
                created_at: new Date().toISOString(),
                last_seen: new Date().toISOString()
              });
          } else if (userData && userData.role !== 'admin') {
            await supabase.auth.signOut();
            throw new Error('Access denied. Admin privileges required.');
          }
        }
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Create user document in database
        await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: email,
            fullName: fullName,
            role: 'user',
            created_at: new Date().toISOString(),
            last_seen: new Date().toISOString()
          });
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const isAdmin = userData?.role === 'admin';

  const value = {
    user,
    userData,
    loading,
    signIn,
    signUp,
    logout,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};