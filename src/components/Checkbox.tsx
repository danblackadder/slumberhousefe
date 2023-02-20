import React from 'react';
import { MdOutlineCheck } from 'react-icons/md';

const Checkbox = ({ checked, setChecked }: { checked: boolean; setChecked: () => void }) => {
  return (
    <div
      className={`height-16 width-16 pointer primary center-items ${checked ? 'border-primary' : 'border-neutral'}`}
      onClick={setChecked}
    >
      {checked && <MdOutlineCheck />}
    </div>
  );
};

export default Checkbox;
