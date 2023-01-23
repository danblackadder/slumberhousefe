import React from 'react';

export const TabsContainer = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <div className="relative full-width flex-row align-center justify-flex-start border-bottom-neutral">{children}</div>
  );
};

export const Tab = ({
  text,
  active,
  onClick,
  disabled,
}: {
  text: string;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <div
      className={`height-32 width-128 center-items relative ${!disabled ? 'pointer' : 'default'}`}
      onClick={() => !disabled && onClick()}
    >
      <div className={`${disabled && 'neutral'}`}>{text}</div>
      {active && <div className="absolute border-bottom-highlight full-width" style={{ bottom: -2 }} />}
    </div>
  );
};
