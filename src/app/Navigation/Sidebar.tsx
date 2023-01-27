import React, { useContext, useMemo } from 'react';
import { MdBarChart, MdChat, MdDashboard, MdFolder, MdPeople, MdTask } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { GroupContext } from 'context/group.context';
import { UserContext } from 'context/user.context';
import { GroupRole, OrganizationRole } from 'models/settings.types';

const Navigation = () => {
  const { state: userState } = useContext(UserContext);
  const { state: groupState } = useContext(GroupContext);

  const isAdmin = useMemo(() => {
    return (
      userState.user &&
      groupState.group &&
      ([OrganizationRole.OWNER, OrganizationRole.ADMIN].includes(userState.user.role) ||
        [GroupRole.ADMIN].includes(groupState.group.role))
    );
  }, [userState, groupState]);

  return (
    <div className="absolute left-0 top-0 shadow-light width-80 full-vh">
      <div className="padding-top-128 full-height padding-bottom-32">
        <div className="full-height flex-column justify-space-between">
          <div className="flex-column align-center flex-1">
            <Link to="/dashboard" className="primary padding-vertical-16">
              <MdDashboard size={24} />
            </Link>
            <Link to="/tasks" className="primary padding-vertical-16">
              <MdTask size={24} />
            </Link>
            <Link to="/chat" className="primary padding-vertical-16">
              <MdChat size={24} />
            </Link>
            <Link to="/documents" className="primary padding-vertical-16">
              <MdFolder size={24} />
            </Link>
            {isAdmin && (
              <>
                <Link to="/users" className="primary padding-vertical-16">
                  <MdPeople size={24} />
                </Link>
                <Link to="/reporting" className="primary padding-vertical-16">
                  <MdBarChart size={24} />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
