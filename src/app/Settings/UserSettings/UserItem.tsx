import { IUserSetting, OrganizationRole } from 'models/settings.types';
import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { capitalize } from 'utility/helper';
import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';

const UserItem = ({ user, updateUsers }: { user: IUserSetting; updateUsers: () => void }) => {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  return (
    <>
      <div className="relative flex-row align-center margin-bottom-8 padding-left-16 border-neutral">
        <div className="width-50">
          <div className="border-circle background-neutral height-30 width-30" />
        </div>
        <div className="width-200 padding-horizontal-8">
          {user.firstName && user.lastName && `${user.firstName} ${user.lastName}`}
        </div>
        <div className="width-300 padding-horizontal-8">{user.email}</div>
        <div className="width-100 padding-horizontal-8">{capitalize(user.role)}</div>
        <div className="width-100 padding-horizontal-8">{capitalize(user.status)}</div>
        <div className="flex-1 flex-row justify-flex-end">
          <div
            className="height-40 width-40 center-items pointer black hover-primary"
            onClick={() => setEditModal(true)}
          >
            <MdEdit size={16} />
          </div>
          <div
            className={`height-40 width-40 center-items ${
              user.role === OrganizationRole.OWNER ? 'neutral' : 'pointer error hover-primary'
            }`}
            onClick={() => setDeleteModal(true)}
          >
            <MdDelete size={16} />
          </div>
        </div>
      </div>
      {editModal && <EditUserModal onClose={() => setEditModal(false)} user={user} updateUsers={updateUsers} />}
      {deleteModal && <DeleteUserModal onClose={() => setDeleteModal(false)} user={user} updateUsers={updateUsers} />}
    </>
  );
};

export default UserItem;
