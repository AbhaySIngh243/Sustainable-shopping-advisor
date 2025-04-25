
import React, { useState, useRef } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { EcoBackground } from '@/components/EcoBackground';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';
import { Leaf, BarChart2, Book } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('chat');
  const [scrolled, setScrolled] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-b from-white to-eco-50 font-sans">
      <EcoBackground />
      
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-sm shadow-md border-b border-eco-100' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Leaf className="h-6 w-6 text-eco-500 mr-2 animate-wiggle" />
              <span className="font-heading font-bold text-xl text-eco-800">EcoWise</span>
            </div>
            <div className="hidden md:flex space-x-4">
              <Button 
                variant="ghost" 
                className="text-eco-700 hover:text-eco-500"
                onClick={() => scrollToSection(chatRef)}
              >
                Chat
              </Button>
              <Button 
                variant="ghost" 
                className="text-eco-700 hover:text-eco-500"
                onClick={() => scrollToSection(featuresRef)}
              >
                Features
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Chat Interface Section */}
      <section 
        ref={chatRef}
        id="chat" 
        className="py-16 container mx-auto px-4 sm:px-6 scroll-mt-20"
      >
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-eco-800 mb-4">
            Chat With Your <span className="text-eco-500">EcoWise</span> Assistant
          </h2>
          <p className="text-eco-700 max-w-2xl mx-auto">
            Ask questions and get recommendations for sustainable choices.
          </p>
        </div>
        
        <ChatInterface />
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        id="features"
        className="py-16 container mx-auto px-4 sm:px-6 scroll-mt-20 bg-white/60 backdrop-blur-sm rounded-3xl my-8 shadow-sm border border-eco-100"
      >
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-eco-800 mb-4">
            Key Features
          </h2>
          <p className="text-eco-700 max-w-2xl mx-auto">
            Tools to help you make sustainable choices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-white/80 backdrop-blur-sm border-eco-100 hover:shadow-md transition-all hover:-translate-y-1">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-eco-100 text-eco-600 flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl text-eco-800">Eco Recommendations</CardTitle>
              <CardDescription className="text-eco-600">
                Get personalized eco-friendly product alternatives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-eco-700">
                Our AI assistant analyzes your preferences and suggests sustainable options that match your needs.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-eco-100 hover:shadow-md transition-all hover:-translate-y-1">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-eco-100 text-eco-600 flex items-center justify-center mb-4">
                <BarChart2 className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl text-eco-800">Impact Tracking</CardTitle>
              <CardDescription className="text-eco-600">
                See the difference your choices make
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-eco-700">
                Track your environmental impact and see how your sustainable choices contribute to a healthier planet.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-eco-100 hover:shadow-md transition-all hover:-translate-y-1">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-eco-100 text-eco-600 flex items-center justify-center mb-4">
                <Book className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl text-eco-800">Eco Education</CardTitle>
              <CardDescription className="text-eco-600">
                Learn about sustainable practices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-eco-700">
                Access educational resources about sustainable living, eco-friendly materials, and environmental impact.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
