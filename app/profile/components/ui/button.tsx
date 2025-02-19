'use client'; 

import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode; 
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
      onClick={onClick} 
    >
      {children}  Change photo
    </button>
  );
};

export default Button;
