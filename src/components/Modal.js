import React from 'react';
import { MdClose } from 'react-icons/md';
const Modal = ({ onClose, width, children }) => {
  return React.createElement(
    'div',
    { className: 'fixed top-0 right-0 bottom-0 left-0 center-items', style: { zIndex: 1000 } },
    React.createElement('div', {
      className: 'fixed top-0 right-0 bottom-0 left-0 center-items background-shadow',
      onClick: onClose,
    }),
    React.createElement(
      'div',
      { className: `relative shadow-bold background-white padding-32 ${width && `width-${width}`}` },
      React.createElement(
        'div',
        { className: 'absolute top-0 right-0 padding-8 pointer', onClick: onClose },
        React.createElement(MdClose, { size: 24 })
      ),
      children
    )
  );
};
export default Modal;
