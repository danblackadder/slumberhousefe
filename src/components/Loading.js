import React from 'react';
import { BarLoader } from 'react-spinners';
import { FullWidth } from './Layout';
const Loading = () => {
  return React.createElement(
    FullWidth,
    null,
    React.createElement(
      'div',
      { className: 'container center-items' },
      React.createElement(BarLoader, { color: '#fff' })
    )
  );
};
export default Loading;
