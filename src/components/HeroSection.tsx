
import React from 'react';
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <div className="relative overflow-hidden pt-16 pb-8 md:pt-24 md:pb-12 min-h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 bg-gradient-to-br from-eco-50 to-eco-100 opacity-50 -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center p-2 bg-eco-100 rounded-full mb-6 animate-float">
            <Leaf className="w-6 h-6 text-eco-600" />
          </div>

          <h1 className="font-heading text-3xl md:text-5xl font-bold text-eco-950 mb-4 opacity-0 animate-fade-in">
            Shop <span className="text-eco-500">Sustainably</span>, Live <span className="text-leaf-500">Naturally</span>
          </h1>

          <p className="text-eco-800 max-w-xl text-lg mb-8 opacity-0 animate-fade-in-delay-1">
            Get personalized eco-friendly product recommendations and learn how your shopping choices can make a positive impact on our planet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-delay-2">
            <Button 
              onClick={onGetStarted} 
              className="bg-eco-500 hover:bg-eco-600 text-white font-medium px-8 py-6 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              Chat with EcoWise
            </Button>
            <Button
              variant="outline"
              className="border-eco-300 text-eco-700 hover:bg-eco-50 font-medium px-8 py-6 rounded-full hover:scale-105 transition-all"
            >
              Learn More
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-3 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-sm">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-eco-200 flex items-center justify-center text-eco-600">🌱</div>
              <div className="w-8 h-8 rounded-full bg-leaf-200 flex items-center justify-center text-leaf-600">♻️</div>
              <div className="w-8 h-8 rounded-full bg-nature-200 flex items-center justify-center text-nature-600">🌎</div>
            </div>
            <span className="text-sm text-eco-800">Joined by 2,000+ eco-conscious shoppers</span>
          </div>
        </div>
      </div>
    </div>
  );
};
