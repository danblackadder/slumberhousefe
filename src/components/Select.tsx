import React, { useRef, useState } from 'react';
import { MdArrowDropDown, MdClose } from 'react-icons/md';

import useClickOutside from 'hooks/useClickOutside.hook';
import { capitalize } from 'utility/helper';

const Select = ({
  id,
  label,
  selected,
  setSelected,
  options,
  width,
  inline,
}: {
  id: string;
  label: string;
  selected: string | undefined;
  setSelected: (option: string | undefined) => void;
  options: string[];
  width?: number;
  inline?: boolean;
}) => {
  const [selectedItem, setSelectedItem] = useState<string | undefined>(selected || undefined);
  const [active, setActive] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside({ ref: wrapperRef, onClick: () => setActive(false) });

  return (
    <div
      id={id}
      className={`relative black ${inline ? 'flex-row align-center' : 'flex-column'} ${
        width && !inline ? `width-${width}` : 'full-width'
      }`}
    >
      <div className={`margin-bottom-4 ${inline && 'margin-right-8'}`}>{label}</div>
      <div
        className={`height-32 padding-4 font-16 border-neutral padding-right-8 flex-row align-center pointer  ${
          width ? `width-${width}` : 'full-width'
        }`}
      >
        <div className="flex-1" onClick={() => setActive(true)}>
          {selectedItem ? capitalize(selectedItem) : 'Select one...'}
        </div>
        {selectedItem ? (
          <div
            className="hover-primary height-20 pointer"
            onClick={() => {
              setSelectedItem(undefined);
              setSelected(undefined);
              setActive(false);
            }}
          >
            <MdClose size={20} />
          </div>
        ) : (
          <div className="height-20 pointer" onClick={() => setActive(true)}>
            <MdArrowDropDown size={20} />
          </div>
        )}
      </div>
      {active && (
        <div
          className={`absolute right-0 background-white border-neutral flex-column pointer max-height-200  ${
            width ? `width-${width}` : 'full-width'
          }`}
          style={{ top: inline ? 30 : 53, zIndex: 1 }}
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
