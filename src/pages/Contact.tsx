import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Here you would normally send data to Firebase
      console.log('Contact form data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 9876 543 210', '+91 9876 543 211'],
      subtext: 'Available 24/7 for emergencies'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@ayurcare.com', 'appointments@ayurcare.com'],
      subtext: 'We respond within 2-4 hours'
    },
    {
      icon: MapPin,
      title: 'Main Location',
      details: ['123 Wellness Street', 'Ayurveda District, Kerala 682001'],
      subtext: 'Visit our flagship center'
    },
    {
      icon: Clock,
      title: 'Operating Hours',
      details: ['Mon-Sat: 6:00 AM - 8:00 PM', 'Sun: 8:00 AM - 6:00 PM'],
      subtext: 'Extended hours available'
    }
  ];

  const locations = [
    {
      name: 'Main Center - Kerala',
      address: '123 Wellness Street, Ayurveda District, Kerala 682001',
      phone: '+91 9876 543 210',
      specialties: ['Panchakarma', 'Research', 'Training']
    },
    {
      name: 'Mumbai Branch',
      address: '456 Health Avenue, Bandra West, Mumbai 400050',
      phone: '+91 9876 543 220',
      specialties: ['Consultation', 'Herbal Medicine', 'Wellness']
    },
    {
      name: 'Delhi Branch',
      address: '789 Healing Road, Greater Kailash, New Delhi 110048',
      phone: '+91 9876 543 230',
      specialties: ['Urban Wellness', 'Corporate Health', 'Nutrition']
    },
    {
      name: 'Bangalore Branch',
      address: '321 Serenity Lane, Koramangala, Bangalore 560034',
      phone: '+91 9876 543 240',
      specialties: ['Tech Wellness', 'Stress Management', 'Lifestyle']
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
              <MessageSquare className="w-4 h-4 mr-2 text-accent" />
              <span className="text-sm font-medium text-accent">Get In Touch</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-6">
              We're Here to
              <span className="block text-accent">Help You Heal</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions about our treatments? Want to schedule a consultation? 
              Our team is ready to guide you on your journey to wellness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full card-elegant">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-3">{info.title}</h3>
                  <div className="space-y-1 mb-2">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-muted-foreground">{detail}</p>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground/80">{info.subtext}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 card-elegant">
                <h2 className="text-2xl font-bold text-primary mb-6">Send Us a Message</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
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
                              <Input placeholder="Enter your email" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="Message subject" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us how we can help you..." 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="btn-hero w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </Form>
              </Card>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 h-full card-elegant">
                <h2 className="text-2xl font-bold text-primary mb-6">Find Us</h2>
                <div className="relative h-64 bg-secondary/20 rounded-lg overflow-hidden mb-6">
                  {/* Google Map would be embedded here */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-accent mx-auto mb-2" />
                      <p className="text-muted-foreground">Interactive Map</p>
                      <p className="text-sm text-muted-foreground">AyurCare Main Center</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Main Center</h3>
                    <p className="text-muted-foreground">
                      123 Wellness Street<br />
                      Ayurveda District, Kerala 682001<br />
                      India
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Directions</h3>
                    <p className="text-muted-foreground text-sm">
                      Located in the heart of Kerala's traditional medicine district, 
                      easily accessible by metro, bus, and car. Parking available on-site.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
              Our Locations
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Visit any of our centers across India for personalized Ayurvedic care and consultation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full card-elegant">
                  <h3 className="text-lg font-semibold text-primary mb-3">{location.name}</h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 text-accent mt-1 mr-2 flex-shrink-0" />
                      <p className="text-muted-foreground text-sm">{location.address}</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-accent mr-2" />
                      <p className="text-muted-foreground text-sm">{location.phone}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {location.specialties.map((specialty, specialtyIndex) => (
                        <span 
                          key={specialtyIndex}
                          className="text-xs bg-accent/10 text-accent px-2 py-1 rounded"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}