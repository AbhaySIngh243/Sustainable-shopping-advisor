
import React, { useState, useRef, useEffect } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { ChatInterface } from '@/components/ChatInterface';
import { Footer } from '@/components/Footer';
import { LeafPattern } from '@/components/LeafPattern';
import { EcoBackground } from '@/components/EcoBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, TreeDeciduous, TreePalm, CloudSun } from 'lucide-react';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    setActiveSection('chat');
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-b from-white to-eco-50 font-sans">
      {/* Background patterns */}
      <EcoBackground />
      <LeafPattern className="top-0 right-0 w-72 h-72 text-leaf-300 rotate-45" />
      <LeafPattern className="bottom-0 left-0 w-80 h-80 text-eco-200 -rotate-12" />
      
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-sm shadow-md border-b border-eco-100' 
            : 'bg-transparent border-b border-transparent'
        }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Leaf className="h-6 w-6 text-eco-500 mr-2 animate-wiggle" />
              <span className="font-heading font-bold text-xl text-eco-800">EcoWise</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <Button variant="link" className="text-eco-700 hover:text-eco-900 hover:scale-105 transition-transform">About</Button>
              <Button variant="link" className="text-eco-700 hover:text-eco-900 hover:scale-105 transition-transform">Features</Button>
              <Button variant="link" className="text-eco-700 hover:text-eco-900 hover:scale-105 transition-transform">Resources</Button>
              <Button variant="link" className="text-eco-700 hover:text-eco-900 hover:scale-105 transition-transform">Contact</Button>
            </div>
            
            <Button 
              onClick={handleGetStarted}
              className="bg-eco-500 hover:bg-eco-600 text-white rounded-full px-4 py-2 hover:scale-105 transition-transform shadow-sm hover:shadow-md"
            >
              Try EcoWise
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className={activeSection === 'hero' ? 'block' : 'block'}>
        <HeroSection onGetStarted={handleGetStarted} />
      </section>
      
      {/* Features Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-eco-800 mb-4">
            Make Every Purchase <span className="text-eco-500">Count</span>
          </h2>
          <p className="text-eco-700 max-w-2xl mx-auto">
            Our AI-powered assistant helps you make informed decisions about the products you buy, 
            considering environmental impact, sustainability practices, and ethical manufacturing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm border-eco-100 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden opacity-0 animate-fade-in">
            <div className="h-2 bg-eco-500"></div>
            <CardContent className="pt-6">
              <div className="bg-eco-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 animate-float">
                <Leaf className="h-6 w-6 text-eco-600" />
              </div>
              <h3 className="font-heading text-xl font-medium text-eco-800 mb-2">Eco-friendly Alternatives</h3>
              <p className="text-eco-600">Discover sustainable swaps for your everyday products with lower environmental impact.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-eco-100 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden opacity-0 animate-fade-in-delay-1">
            <div className="h-2 bg-leaf-500"></div>
            <CardContent className="pt-6">
              <div className="bg-leaf-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 animate-float">
                <TreeDeciduous className="h-6 w-6 text-leaf-600" />
              </div>
              <h3 className="font-heading text-xl font-medium text-eco-800 mb-2">Brand Transparency</h3>
              <p className="text-eco-600">Learn about companies' sustainability practices and environmental commitments.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-eco-100 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden opacity-0 animate-fade-in-delay-2">
            <div className="h-2 bg-nature-500"></div>
            <CardContent className="pt-6">
              <div className="bg-nature-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 animate-float">
                <TreePalm className="h-6 w-6 text-nature-600" />
              </div>
              <h3 className="font-heading text-xl font-medium text-eco-800 mb-2">Carbon Footprint</h3>
              <p className="text-eco-600">Track the environmental impact of your purchases and reduce your carbon footprint.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-eco-100 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden opacity-0 animate-fade-in-delay-3">
            <div className="h-2 bg-eco-500"></div>
            <CardContent className="pt-6">
              <div className="bg-eco-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 animate-float">
                <CloudSun className="h-6 w-6 text-eco-600" />
              </div>
              <h3 className="font-heading text-xl font-medium text-eco-800 mb-2">Eco-Tips & Education</h3>
              <p className="text-eco-600">Get personalized sustainability tips and learn about environmental issues.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Chat Interface Section */}
      <section 
        ref={chatRef}
        id="chat" 
        className="py-16 container mx-auto px-4 sm:px-6 scroll-mt-20"
      >
        <div className="text-center mb-12 opacity-0 animate-fade-in">
          <h2 className="font-heading text-3xl font-bold text-eco-800 mb-4">
            Chat With Your <span className="text-eco-500">EcoWise</span> Assistant
          </h2>
          <p className="text-eco-700 max-w-2xl mx-auto">
            Ask questions, get recommendations, and learn how to make more sustainable choices.
          </p>
        </div>
        
        <ChatInterface />
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-eco-50 to-eco-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-eco-800 mb-4">
              What Our Users Say
            </h2>
            <p className="text-eco-700 max-w-2xl mx-auto">
              Join thousands of environmentally conscious shoppers who use EcoWise to make better choices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-md rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-eco-700 italic mb-4">
                  "EcoWise has completely changed how I shop. I've discovered so many sustainable brands I never knew existed!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-eco-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-eco-700 font-medium">JD</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-eco-900">Jamie Davis</h4>
                    <p className="text-sm text-eco-600">Eco Enthusiast</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-eco-700 italic mb-4">
                  "The product recommendations are spot on! I've managed to reduce my household plastic usage by over 70%."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-leaf-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-leaf-700 font-medium">SM</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-eco-900">Sarah Miller</h4>
                    <p className="text-sm text-eco-600">Zero-waste Advocate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-eco-700 italic mb-4">
                  "Being able to chat with EcoWise on-the-go has made shopping so much easier. It's like having an eco-expert in my pocket!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-nature-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-nature-700 font-medium">RK</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-eco-900">Robert Kim</h4>
                    <p className="text-sm text-eco-600">Conscious Consumer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
