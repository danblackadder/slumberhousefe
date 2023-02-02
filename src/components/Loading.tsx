import React from 'react';
import { BarLoader } from 'react-spinners';

const Loading = ({ color, height }: { color?: string; height?: number }) => {
  return (
    <div className={`container center-items ${height ? `height-${height}` : 'hieight-256'}`}>
      <BarLoader color={color === 'primary' ? '#ff862e' : '#fff'} />
    </div>
  );
};

export default Loading;
