import React from 'react';
import { BarLoader } from 'react-spinners';

import { FullWidth } from './Layout';

const Loading = () => {
  return (
    <FullWidth>
      <div className="container center-items">
        <BarLoader color="#fff" />
      </div>
    </FullWidth>
  );
};

export default Loading;
