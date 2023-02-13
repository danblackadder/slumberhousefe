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
    <div className="relative height-32 width-32">
      <div
        className="relative pointer border-circle-none background-neutral hover-border-primary center-items overflow-hidden"
        onClick={() => setActive(true)}
      >
        {state.user?.image && <img src={state.user.image} className="center-image" />}
      </div>
      {active && <Dropdown items={menuItems} width={200} onClose={() => setActive(false)} />}
    </div>
  );
};

export default UserMenu;
