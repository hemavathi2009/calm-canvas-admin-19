import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Mail, 
  Calendar, 
  Clock, 
  Edit,
  Save,
  Camera,
  LogOut,
  Stethoscope
} from 'lucide-react';

interface Appointment {
  id: string;
  service: string;
  date: string;
  time: string;
  status: string;
  created_at: string;
}

const Profile = () => {
  const { user, userData, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    
    if (userData) {
      setFullName(userData.fullName);
      loadUserAppointments();
    }
  }, [user, userData, navigate]);

  const loadUserAppointments = async () => {
    if (!user) return;
    
    try {
      const { data: appointments, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading appointments:', error);
        return;
      }

      setAppointments(appointments || []);
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user || !userData) return;
    
    try {
      const { error } = await supabase
        .from('users')
        .update({ 
          fullName,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
      
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user || !userData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Profile Header */}
            <Card className="card-elegant">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src="" alt={userData.fullName} />
                        <AvatarFallback className="text-xl bg-gradient-primary text-white">
                          {userData.fullName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Button 
                        size="sm" 
                        className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                        variant="outline"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{userData.fullName}</CardTitle>
                      <CardDescription className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{userData.email}</span>
                      </CardDescription>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                         <div className="flex items-center space-x-1">
                           <Calendar className="w-4 h-4" />
                           <span>Joined {new Date(userData.created_at).toLocaleDateString()}</span>
                         </div>
                         <div className="flex items-center space-x-1">
                           <Clock className="w-4 h-4" />
                           <span>Last seen {new Date(userData.last_seen).toLocaleDateString()}</span>
                         </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* Profile Edit Form */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal information and preferences.
                    </CardDescription>
                  </div>
                  {!editing ? (
                    <Button variant="outline" onClick={() => setEditing(true)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="space-x-2">
                      <Button variant="outline" onClick={() => setEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile} className="btn-hero">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={!editing}
                      className={editing ? "focus:ring-2 focus:ring-accent" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      value={userData.email}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <div>
                    <Badge variant={userData.role === 'admin' ? 'default' : 'secondary'}>
                      {userData.role === 'admin' ? 'Administrator' : 'Patient'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appointments History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Stethoscope className="w-5 h-5" />
                  <span>Your Appointments</span>
                </CardTitle>
                <CardDescription>
                  View your appointment history and upcoming bookings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Loading appointments...</p>
                  </div>
                ) : appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div 
                        key={appointment.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover-lift"
                      >
                        <div className="space-y-1">
                          <h4 className="font-medium">{appointment.service}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Stethoscope className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No Appointments Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't booked any appointments yet.
                    </p>
                    <Button 
                      onClick={() => navigate('/book-appointment')}
                      className="btn-hero"
                    >
                      Book Your First Appointment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;