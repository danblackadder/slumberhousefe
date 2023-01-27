import React, { useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';

import { capitalize } from 'utility/helper';

const Select = ({
  id,
  label,
  selected,
  setSelected,
  options,
  width,
}: {
  id: string;
  label: string;
  selected: string;
  setSelected: (option: string) => void;
  options: string[];
  width: number;
}) => {
  const [selectedItem, setSelectedItem] = useState<string | undefined>(selected || undefined);
  const [active, setActive] = useState<boolean>(false);

  return (
    <div id={id} className={`relative black flex-column ${width ? `width-${width}` : 'full-width'}`}>
      <div className="margin-bottom-4">{label}</div>
      <div
        className="full-width height-32 padding-4 font-16 border-neutral padding-right-8 flex-row align-center pointer"
        onClick={() => setActive(true)}
      >
        <div className="flex-1">{selectedItem ? capitalize(selectedItem) : 'Select one...'}</div>
        <MdArrowDropDown />
      </div>
      {active && (
        <div
          className="absolute left-0 full-width background-white shadow-light flex-column pointer"
          style={{ top: 55, zIndex: 1 }}
        >
          {options.map((option) => (
            <div
              className="padding-8 hover-background-neutral"
              onClick={() => {
                setSelectedItem(option);
                setSelected(option);
                setActive(false);
              }}
            >
              {capitalize(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
