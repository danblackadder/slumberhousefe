import React from 'react';
import { MdClose } from 'react-icons/md';

const Modal = ({
  onClose,
  width,
  children,
}: {
  onClose: () => void;
  width?: number;
  children: JSX.Element | JSX.Element[] | false;
}) => {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 center-items" style={{ zIndex: 1000 }}>
      <div className="fixed top-0 right-0 bottom-0 left-0 center-items background-shadow" onClick={onClose} />
      <div className={`relative shadow-bold background-white padding-32 ${width && `width-${width}`}`}>
        <div className="absolute top-0 right-0 padding-8 pointer" onClick={onClose}>
          <MdClose size={24} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
