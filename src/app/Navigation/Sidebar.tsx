import React, { useContext, useMemo } from 'react';
import { MdBarChart, MdChat, MdDashboard, MdFolder, MdSettings, MdTask } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { UserContext } from 'context/user.context';
import { useGroup } from 'hooks/group.hook';
import { GroupRole, OrganizationRole } from 'models/settings.types';

const Sidebar = () => {
  const { state: userState } = useContext(UserContext);
  const { group } = useGroup();

  const isAdmin = useMemo(() => {
    return (
      userState.user?.role &&
      group &&
      ([OrganizationRole.OWNER, OrganizationRole.ADMIN].includes(userState.user.role) ||
        [GroupRole.ADMIN].includes(group.role))
    );
  }, [userState, group]);

  return (
    <div className="fixed left-0 top-0 shadow-light width-80 full-vh">
      <div className="padding-top-128 full-height padding-bottom-32">
        <div className="full-height flex-column">
          <div className="flex-column align-center flex-1">
            <Link to="" className="primary padding-vertical-16">
              <MdDashboard size={24} />
            </Link>
            <Link to="tasks" className="primary padding-vertical-16">
              <MdTask size={24} />
            </Link>
            <Link to="chat" className="primary padding-vertical-16">
              <MdChat size={24} />
            </Link>
            <Link to="documents" className="primary padding-vertical-16">
              <MdFolder size={24} />
            </Link>
          </div>
          {isAdmin && (
            <div className="flex-column align-center">
              <Link to="reporting" className="primary padding-vertical-16">
                <MdBarChart size={24} />
              </Link>
              <Link to="settings" className="primary padding-vertical-16">
                <MdSettings size={24} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
