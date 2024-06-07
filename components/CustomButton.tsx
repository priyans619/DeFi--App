import React from 'react';

interface CustomButtonProps {
  btnType: 'button' | 'submit' | 'reset';
  title: string;
  handleClick: () => void;
  styles?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ btnType, title, handleClick }) => {
  return (
    <button
      type={btnType}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
