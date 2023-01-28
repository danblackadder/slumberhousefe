import React from 'react';
const Button = ({ text, onClick, width, disabled }) => {
  return React.createElement(
    'button',
    {
      className: `${width && `width-${width}`} ${
        disabled
          ? 'border-neutral neutral default'
          : 'pointer primary border-primary hover-background-primary hover-white'
      } background-white center-items padding-horizontal-16 margin-vertical-8 padding-vertical-8 font-16 `,
      onClick: onClick,
    },
    text
  );
};
export default Button;
