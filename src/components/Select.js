import React, { useRef, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import useClickOutside from 'hooks/useClickOutside.hook';
import { capitalize } from 'utility/helper';
const Select = ({ id, label, selected, setSelected, options, width }) => {
  const [selectedItem, setSelectedItem] = useState(selected || undefined);
  const [active, setActive] = useState(false);
  const wrapperRef = useRef(null);
  useClickOutside({ ref: wrapperRef, onClick: () => setActive(false) });
  return React.createElement(
    'div',
    { id: id, className: `relative black flex-column ${width ? `width-${width}` : 'full-width'}` },
    React.createElement('div', { className: 'margin-bottom-4' }, label),
    React.createElement(
      'div',
      {
        className:
          'full-width height-32 padding-4 font-16 border-neutral padding-right-8 flex-row align-center pointer',
        onClick: () => setActive(true),
      },
      React.createElement('div', { className: 'flex-1' }, selectedItem ? capitalize(selectedItem) : 'Select one...'),
      React.createElement(MdArrowDropDown, null)
    ),
    active &&
      React.createElement(
        'div',
        {
          className: 'absolute left-0 full-width background-white border-neutral flex-column pointer max-height-200',
          style: { top: 53, zIndex: 1 },
          ref: wrapperRef,
        },
        options.map((option) =>
          React.createElement(
            'div',
            {
              key: option,
              className: 'padding-8 hover-background-neutral',
              onClick: () => {
                setSelectedItem(option);
                setSelected(option);
                setActive(false);
              },
            },
            capitalize(option)
          )
        )
      )
  );
};
export default Select;
