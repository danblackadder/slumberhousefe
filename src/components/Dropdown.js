import React, { useRef } from 'react';
import useClickOutside from 'hooks/useClickOutside.hook';
const Dropdown = ({ items, width, onClose }) => {
  const wrapperRef = useRef(null);
  useClickOutside({ ref: wrapperRef, onClick: onClose });
  return React.createElement(
    'div',
    {
      ref: wrapperRef,
      className: `absolute right-0 top-40 shadow-light flex-column border-radius ${width && `width-${width}`}`,
    },
    items.map((item) => {
      return (
        !item.hide &&
        React.createElement(
          React.Fragment,
          null,
          item.hr && React.createElement('div', { className: 'border-bottom-primary margin-horizontal-16' }),
          React.createElement(
            'div',
            {
              className: `padding-horizontal-16 padding-vertical-8 ${
                item.onClick && 'pointer hover-background-neutral'
              }`,
              onClick: () => {
                if (item.onClick) {
                  item.onClick();
                  onClose();
                }
              },
            },
            item.body
          )
        )
      );
    })
  );
};
export default Dropdown;
