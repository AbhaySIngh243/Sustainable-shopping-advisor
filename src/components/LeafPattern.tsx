
import React from 'react';

interface LeafPatternProps {
  className?: string;
}

export const LeafPattern: React.FC<LeafPatternProps> = ({ className }) => {
  return (
    <div className={`absolute pointer-events-none opacity-20 ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <g fill="currentColor" className="text-eco-500">
          <path d="M45,50 Q100,0 145,50 T245,50 T345,50 T445,50 Q500,100 445,150 T345,150 T245,150 T145,150 Q90,200 145,250 T245,250 T345,250 T445,250 Q500,300 445,350 T345,350 T245,350 T145,350 Q90,400 145,450 T245,450 T345,450 T445,450" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="145" cy="50" r="8" />
          <circle cx="245" cy="50" r="8" />
          <circle cx="345" cy="50" r="8" />
          <circle cx="445" cy="50" r="8" />
          <circle cx="145" cy="150" r="8" />
          <circle cx="245" cy="150" r="8" />
          <circle cx="345" cy="150" r="8" />
          <circle cx="445" cy="150" r="8" />
          <circle cx="145" cy="250" r="8" />
          <circle cx="245" cy="250" r="8" />
          <circle cx="345" cy="250" r="8" />
          <circle cx="445" cy="250" r="8" />
          <circle cx="145" cy="350" r="8" />
          <circle cx="245" cy="350" r="8" />
          <circle cx="345" cy="350" r="8" />
          <circle cx="445" cy="350" r="8" />
          <circle cx="145" cy="450" r="8" />
          <circle cx="245" cy="450" r="8" />
          <circle cx="345" cy="450" r="8" />
          <circle cx="445" cy="450" r="8" />
        </g>
      </svg>
    </div>
  );
};
