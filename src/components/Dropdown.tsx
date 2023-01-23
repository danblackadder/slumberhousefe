import useClickOutside from 'hooks/useClickOutside.hook';
import { IDropdownItems } from 'models/component.types';
import React, { useRef } from 'react';

const Dropdown = ({ items, width, onClose }: { items: IDropdownItems[]; width: number; onClose: () => void }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside({ ref: wrapperRef, onClick: onClose });

  return (
    <div
      ref={wrapperRef}
      className={`absolute right-0 top-40 shadow-light flex-column border-radius ${width && `width-${width}`}`}
    >
      {items.map((item) => (
        <>
          {item.hr && <div className="border-bottom-highlight margin-horizontal-16" />}
          <div
            className={`padding-horizontal-16 padding-vertical-8 ${item.onClick && 'pointer hover-background-neutral'}`}
            onClick={() => {
              if (item.onClick) {
                item.onClick();
                onClose();
              }
            }}
          >
            {item.body}
          </div>
        </>
      ))}
    </div>
  );
};

export default Dropdown;
