import React, { useState } from 'react';

const Accordion = ({ header, children }: { header: string; children: JSX.Element | JSX.Element[] }) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className="flex-column full-width margin-bottom-16 border-neutral">
      <div className="flex-row align-center full-width padding-8 font-20 primary">{header}</div>
      <div className="flow-column full-width">{children}</div>
    </div>
  );
};

export default Accordion;
