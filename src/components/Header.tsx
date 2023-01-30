import React from 'react';

const Header = ({ text }: { text: string }) => {
  return <div className="padding-bottom-16 font-48 primary">{text}</div>;
};

export default Header;
