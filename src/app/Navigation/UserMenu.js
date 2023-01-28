import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'components/Dropdown';
import { UserContext } from 'context/user.context';
import { OrganizationRole } from 'models/settings.types';
import { UserContextActionTypes } from 'models/user.context.types';
const UserMenu = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const [active, setActive] = useState(false);
  const menuItems = [
    {
      body: `${state.user?.firstName} ${state.user?.lastName}`,
    },
    {
      body: 'Profile',
      onClick: () => navigate('/profile'),
      hr: true,
    },
    {
      body: 'Settings',
      onClick: () => navigate('/settings'),
      hide: ![OrganizationRole.OWNER, OrganizationRole.ADMIN].includes(state.user?.role || OrganizationRole.BASIC),
    },
    {
      body: 'Logout',
      onClick: () => {
        dispatch({ type: UserContextActionTypes.LOGOUT });
        navigate('/login');
      },
    },
  ];
  return React.createElement(
    'div',
    { className: 'relative' },
    React.createElement('div', {
      className: 'pointer border-circle-primary background-black height-32 width-32',
      onClick: () => setActive(true),
    }),
    active && React.createElement(Dropdown, { items: menuItems, width: 200, onClose: () => setActive(false) })
  );
};
export default UserMenu;
