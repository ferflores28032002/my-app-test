import React from 'react';

interface TextDisplayProps {
  text: string;
  className?: string;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ text, className }) => {
  return <p className={`mt-4 text-sm ${className || ''}`}>{text}</p>;
};

export default TextDisplay;
