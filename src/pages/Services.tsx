import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Search, Clock, Star, Users, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function Services() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data - would come from Firestore
  const services = [
    {
      id: 1,
      title: 'Panchakarma Therapy',
      description: 'Complete detoxification and rejuvenation through five therapeutic actions including Vamana, Virechana, Basti, Nasya, and Raktamokshana.',
      shortDescription: 'Complete detoxification and rejuvenation therapy',
      duration: '7-21 days',
      rating: 4.9,
      patients: '2.5K+',
      category: 'therapy',
      image: '/api/placeholder/400/300',
      price: '₹15,000 - ₹45,000',
      conditions: ['Arthritis', 'Chronic Fatigue', 'Digestive Issues', 'Stress'],
      location: 'Ayur Center - Main Branch'
    },
    {
      id: 2,
      title: 'Ayurvedic Consultation',
      description: 'Comprehensive health assessment with pulse diagnosis, constitution analysis, and personalized treatment planning by certified Ayurvedic physicians.',
      shortDescription: 'Personalized health assessment and treatment planning',
      duration: '60 mins',
      rating: 4.8,
      patients: '5K+',
      category: 'consultation',
      image: '/api/placeholder/400/300',
      price: '₹1,500 - ₹3,000',
      conditions: ['General Health', 'Preventive Care', 'Chronic Conditions'],
      location: 'All Locations'
    },
    {
      id: 3,
      title: 'Herbal Medicine Therapy',
      description: 'Customized herbal formulations prepared from authentic herbs sourced from certified organic farms across India.',
      shortDescription: 'Natural remedies from authentic herbs',
      duration: 'Ongoing',
      rating: 4.9,
      patients: '8K+',
      category: 'medicine',
      image: '/api/placeholder/400/300',
      price: '₹500 - ₹5,000',
      conditions: ['Diabetes', 'Hypertension', 'Skin Disorders', 'Respiratory Issues'],
      location: 'Pharmacy Available'
    },
    {
      id: 4,
      title: 'Yoga & Meditation',
      description: 'Structured yoga sessions combined with meditation practices designed to enhance physical, mental, and spiritual wellbeing.',
      shortDescription: 'Holistic wellness through ancient practices',
      duration: '45-90 mins',
      rating: 4.7,
      patients: '3K+',
      category: 'wellness',
      image: '/api/placeholder/400/300',
      price: '₹800 - ₹2,000',
      conditions: ['Stress', 'Anxiety', 'Insomnia', 'Depression'],
      location: 'Wellness Center'
    },
    {
      id: 5,
      title: 'Abhyanga Massage',
      description: 'Traditional full-body oil massage using warm herbal oils to improve circulation, reduce stress, and promote deep relaxation.',
      shortDescription: 'Traditional herbal oil massage therapy',
      duration: '60-90 mins',
      rating: 4.8,
      patients: '4K+',
      category: 'therapy',
      image: '/api/placeholder/400/300',
      price: '₹2,500 - ₹4,000',
      conditions: ['Muscle Pain', 'Joint Stiffness', 'Stress', 'Insomnia'],
      location: 'Spa Center'
    },
    {
      id: 6,
      title: 'Shirodhara Treatment',
      description: 'Continuous pouring of warm medicated oil over the forehead to calm the nervous system and promote mental clarity.',
      shortDescription: 'Oil pouring therapy for mental wellness',
      duration: '45-60 mins',
      rating: 4.9,
      patients: '2K+',
      category: 'therapy',
      image: '/api/placeholder/400/300',
      price: '₹3,000 - ₹5,000',
      conditions: ['Anxiety', 'Migraine', 'Insomnia', 'Mental Stress'],
      location: 'Specialized Treatment Center'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'therapy', name: 'Therapies' },
    { id: 'consultation', name: 'Consultations' },
    { id: 'medicine', name: 'Medicines' },
    { id: 'wellness', name: 'Wellness' }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
              <Star className="w-4 h-4 mr-2 text-accent" />
              <span className="text-sm font-medium text-accent">Premium Services</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-6">
              Comprehensive
              <span className="block text-accent">Ayurvedic Treatments</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover our full range of authentic Ayurvedic treatments designed to restore balance, 
              promote healing, and enhance your overall wellbeing through time-tested practices.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search treatments, conditions, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 bg-background/80"
                  />
                </div>
                <div className="flex gap-2 flex-wrap lg:flex-nowrap">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="whitespace-nowrap"
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="card-elegant group cursor-pointer border-none overflow-hidden h-full">
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
                        {service.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Service Header */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* Service Stats */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.duration}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-accent" />
                        {service.rating}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {service.patients}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-lg font-semibold text-primary">{service.price}</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-sm text-muted-foreground mb-6">
                      <MapPin className="w-4 h-4 mr-1" />
                      {service.location}
                    </div>

                    {/* CTA */}
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1 group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all"
                        asChild
                      >
                        <Link to={`/services/${service.id}`}>
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link to="/book-appointment">
                          Book Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-lg">
                No services found matching your criteria. Please try a different search or category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
              Ready to Begin Your Healing Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Book a consultation with our expert practitioners to create a personalized treatment plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero" size="lg" asChild>
                <Link to="/book-appointment">
                  Book Appointment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}