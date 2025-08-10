import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const Admin = () => {
  const { user, userData, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/admin/login');
      } else if (!isAdmin) {
        navigate('/');
      }
    }
  }, [user, userData, loading, isAdmin, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Verifying access...</p>
        </Card>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return <AdminDashboard />;
};

export default Admin;