import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, User, Phone, Mail, Loader2, CheckCircle, XCircle } from 'lucide-react';

interface Appointment {
  id: string;
  patient_name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
}

export const AppointmentsManager = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    loadAppointments();
  }, [statusFilter]);

  const loadAppointments = async () => {
    try {
      let query = supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error loading appointments:', error);
        toast({
          title: "Error",
          description: "Failed to load appointments",
          variant: "destructive",
        });
        return;
      }

      setAppointments(data || []);
    } catch (error) {
      console.error('Error loading appointments:', error);
      toast({
        title: "Error",
        description: "Failed to load appointments",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id: string, status: Appointment['status']) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Appointment ${status}!`,
      });

      loadAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast({
        title: "Error",
        description: "Failed to update appointment",
        variant: "destructive",
      });
    }
  };

  const deleteAppointment = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        const { error } = await supabase
          .from('appointments')
          .delete()
          .eq('id', id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Appointment deleted successfully!",
        });
        loadAppointments();
      } catch (error) {
        console.error('Error deleting appointment:', error);
        toast({
          title: "Error",
          description: "Failed to delete appointment",
          variant: "destructive",
        });
      }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="ml-2">Loading appointments...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Appointments Management</h2>
          <p className="text-muted-foreground">
            Manage patient appointments and bookings.
          </p>
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Appointments</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="hover-lift">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{appointment.patient_name}</CardTitle>
                    <CardDescription>{appointment.service}</CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(appointment.status)}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{appointment.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{appointment.email}</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  {appointment.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                        className="w-full"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                        className="w-full hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  )}
                  
                  {appointment.status === 'confirmed' && (
                    <Button
                      size="sm"
                      onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                      className="w-full btn-hero"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Complete
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteAppointment(appointment.id)}
                    className="w-full hover:bg-destructive hover:text-destructive-foreground"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              
              {appointment.notes && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm">{appointment.notes}</p>
                </div>
              )}
              
              <p className="text-xs text-muted-foreground mt-2">
                Booked on {new Date(appointment.created_at).toLocaleDateString()} at {new Date(appointment.created_at).toLocaleTimeString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {appointments.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Appointments</h3>
            <p className="text-muted-foreground">
              {statusFilter === 'all' 
                ? 'No appointments have been booked yet.'
                : `No ${statusFilter} appointments found.`
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};