
import React from 'react';

export const EcoBackground = () => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden opacity-10">
      {/* Leaves pattern */}
      <div className="absolute w-full h-full">
        {Array.from({ length: 15 }).map((_, i) => {
          const size = Math.random() * 40 + 10;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const delay = Math.random() * 5;
          const duration = Math.random() * 10 + 15;
          
          return (
            <div 
              key={i}
              className="absolute animate-float"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            >
              <svg viewBox="0 0 24 24" className="w-full h-full fill-current text-eco-500">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
};
