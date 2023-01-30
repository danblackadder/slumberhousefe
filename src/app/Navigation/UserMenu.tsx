import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Dropdown from 'components/Dropdown';
import { UserContext } from 'context/user.context';
import { OrganizationRole } from 'models/settings.types';
import { UserContextActionTypes } from 'models/user.context.types';
import { getFullName } from 'utility/helper';

const UserMenu = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  const [active, setActive] = useState<boolean>(false);

  const menuItems = [
    {
      body: getFullName({ firstName: state.user?.firstName, lastName: state.user?.lastName }),
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

  return (
    <div className="relative">
      <div
        className="pointer border-circle-primary background-black height-32 width-32"
        onClick={() => setActive(true)}
      />
      {active && <Dropdown items={menuItems} width={200} onClose={() => setActive(false)} />}
    </div>
  );
};

export default UserMenu;
