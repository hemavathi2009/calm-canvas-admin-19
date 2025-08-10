import { Button } from '@/components/ui/button';
import { Calendar, Play, CheckCircle } from 'lucide-react';
import heroImage from '@/assets/hero-hospital.jpg';

export const Hero = () => {
  const features = [
    'Expert Ayurvedic Practitioners',
    'Personalized Treatment Plans',
    'Natural Healing Methods',
    'Holistic Wellness Approach'
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Modern hospital interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-white">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <CheckCircle className="w-4 h-4 mr-2 text-accent" />
              <span className="text-sm font-medium">Trusted Healthcare Since 1995</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Holistic
              <span className="block text-shimmer">Healing</span>
              For Life
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
              Experience ancient wisdom meets modern care. Our expert practitioners provide 
              personalized Ayurvedic treatments for complete wellness and natural healing.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-hero group">
                <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Book Consultation
              </Button>
              <Button className="btn-glass group">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Our Story
              </Button>
            </div>
          </div>

          {/* Right Column - Stats/Info Cards */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { number: '25+', label: 'Years Experience', icon: '🏥' },
              { number: '10K+', label: 'Happy Patients', icon: '😊' },
              { number: '50+', label: 'Expert Doctors', icon: '👨‍⚕️' },
              { number: '24/7', label: 'Emergency Care', icon: '🚑' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="card-glass text-center hover-lift group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};