import React from 'react';

const Button = ({
  text,
  onClick,
  type,
  width,
  disabled,
  variation = 'default',
}: {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'reset' | 'submit' | undefined;
  width?: number;
  disabled?: boolean;
  variation?: 'inline' | 'default';
}) => {
  return (
    <button
      type={type || 'button'}
      className={`${width && `width-${width}`} ${
        disabled
          ? 'border-neutral neutral default'
          : `pointer  ${variation === 'default' && 'primary border-primary hover-background-primary hover-white'} ${
              variation === 'inline' && 'black hover-primary'
            }`
      } center-items font-16 ${
        variation === 'default' && 'background-white padding-horizontal-16 margin-vertical-8 padding-vertical-8'
      } ${variation === 'inline' && 'outline-none border-none background-none'}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
