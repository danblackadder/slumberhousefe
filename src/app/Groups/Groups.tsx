import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from 'context/user.context';
import Header from 'components/Header';
import { FlexGrid } from 'components/Layout';
import AddCompany from './AddGroup';
import Loading from 'components/Loading';
import { getGroups } from 'network/group';
import { IGroup } from 'models/group.types';
import { toast } from 'react-toastify';
import Group from './Group';

const Groups = () => {
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
      <div className="margin-left-90">
        <Header text="Groups" />
      </div>
      <div className="margin-vertical-64">
        <FlexGrid>
          <>
            {groups.length > 0 && groups.map((group) => <Group group={group} />)}
            <AddCompany />
          </>
        </FlexGrid>
      </div>
    </div>
  );
};

export default Groups;
