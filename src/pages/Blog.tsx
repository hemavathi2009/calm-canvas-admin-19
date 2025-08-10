import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Search, Calendar, Clock, User, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data - would come from Firestore
  const blogPosts = [
    {
      id: 1,
      title: 'Understanding Your Dosha: A Complete Guide to Ayurvedic Body Types',
      excerpt: 'Discover how understanding your unique constitution can transform your approach to health, nutrition, and lifestyle choices.',
      content: 'Complete guide content here...',
      author: 'Dr. Rajesh Sharma',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'education',
      tags: ['Dosha', 'Constitution', 'Lifestyle'],
      image: '/api/placeholder/600/400',
      featured: true
    },
    {
      id: 2,
      title: '10 Ayurvedic Superfoods to Boost Your Immunity Naturally',
      excerpt: 'Explore traditional Ayurvedic ingredients that have been used for centuries to strengthen the immune system and promote vitality.',
      content: 'Detailed content about superfoods...',
      author: 'Dr. Meera Gupta',
      date: '2024-01-12',
      readTime: '6 min read',
      category: 'nutrition',
      tags: ['Immunity', 'Nutrition', 'Superfoods'],
      image: '/api/placeholder/600/400',
      featured: false
    },
    {
      id: 3,
      title: 'The Science Behind Panchakarma: Modern Research Validates Ancient Wisdom',
      excerpt: 'Recent scientific studies reveal how traditional Panchakarma treatments effectively detoxify the body and restore balance.',
      content: 'Research-based article content...',
      author: 'Dr. Arjun Patel',
      date: '2024-01-10',
      readTime: '12 min read',
      category: 'research',
      tags: ['Panchakarma', 'Research', 'Detox'],
      image: '/api/placeholder/600/400',
      featured: true
    },
    {
      id: 4,
      title: 'Stress Management Through Ayurveda: Natural Techniques for Modern Life',
      excerpt: 'Learn practical Ayurvedic techniques to manage stress, improve mental clarity, and achieve emotional balance in our fast-paced world.',
      content: 'Stress management techniques...',
      author: 'Dr. Priya Nair',
      date: '2024-01-08',
      readTime: '7 min read',
      category: 'wellness',
      tags: ['Stress', 'Mental Health', 'Meditation'],
      image: '/api/placeholder/600/400',
      featured: false
    },
    {
      id: 5,
      title: 'Seasonal Detox: Ayurvedic Cleansing Rituals for Spring',
      excerpt: 'Discover traditional spring cleansing practices that help eliminate accumulated toxins and prepare your body for renewed energy.',
      content: 'Seasonal detox guide...',
      author: 'Dr. Rajesh Sharma',
      date: '2024-01-05',
      readTime: '9 min read',
      category: 'lifestyle',
      tags: ['Detox', 'Seasonal', 'Cleansing'],
      image: '/api/placeholder/600/400',
      featured: false
    },
    {
      id: 6,
      title: 'Ayurvedic Beauty Secrets: Natural Skincare for Radiant Health',
      excerpt: 'Unveil time-tested beauty practices using natural ingredients to achieve healthy, glowing skin from the inside out.',
      content: 'Beauty and skincare tips...',
      author: 'Dr. Meera Gupta',
      date: '2024-01-03',
      readTime: '5 min read',
      category: 'beauty',
      tags: ['Skincare', 'Beauty', 'Natural'],
      image: '/api/placeholder/600/400',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'education', name: 'Education' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'research', name: 'Research' },
    { id: 'wellness', name: 'Wellness' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'beauty', name: 'Beauty' }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

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
              <BookOpen className="w-4 h-4 mr-2 text-accent" />
              <span className="text-sm font-medium text-accent">Knowledge Hub</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-6">
              Ayurvedic
              <span className="block text-accent">Wisdom & Insights</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Explore our collection of educational articles, research findings, and practical guides 
              to deepen your understanding of Ayurvedic principles and their modern applications.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search articles, topics, or tags..."
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

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-primary mb-8">Featured Articles</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="card-elegant group cursor-pointer border-none overflow-hidden h-full">
                      <div className="relative h-64 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.readTime}
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {post.author}
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <Button 
                          variant="outline" 
                          className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all"
                          asChild
                        >
                          <Link to={`/blog/${post.id}`}>
                            Read Article
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-primary mb-12"
          >
            Latest Articles
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="card-elegant group cursor-pointer border-none overflow-hidden h-full">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">{post.author}</div>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="group-hover:text-accent"
                        asChild
                      >
                        <Link to={`/blog/${post.id}`}>
                          Read More
                          <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-lg">
                No articles found matching your criteria. Please try a different search or category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
              Stay Updated with Ayurvedic Wisdom
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Subscribe to our newsletter and receive the latest articles, research findings, 
              and practical tips directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input 
                placeholder="Enter your email" 
                className="h-12"
              />
              <Button className="btn-hero h-12" size="lg">
                Subscribe
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}