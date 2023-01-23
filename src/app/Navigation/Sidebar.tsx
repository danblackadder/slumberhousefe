import { GroupContext } from 'context/group.context';
import { GroupContextActionTypes } from 'models/group.context.types';
import React, { useContext } from 'react';
import { MdChat, MdDashboard, MdTask, MdFolder, MdSettings, MdHome } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="absolute left-0 top-0 shadow-light width-80 full-vh">
      <div className="padding-top-128 full-height padding-bottom-32">
        <div className="full-height flex-column justify-space-between">
          <div className="flex-column align-center flex-1">
            <Link to="/dashboard" className="highlight padding-vertical-16">
              <MdDashboard size={24} />
            </Link>
            <Link to="/tasks" className="highlight padding-vertical-16">
              <MdTask size={24} />
            </Link>
            <Link to="/chat" className="highlight padding-vertical-16">
              <MdChat size={24} />
            </Link>
            <Link to="/documents" className="highlight padding-vertical-16">
              <MdFolder size={24} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
