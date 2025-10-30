
import React from 'react';

const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M12 3L9.25 8.75L3.5 11.5L9.25 14.25L12 20L14.75 14.25L20.5 11.5L14.75 8.75L12 3Z"/>
        <path d="M5 3L6 5.5"/>
        <path d="M19 21L18 18.5"/>
        <path d="M21 5L18.5 6"/>
        <path d="M3 19L5.5 18"/>
    </svg>
);

export default SparkleIcon;
