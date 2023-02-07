import React, { useContext } from 'react';
import { MdHome, MdNotifications } from 'react-icons/md';
import { Link } from 'react-router-dom';

import UserMenu from './UserMenu';

const Topbar = () => {
  return (
    <div className="absolute top-0 full-vw height-64 flex-row justify-flex-end align-center padding-horizontal-32">
      <div className="margin-right-16 pointer">
        <Link to="/groups" className="primary">
          <MdHome size={24} />
        </Link>
      </div>
      <div className="margin-right-16 pointer">
        <MdNotifications size={24} className="primary" />
      </div>
      <UserMenu />
    </div>
  );
};

export default Topbar;
