import React, { useContext } from 'react';
import { MdHome, MdNotifications } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GroupContext } from 'context/group.context';
import { GroupContextActionTypes } from 'models/group.context.types';
import UserMenu from './UserMenu';
const Topbar = () => {
  const { dispatch } = useContext(GroupContext);
  const handleGroups = () => {
    dispatch({ type: GroupContextActionTypes.REMOVE_GROUP });
  };
  return React.createElement(
    'div',
    { className: 'absolute top-0 full-vw height-64 flex-row justify-flex-end align-center padding-horizontal-32' },
    React.createElement(
      'div',
      { className: 'margin-right-16 pointer' },
      React.createElement(
        Link,
        { to: '/groups', className: 'primary', onClick: () => handleGroups() },
        React.createElement(MdHome, { size: 24 })
      )
    ),
    React.createElement(
      'div',
      { className: 'margin-right-16 pointer' },
      React.createElement(MdNotifications, { size: 24, className: 'primary' })
    ),
    React.createElement(UserMenu, null)
  );
};
export default Topbar;
