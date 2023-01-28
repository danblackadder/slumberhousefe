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
  return React.createElement(
    'div',
    { className: 'absolute left-0 top-0 shadow-light width-80 full-vh' },
    React.createElement(
      'div',
      { className: 'padding-top-128 full-height padding-bottom-32' },
      React.createElement(
        'div',
        { className: 'full-height flex-column justify-space-between' },
        React.createElement(
          'div',
          { className: 'flex-column align-center flex-1' },
          React.createElement(
            Link,
            { to: '/dashboard', className: 'primary padding-vertical-16' },
            React.createElement(MdDashboard, { size: 24 })
          ),
          React.createElement(
            Link,
            { to: '/tasks', className: 'primary padding-vertical-16' },
            React.createElement(MdTask, { size: 24 })
          ),
          React.createElement(
            Link,
            { to: '/chat', className: 'primary padding-vertical-16' },
            React.createElement(MdChat, { size: 24 })
          ),
          React.createElement(
            Link,
            { to: '/documents', className: 'primary padding-vertical-16' },
            React.createElement(MdFolder, { size: 24 })
          ),
          isAdmin &&
            React.createElement(
              React.Fragment,
              null,
              React.createElement(
                Link,
                { to: '/users', className: 'primary padding-vertical-16' },
                React.createElement(MdPeople, { size: 24 })
              ),
              React.createElement(
                Link,
                { to: '/reporting', className: 'primary padding-vertical-16' },
                React.createElement(MdBarChart, { size: 24 })
              )
            )
        )
      )
    )
  );
};
export default Navigation;
