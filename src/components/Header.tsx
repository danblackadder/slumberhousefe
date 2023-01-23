import React from 'react';

const Header = ({ text }: { text: string }) => {
  return <div className="padding-vertical-16 font-48 highlight">{text}</div>;
};

export default Header;
