import React from 'react';
const Stepper = ({ items, active }) => {
  return React.createElement(
    'div',
    { className: 'flex-row align-center full-width' },
    items.map((item, i) =>
      React.createElement(
        React.Fragment,
        null,
        React.createElement(
          'div',
          { className: 'flex-row align-center' },
          React.createElement(
            'div',
            {
              className: `${
                active === i ? 'border-circle-primary' : 'border-circle-neutral'
              } height-32 width-32 center-items margin-right-8`,
            },
            i + 1
          ),
          React.createElement('div', { className: 'margin-right-8' }, item)
        ),
        i < items.length - 1 && React.createElement('div', { className: 'border-bottom-neutral flex-1 margin-right-8' })
      )
    )
  );
};
export default Stepper;
