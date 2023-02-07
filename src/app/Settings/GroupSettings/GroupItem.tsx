import React, { useCallback, useContext, useState } from 'react';
import { MdDelete, MdEdit, MdOpenInNew, MdPeople } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { IGroupSetting } from 'models/settings.types';
import { getGroupName } from 'utility/helper';

import DeleteGroupModal from './DeleteGroupModal';
import GroupModal from './GroupModal';

const GroupItem = ({ group, updateGroups }: { group: IGroupSetting; updateGroups: () => void }) => {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  return (
    <>
      <div className="relative flex-row align-center margin-bottom-8 padding-left-16 border-neutral">
        <div className="width-200 padding-horizontal-8">{getGroupName({ name: group.name })}</div>
        <div className="width-100 padding-horizontal-8">{group.users}</div>
        <div className="flex-1 flex-row justify-flex-end">
          <Link
            className="height-40 width-40 center-items pointer black hover-primary"
            to={`/groups/${group._id}/users`}
          >
            <MdOpenInNew size={16} />
          </Link>
          <Link
            className="height-40 width-40 center-items pointer black hover-primary"
            to={`/groups/${group._id}/dashboard`}
          >
            <MdPeople size={16} />
          </Link>
          <div
            className="height-40 width-40 center-items pointer black hover-primary"
            onClick={() => setEditModal(true)}
          >
            <MdEdit size={16} />
          </div>
          <div
            className="height-40 width-40 center-items pointer error hover-primary"
            onClick={() => setDeleteModal(true)}
          >
            <MdDelete size={16} />
          </div>
        </div>
      </div>
      {editModal && (
        <GroupModal onClose={() => setEditModal(false)} group={group} updateGroups={updateGroups} edit={true} />
      )}
      {deleteModal && (
        <DeleteGroupModal onClose={() => setDeleteModal(false)} group={group} updateGroups={updateGroups} />
      )}
    </>
  );
};

export default GroupItem;
