
import React from 'react';
import { Leaf } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-eco-900 to-eco-950 py-8 text-eco-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <Leaf className="h-6 w-6 text-eco-300 mr-2" />
          <h3 className="font-heading text-xl font-bold text-white">EcoWise</h3>
        </div>
        <div className="mt-4 text-center text-eco-400 text-sm">
          <p>&copy; {new Date().getFullYear()} EcoWise Shopping Assistant</p>
        </div>
      </div>
    </footer>
  );
};
