import React from 'react';

interface CustomButtonProps {
  btnType: 'button' | 'submit' | 'reset';
  title: string;
  handleClick: () => void;
  styles?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ btnType, title, handleClick, styles }) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[42px] px-3 rounded-[200px] ${styles} hover:bg-violet-500 transition duration-300 ease-in-out`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
