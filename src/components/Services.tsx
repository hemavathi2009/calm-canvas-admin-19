import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Clock, Star, Users } from 'lucide-react';

export const Services = () => {
  const services = [
    {
      title: 'Panchakarma Therapy',
      description: 'Complete detoxification and rejuvenation through five therapeutic actions.',
      duration: '7-21 days',
      rating: 4.9,
      patients: '2.5K+',
      image: '🌿',
      features: ['Full Body Detox', 'Stress Relief', 'Immune Boost']
    },
    {
      title: 'Ayurvedic Consultation',
      description: 'Personalized health assessment and treatment plan by expert practitioners.',
      duration: '60 mins',
      rating: 4.8,
      patients: '5K+',
      image: '👨‍⚕️',
      features: ['Dosha Analysis', 'Custom Plan', 'Lifestyle Guide']
    },
    {
      title: 'Herbal Medicine',
      description: 'Natural remedies prepared from authentic herbs and traditional formulations.',
      duration: 'Ongoing',
      rating: 4.9,
      patients: '8K+',
      image: '🌱',
      features: ['Natural Healing', 'No Side Effects', 'Proven Results']
    },
    {
      title: 'Yoga & Meditation',
      description: 'Holistic wellness through ancient practices for mind, body and soul.',
      duration: '45-90 mins',
      rating: 4.7,
      patients: '3K+',
      image: '🧘‍♀️',
      features: ['Mental Peace', 'Physical Fitness', 'Spiritual Growth']
    },
    {
      title: 'Wellness Packages',
      description: 'Comprehensive health programs combining multiple therapies.',
      duration: '1-4 weeks',
      rating: 4.9,
      patients: '1.5K+',
      image: '💎',
      features: ['Complete Care', 'Best Value', 'Proven Results']
    },
    {
      title: 'Nutrition Counseling',
      description: 'Personalized diet plans based on your constitution and health goals.',
      duration: '30-45 mins',
      rating: 4.8,
      patients: '4K+',
      image: '🥗',
      features: ['Custom Diet', 'Healthy Recipes', 'Lifestyle Tips']
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
            <Star className="w-4 h-4 mr-2 text-accent" />
            <span className="text-sm font-medium text-accent">Our Services</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-primary mb-6">
            Comprehensive
            <span className="block text-accent">Healthcare Solutions</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From traditional Panchakarma to modern wellness programs, we offer a complete 
            range of Ayurvedic treatments tailored to your unique needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="card-elegant group cursor-pointer border-none"
            >
              {/* Service Icon */}
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {service.image}
              </div>

              {/* Service Header */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
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

              {/* Features */}
              <div className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button 
                variant="outline" 
                className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all"
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Button className="btn-hero">
            View All Services
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};