import React from 'react';

const Button = ({ text, primary, secondary, onClick }) => {
  const baseClasses = "w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center";
  
  const buttonClasses = primary
    ? `${baseClasses} bg-black text-white hover:bg-gray-800`
    : secondary
    ? `${baseClasses} bg-white text-black border border-gray-300 hover:bg-gray-50`
    : `${baseClasses} bg-gray-100 text-gray-700 hover:bg-gray-200`;

  return (
    <button 
      className={buttonClasses}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button; 