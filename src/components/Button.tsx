import React from 'react';

const Button = ({
  text,
  onClick,
  width,
  disabled,
}: {
  text: string;
  onClick?: () => void;
  width?: number;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`${width && `width-${width}`} ${
        disabled
          ? 'border-neutral neutral default'
          : 'pointer highlight border-highlight hover-background-highlight hover-white'
      } background-white center-items padding-horizontal-16 margin-vertical-8 padding-vertical-8 font-16 `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
