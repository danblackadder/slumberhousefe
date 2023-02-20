import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import Header from 'components/Header';
import { UserContext } from 'context/user.context';
import { IGroup } from 'models/group.types';
import { OrganizationRole, OrganizationTabSettings } from 'models/settings.types';
import { getGroups } from 'network/group.network';

import GroupGrid from './GroupGrid';

const Groups = () => {
  const navigate = useNavigate();
  const { state } = useContext(UserContext);

  const [groups, setGroups] = useState<IGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <div className="container flex-column">
      <div className="margin-horizontal-90 flex-row align-center justify-space-between">
        <Header text="Groups" />
        {[OrganizationRole.OWNER, OrganizationRole.ADMIN].includes(state.user?.role || OrganizationRole.BASIC) && (
          <Button
            text="Manage groups"
            width={200}
            onClick={() => navigate(`/settings?option=${OrganizationTabSettings.GROUPS}`)}
          />
        )}
      </div>
      <div className="margin-vertical-64">
        <GroupGrid loading={loading} groups={groups} />
      </div>
    </div>
  );
};

export default Groups;
