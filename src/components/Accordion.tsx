import React, { useState } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

const Accordion = ({ header, children }: { header: string; children: JSX.Element | JSX.Element[] }) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className="flex-column full-width margin-bottom-16 border-neutral">
      <div
        className="flex-row align-center justify-space-between full-width padding-8 font-20 pointer height-40"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1 primary">{header}</div>
        {open ? (
          <div className="black">
            <MdArrowDropUp size={16} />
          </div>
        ) : (
          <div className="black">
            <MdArrowDropDown size={16} />
          </div>
        )}
      </div>
      {open && <div className="flow-column full-width">{children}</div>}
    </div>
  );
};

export default Accordion;
