import React, { useContext, useState } from 'react';
import { MdDelete, MdOpenInNew, MdSettings } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { GroupContext } from 'context/group.context';
import { GroupContextActionTypes } from 'models/group.context.types';
import { getGroupName } from 'utility/helper';

import DeleteGroupModal from './DeleteGroupModal';
import { IGroup } from 'models/group.types';

const GroupItem = ({ group, updateGroups }: { group: IGroup; updateGroups: () => void }) => {
  const { dispatch } = useContext(GroupContext);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  return (
    <>
      <div className="relative flex-row align-center margin-bottom-8 padding-left-16 border-neutral">
        <div className="width-200 padding-horizontal-8">{getGroupName({ name: group.name })}</div>
        <div className="width-100 padding-horizontal-8">{group.users.length}</div>
        <div className="flex-1 flex-row justify-flex-end">
          <Link
            className="height-40 width-40 center-items pointer black hover-primary"
            to={`/groups/${group._id}/dashboard`}
            onClick={() => dispatch({ type: GroupContextActionTypes.SET_GROUP, payload: { group } })}
          >
            <MdOpenInNew size={16} />
          </Link>
          <Link
            className="height-40 width-40 center-items pointer black hover-primary"
            to={`/groups/${group._id}/settings`}
            onClick={() => dispatch({ type: GroupContextActionTypes.SET_GROUP, payload: { group } })}
          >
            <MdSettings size={16} />
          </Link>
          <div
            className="height-40 width-40 center-items pointer error hover-primary"
            onClick={() => setDeleteModal(true)}
          >
            <MdDelete size={16} />
          </div>
        </div>
      </div>
      {deleteModal && (
        <DeleteGroupModal onClose={() => setDeleteModal(false)} group={group} updateGroups={updateGroups} />
      )}
    </>
  );
};

export default GroupItem;
