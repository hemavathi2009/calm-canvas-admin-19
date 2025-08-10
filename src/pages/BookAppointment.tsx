import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CalendarDays, Clock, User, Phone, Mail, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const appointmentSchema = z.object({
  service: z.string().min(1, 'Please select a service'),
  practitioner: z.string().min(1, 'Please select a practitioner'),
  date: z.date({ required_error: 'Please select a date' }),
  timeSlot: z.string().min(1, 'Please select a time slot'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  age: z.string().min(1, 'Please enter your age'),
  gender: z.string().min(1, 'Please select your gender'),
  location: z.string().min(1, 'Please select a location'),
  healthConcerns: z.string().optional(),
  previousTreatments: z.string().optional(),
  notes: z.string().optional()
});

type AppointmentData = z.infer<typeof appointmentSchema>;

export default function BookAppointment() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();

  const form = useForm<AppointmentData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      service: '',
      practitioner: '',
      timeSlot: '',
      fullName: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      location: '',
      healthConcerns: '',
      previousTreatments: '',
      notes: ''
    }
  });

  const services = [
    { id: 'consultation', name: 'Ayurvedic Consultation', duration: '60 mins', price: '₹1,500' },
    { id: 'panchakarma', name: 'Panchakarma Therapy', duration: '7-21 days', price: '₹15,000+' },
    { id: 'abhyanga', name: 'Abhyanga Massage', duration: '90 mins', price: '₹3,500' },
    { id: 'shirodhara', name: 'Shirodhara Treatment', duration: '60 mins', price: '₹4,000' },
    { id: 'yoga', name: 'Yoga & Meditation', duration: '60 mins', price: '₹1,200' },
    { id: 'nutrition', name: 'Nutrition Counseling', duration: '45 mins', price: '₹2,000' }
  ];

  const practitioners = [
    { id: 'dr-sharma', name: 'Dr. Rajesh Sharma', specialization: 'Chief Physician', experience: '25+ years' },
    { id: 'dr-nair', name: 'Dr. Priya Nair', specialization: 'Women\'s Health', experience: '18+ years' },
    { id: 'dr-patel', name: 'Dr. Arjun Patel', specialization: 'Panchakarma', experience: '15+ years' },
    { id: 'dr-gupta', name: 'Dr. Meera Gupta', specialization: 'Nutrition', experience: '12+ years' }
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM', '06:00 PM'
  ];

  const locations = [
    { id: 'kerala-main', name: 'Main Center - Kerala', address: '123 Wellness Street, Kerala' },
    { id: 'mumbai', name: 'Mumbai Branch', address: '456 Health Avenue, Mumbai' },
    { id: 'delhi', name: 'Delhi Branch', address: '789 Healing Road, Delhi' },
    { id: 'bangalore', name: 'Bangalore Branch', address: '321 Serenity Lane, Bangalore' }
  ];

  const onSubmit = async (data: AppointmentData) => {
    setIsSubmitting(true);
    try {
      // Here you would normally save to Firebase
      console.log('Appointment data:', { ...data, date: selectedDate });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowConfirmation(true);
      toast({
        title: "Appointment booked successfully!",
        description: "We'll send you a confirmation email shortly.",
      });
      
    } catch (error) {
      toast({
        title: "Booking failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <Navigation />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 text-center card-elegant">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <h1 className="text-3xl font-bold text-primary mb-4">
                Appointment Confirmed!
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Thank you for choosing AyurCare. We've received your appointment request 
                and will send you a confirmation email with all the details shortly.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center text-muted-foreground">
                  <CalendarDays className="w-5 h-5 mr-2" />
                  <span>Confirmation email will arrive within 5 minutes</span>
                </div>
                <div className="flex items-center justify-center text-muted-foreground">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>Our team will call you 24 hours before your appointment</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-hero" onClick={() => window.location.href = '/'}>
                  Back to Home
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" onClick={() => {
                  setShowConfirmation(false);
                  form.reset();
                  setSelectedDate(undefined);
                }}>
                  Book Another Appointment
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
            <CalendarDays className="w-4 h-4 mr-2 text-accent" />
            <span className="text-sm font-medium text-accent">Book Appointment</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
            Schedule Your
            <span className="block text-accent">Wellness Session</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Take the first step towards holistic healing. Book a consultation with our expert 
            Ayurvedic practitioners and begin your personalized wellness journey.
          </p>
        </motion.div>

        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 card-elegant">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Service Selection */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-primary">Select Service & Practitioner</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {services.map((service) => (
                                <SelectItem key={service.id} value={service.id}>
                                  <div className="flex flex-col">
                                    <span>{service.name}</span>
                                    <span className="text-sm text-muted-foreground">
                                      {service.duration} • {service.price}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="practitioner"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Practitioner</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a practitioner" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {practitioners.map((practitioner) => (
                                <SelectItem key={practitioner.id} value={practitioner.id}>
                                  <div className="flex flex-col">
                                    <span>{practitioner.name}</span>
                                    <span className="text-sm text-muted-foreground">
                                      {practitioner.specialization} • {practitioner.experience}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a location" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {locations.map((location) => (
                              <SelectItem key={location.id} value={location.id}>
                                <div className="flex flex-col">
                                  <span>{location.name}</span>
                                  <span className="text-sm text-muted-foreground">{location.address}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Date & Time Selection */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-primary">Select Date & Time</h2>
                  
                  <div className="grid lg:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Date</FormLabel>
                          <FormControl>
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={(date) => {
                                setSelectedDate(date);
                                field.onChange(date);
                              }}
                              disabled={(date) => date < new Date() || date.getDay() === 0}
                              className="rounded-md border p-3"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="timeSlot"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Time</FormLabel>
                          <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map((slot) => (
                              <Button
                                key={slot}
                                type="button"
                                variant={field.value === slot ? "default" : "outline"}
                                size="sm"
                                onClick={() => field.onChange(slot)}
                                className="h-10"
                              >
                                {slot}
                              </Button>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-primary">Personal Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                              <Input placeholder="Enter your full name" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                              <Input placeholder="Enter your email" type="email" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                              <Input placeholder="Enter your phone number" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your age" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Health Information */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-primary">Health Information</h2>
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="healthConcerns"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Health Concerns</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please describe your current health concerns or symptoms..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="previousTreatments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Previous Treatments or Medications</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please list any previous treatments, medications, or therapies you've tried..."
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any additional information you'd like to share..."
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button 
                    type="submit" 
                    className="btn-hero w-full h-12 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Processing...
                      </div>
                    ) : (
                      <>
                        Book Appointment
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                  
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    By booking this appointment, you agree to our terms of service and privacy policy.
                    A confirmation email will be sent to you after booking.
                  </p>
                </div>
              </form>
            </Form>
          </Card>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}