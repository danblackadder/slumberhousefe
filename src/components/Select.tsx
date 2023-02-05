import React, { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import { MdArrowDropDown, MdClose } from 'react-icons/md';

import useClickOutside from 'hooks/useClickOutside.hook';
import { capitalize } from 'utility/helper';

const Select = <T,>({
  id,
  label,
  selectedItem,
  setSelectedItem,
  options,
  width,
  inline,
  required,
  placeholder = 'Select one...',
}: {
  id: string;
  label: string;
  selectedItem: T | undefined;
  setSelectedItem: Dispatch<SetStateAction<T | undefined>>;
  options: T[];
  width?: number;
  inline?: boolean;
  required?: boolean;
  placeholder?: string;
}) => {
  const [active, setActive] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside({ ref: wrapperRef, onClick: () => setActive(false) });

  const renderEndItem = useCallback(() => {
    if (selectedItem && !required) {
      return (
        <div
          className="hover-primary height-20 pointer"
          onClick={() => {
            setSelectedItem(undefined);
            setActive(false);
          }}
        >
          <MdClose size={20} />
        </div>
      );
    }

    return (
      <div className="height-20 pointer" onClick={() => setActive(true)}>
        <MdArrowDropDown size={20} />
      </div>
    );
  }, [selectedItem, required]);

  return (
    <div
      id={id}
      className={`relative margin-vertical-8 black ${inline ? 'flex-row align-center' : 'flex-column'} ${
        width && !inline ? `width-${width}` : 'full-width'
      }`}
    >
      <div className={`margin-bottom-4 ${inline && 'margin-right-8'}`}>{label}</div>
      <div ref={wrapperRef}>
        <div
          className={`height-32 padding-4 font-16 border-neutral padding-right-8 flex-row align-center pointer  ${
            width ? `width-${width}` : 'full-width'
          }`}
        >
          <div className="flex-1" onClick={() => setActive(!active)}>
            {selectedItem ? capitalize(selectedItem as string) : placeholder}
          </div>
          {renderEndItem()}
        </div>
        {active && (
          <div
            className={`absolute right-0 background-white border-neutral flex-column pointer max-height-200  ${
              width ? `width-${width}` : 'full-width'
            }`}
            style={{ top: inline ? 30 : 53, zIndex: 1 }}
          >
            {options.map((option) => (
              <div
                key={option as string}
                className="padding-8 margin-2 hover-background-neutral"
                onClick={() => {
                  setSelectedItem(option as T);
                  setActive(false);
                }}
              >
                {capitalize(option as string)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
