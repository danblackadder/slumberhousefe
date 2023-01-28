import React, { useRef, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';

import useClickOutside from 'hooks/useClickOutside.hook';
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
  selected: string | undefined;
  setSelected: (option: string) => void;
  options: string[];
  width?: number;
}) => {
  const [selectedItem, setSelectedItem] = useState<string | undefined>(selected || undefined);
  const [active, setActive] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside({ ref: wrapperRef, onClick: () => setActive(false) });

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
          className="absolute left-0 full-width background-white border-neutral flex-column pointer max-height-200"
          style={{ top: 53, zIndex: 1 }}
          ref={wrapperRef}
        >
          {options.map((option) => (
            <div
              key={option}
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
