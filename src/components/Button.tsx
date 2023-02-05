import React from 'react';

const Button = ({
  text,
  onClick,
  type,
  width,
  disabled,
}: {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'reset' | 'submit' | undefined;
  width?: number;
  disabled?: boolean;
}) => {
  return (
    <button
      type={type || 'button'}
      className={`${width && `width-${width}`} ${
        disabled
          ? 'border-neutral neutral default'
          : 'pointer primary border-primary hover-background-primary hover-white'
      } background-white center-items padding-horizontal-16 margin-vertical-8 padding-vertical-8 font-16 `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
