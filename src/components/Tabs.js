import React from 'react';
export const TabsContainer = ({ children }) => {
  return React.createElement(
    'div',
    { className: 'relative full-width flex-row align-center justify-flex-start border-bottom-neutral' },
    children
  );
};
export const Tab = ({ text, active, onClick, disabled }) => {
  return React.createElement(
    'div',
    {
      className: `height-32 width-128 center-items relative ${!disabled ? 'pointer' : 'default'}`,
      onClick: () => !disabled && onClick(),
    },
    React.createElement('div', { className: `${disabled && 'neutral'}` }, text),
    active &&
      React.createElement('div', { className: 'absolute border-bottom-primary full-width', style: { bottom: -2 } })
  );
};
