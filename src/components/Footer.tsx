import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Send
} from 'lucide-react';

export const Footer = () => {
  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
    { name: 'Careers', path: '/careers' }
  ];

  const services = [
    'Panchakarma Therapy',
    'Ayurvedic Consultation',
    'Herbal Medicine',
    'Yoga & Meditation',
    'Wellness Packages',
    'Nutrition Counseling'
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold">AyurCare</span>
            </div>
            
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Experience the ancient wisdom of Ayurveda with modern healthcare excellence. 
              Your journey to holistic wellness starts here.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-3 text-accent flex-shrink-0" />
                <span className="text-sm">123 Wellness Street, Health City, HC 12345</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-accent flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-accent flex-shrink-0" />
                <span className="text-sm">contact@ayurcare.com</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-3 text-accent flex-shrink-0" />
                <span className="text-sm">Mon-Sat: 8AM-8PM, Sun: 9AM-5PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    to="/services"
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-200"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
            <p className="text-primary-foreground/80 mb-4 text-sm">
              Subscribe to our newsletter for health tips and updates.
            </p>
            
            <div className="space-y-4">
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-r-none"
                />
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-l-none">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Social Links */}
              <div>
                <p className="text-sm text-primary-foreground/80 mb-3">Follow Us</p>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-200 group"
                    >
                      <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-primary-foreground/60 mb-4 md:mb-0">
              © 2024 AyurCare. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-primary-foreground/60 hover:text-accent transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-primary-foreground/60 hover:text-accent transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                to="/cookies" 
                className="text-primary-foreground/60 hover:text-accent transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};