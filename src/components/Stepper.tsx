import React from 'react';

const Stepper = ({ items, active }: { items: string[]; active: number }) => {
  return (
    <div className="flex-row align-center full-width">
      {items.map((item, i) => (
        <>
          <div className="flex-row align-center">
            <div
              className={`${
                active === i ? 'border-circle-primary' : 'border-circle-neutral'
              } height-32 width-32 center-items margin-right-8`}
            >
              {i + 1}
            </div>
            <div className="margin-right-8">{item}</div>
          </div>
          {i < items.length - 1 && <div className="border-bottom-neutral flex-1 margin-right-8" />}
        </>
      ))}
    </div>
  );
};

export default Stepper;
