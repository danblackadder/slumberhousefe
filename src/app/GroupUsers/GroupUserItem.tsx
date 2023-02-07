import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

import { IGroup, IGroupUser } from 'models/group.types';
import { capitalize, getFullName } from 'utility/helper';

import EditUserModal from './EditGroupUserModal';
import RemoveUserModal from './RemoveGroupUserModal';

const GroupUserItem = ({
  groupId,
  user,
  updateUsers,
}: {
  groupId: string | undefined;
  user: IGroupUser;
  updateUsers: () => void;
}) => {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [removeModal, setRemoveModal] = useState<boolean>(false);

  useEffect(() => {
    updateUsers();
  }, [editModal, removeModal]);

  return (
    <>
      <div className="relative flex-row align-center margin-bottom-8 padding-left-16 border-neutral">
        <div className="width-50">
          <div className="border-circle background-neutral height-30 width-30" />
        </div>
        <div className="width-200 padding-horizontal-8">
          {getFullName({ firstName: user.firstName, lastName: user.lastName })}
        </div>
        <div className="width-300 padding-horizontal-8">{user.email}</div>
        <div className="width-200 padding-horizontal-8">{capitalize(user.role)}</div>
        <div className="flex-1 flex-row justify-flex-end">
          <div
            className="height-40 width-40 center-items pointer black hover-primary"
            onClick={() => setEditModal(true)}
          >
            <MdEdit size={16} />
          </div>
          <div
            className="height-40 width-40 center-items pointer error hover-primary"
            onClick={() => setRemoveModal(true)}
          >
            <MdDelete size={16} />
          </div>
        </div>
      </div>
      {editModal && (
        <EditUserModal onClose={() => setEditModal(false)} user={user} groupId={groupId} updateUsers={updateUsers} />
      )}
      {removeModal && (
        <RemoveUserModal
          onClose={() => setRemoveModal(false)}
          user={user}
          groupId={groupId}
          updateUsers={updateUsers}
        />
      )}
    </>
  );
};

export default GroupUserItem;
