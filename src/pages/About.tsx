import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, Award, Users, Clock, Leaf, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function About() {
  const teamMembers = [
    {
      name: 'Dr. Rajesh Sharma',
      designation: 'Chief Ayurvedic Physician',
      qualifications: 'BAMS, MD (Ayurveda), 25+ years experience',
      image: '/api/placeholder/300/400',
      specialization: 'Panchakarma & Chronic Diseases',
      experience: '25+ years'
    },
    {
      name: 'Dr. Priya Nair',
      designation: 'Senior Ayurvedic Consultant',
      qualifications: 'BAMS, PhD (Ayurveda), 18+ years experience',
      image: '/api/placeholder/300/400',
      specialization: 'Women\'s Health & Wellness',
      experience: '18+ years'
    },
    {
      name: 'Dr. Arjun Patel',
      designation: 'Panchakarma Specialist',
      qualifications: 'BAMS, MD (Panchakarma), 15+ years experience',
      image: '/api/placeholder/300/400',
      specialization: 'Detoxification & Rejuvenation',
      experience: '15+ years'
    },
    {
      name: 'Dr. Meera Gupta',
      designation: 'Ayurvedic Nutritionist',
      qualifications: 'BAMS, MSc (Nutrition), 12+ years experience',
      image: '/api/placeholder/300/400',
      specialization: 'Therapeutic Nutrition',
      experience: '12+ years'
    }
  ];

  const milestones = [
    { year: '1938', event: 'Foundation', description: 'AyurCare was founded by Vaidya Krishnan Nair' },
    { year: '1965', event: 'First Branch', description: 'Opened our first satellite clinic' },
    { year: '1982', event: 'Research Center', description: 'Established dedicated research facility' },
    { year: '1995', event: 'International Recognition', description: 'WHO collaboration began' },
    { year: '2005', event: 'Modern Integration', description: 'Integrated modern diagnostic tools' },
    { year: '2020', event: 'Digital Healthcare', description: 'Launched telemedicine services' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'Every patient receives personalized attention with genuine care and empathy.'
    },
    {
      icon: Leaf,
      title: 'Natural Healing',
      description: 'We believe in the power of nature to heal and restore balance to the body.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to maintaining the highest standards in traditional Ayurvedic practice.'
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'Building healthier communities through accessible and affordable healthcare.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
              <Heart className="w-4 h-4 mr-2 text-accent" />
              <span className="text-sm font-medium text-accent">Our Story</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-6">
              85+ Years of
              <span className="block text-accent">Healing Excellence</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Since 1938, AyurCare has been a beacon of traditional Ayurvedic healing, 
              combining ancient wisdom with modern care to serve over 100,000 patients worldwide.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { number: '100K+', label: 'Patients Treated' },
              { number: '85+', label: 'Years of Service' },
              { number: '50+', label: 'Expert Practitioners' },
              { number: '15+', label: 'Locations' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
                Founded on the Principles of 
                <span className="text-accent"> Ancient Wisdom</span>
              </h2>
              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  In 1938, Vaidya Krishnan Nair established AyurCare with a simple yet profound vision: 
                  to make authentic Ayurvedic healing accessible to everyone. What began as a small clinic 
                  in Kerala has now grown into a trusted network of healing centers across India.
                </p>
                <p className="text-lg leading-relaxed">
                  Our journey has been marked by unwavering commitment to traditional Ayurvedic principles, 
                  while embracing modern scientific validation. We've successfully treated over 100,000 patients, 
                  each with a unique story of healing and transformation.
                </p>
                <p className="text-lg leading-relaxed">
                  Today, AyurCare stands as a testament to the timeless efficacy of Ayurveda, 
                  continuing our founder's legacy of compassionate care and natural healing.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-card/90 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-2xl font-bold text-primary">1938</div>
                    <div className="text-sm text-muted-foreground">Foundation Year</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
              Our Journey Through Time
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Key milestones that shaped AyurCare into the trusted healthcare provider it is today.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="text-2xl font-bold text-accent mb-2">{milestone.year}</div>
                  <div className="text-lg font-semibold text-primary mb-2">{milestone.event}</div>
                  <div className="text-muted-foreground">{milestone.description}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 h-full card-elegant">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the world's most trusted Ayurvedic healthcare provider, making ancient 
                  healing wisdom accessible to modern lives while preserving the authenticity 
                  and integrity of traditional practices.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 h-full card-elegant">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide personalized, holistic healthcare through authentic Ayurvedic treatments, 
                  empowering individuals to achieve optimal health naturally while contributing to 
                  the global recognition and preservation of Ayurvedic science.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-br from-secondary/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide every aspect of our practice and patient care.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full card-elegant">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our team of certified Ayurvedic practitioners brings decades of experience and deep knowledge 
              of traditional healing practices.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden card-elegant group">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
                        {member.experience}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-primary mb-1">{member.name}</h3>
                    <p className="text-accent font-medium text-sm mb-2">{member.designation}</p>
                    <p className="text-muted-foreground text-xs mb-3">{member.qualifications}</p>
                    <p className="text-muted-foreground text-sm">{member.specialization}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
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
              Experience the AyurCare Difference
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of satisfied patients who have found healing and wellness through our authentic Ayurvedic treatments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero" size="lg" asChild>
                <Link to="/book-appointment">
                  Book Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/services">
                  View Our Services
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