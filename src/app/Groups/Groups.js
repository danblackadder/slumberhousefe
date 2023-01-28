import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from 'components/Button';
import Header from 'components/Header';
import { FlexGrid } from 'components/Layout';
import Loading from 'components/Loading';
import { UserContext } from 'context/user.context';
import { OrganizationRole, TabSettingsOptions } from 'models/settings.types';
import { getGroups } from 'network/group';
import Group from './Group';
const Groups = () => {
  const navigate = useNavigate();
  const { state } = useContext(UserContext);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (state.user) {
      getGroups()
        .then((res) => {
          setGroups(res);
        })
        .catch((err) => {
          console.log(err);
          toast.error('Something went wrong...');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [state.user]);
  if (loading) {
    return React.createElement(Loading, null);
  }
  return React.createElement(
    'div',
    { className: 'container flex-column' },
    React.createElement(
      'div',
      { className: 'margin-horizontal-90 flex-row align-center justify-space-between' },
      React.createElement(Header, { text: 'Groups' }),
      [OrganizationRole.OWNER, OrganizationRole.ADMIN].includes(state.user?.role || OrganizationRole.BASIC) &&
        React.createElement(Button, {
          text: 'Manage groups',
          width: 200,
          onClick: () => navigate(`/settings?option=${TabSettingsOptions.GROUPS}`),
        })
    ),
    React.createElement(
      'div',
      { className: 'margin-vertical-64' },
      groups.length > 0
        ? React.createElement(
            FlexGrid,
            null,
            React.createElement(
              React.Fragment,
              null,
              groups.map((group) => React.createElement(Group, { key: group._id, group: group }))
            )
          )
        : React.createElement(
            'div',
            { className: 'text-center margin-top-64' },
            'You do not have access to any groups,',
            React.createElement('br', null),
            'please speak to an admin to add you to a group.'
          )
    )
  );
};
export default Groups;
