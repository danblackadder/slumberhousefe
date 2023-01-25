import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from 'context/user.context';
import Header from 'components/Header';
import { FlexGrid } from 'components/Layout';
import Loading from 'components/Loading';
import { getGroups } from 'network/group';
import { IGroup } from 'models/group.types';
import { toast } from 'react-toastify';
import Group from './Group';
import { OrganizationRole, TabSettingsOptions } from 'models/settings.types';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container flex-column">
      <div className="margin-left-90 flex-row align-flex-end justify-space-between">
        <Header text="Groups" />
        {[OrganizationRole.OWNER, OrganizationRole.ADMIN].includes(state.user?.role || OrganizationRole.BASIC) && (
          <Button
            text="Manage groups"
            width={200}
            onClick={() => navigate(`/settings?option=${TabSettingsOptions.GROUPS}`)}
          />
        )}
      </div>
      <div className="margin-vertical-64">
        {groups.length > 0 ? (
          <FlexGrid>
            <>
              {groups.map((group) => (
                <Group group={group} />
              ))}
            </>
          </FlexGrid>
        ) : (
          <div className="text-center margin-top-64">
            You do not have access to any groups,
            <br />
            please speak to an admin to add you to a group.
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;
