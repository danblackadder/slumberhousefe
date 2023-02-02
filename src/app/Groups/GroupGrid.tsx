import React from 'react';

import { FlexGrid } from 'components/Layout';
import Loading from 'components/Loading';
import { IGroup } from 'models/group.types';

import Group from './Group';

const GroupGrid = ({ loading, groups }: { loading: boolean; groups: IGroup[] }) => {
  if (loading) {
    return <Loading color="primary" height={512} />;
  }
  if (groups.length > 0) {
    return (
      <FlexGrid>
        <>
          {groups.map((group) => (
            <Group key={group._id} group={group} />
          ))}
        </>
      </FlexGrid>
    );
  }

  return (
    <div className="text-center margin-top-64">
      You do not have access to any groups,
      <br />
      please speak to an admin to add you to a group.
    </div>
  );
};

export default GroupGrid;
