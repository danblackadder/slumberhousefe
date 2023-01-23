import Button from 'components/Button';
import { IUserSetting } from 'models/settings.types';
import { getUsers } from 'network/settings';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import { capitalize } from 'utility/helper';
import InviteUserModal from './InviteUserModal';

const UserSettings = () => {
  const [users, setUsers] = useState<IUserSetting[]>([]);
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    getUsers()
      .then((res) => setUsers(res))
      .catch((err) => {
        console.log(err);
        toast.error('Something went wrong...');
      });
  }, []);

  return (
    <>
      <div className="flex-column">
        <div className="flex-row justify-flex-end">
          <Button text="Invite user" width={200} onClick={() => setModal(true)} />
        </div>
        <div className="flex-row margin-bottom-16 padding-left-16">
          <div className="width-200">Name</div>
          <div className="width-300">Email</div>
          <div className="width-100">Role</div>
          <div className="width-100">Status</div>
        </div>
        {users.map((user) => (
          <div className="relative flex-row align-center border-neutral margin-bottom-8 padding-left-16">
            <div className="width-200">{user.firstName && user.lastName && `${user.firstName} ${user.lastName}`}</div>
            <div className="width-300">{user.email}</div>
            <div className="width-100">{capitalize(user.role)}</div>
            <div className="width-100">{capitalize(user.status)}</div>
            <div className="flex-1 flex-row justify-flex-end">
              <div className="height-40 width-40 center-items pointer neutral hover-highlight">
                <MdEdit size={16} />
              </div>
              <div className="height-40 width-40 center-items pointer neutral hover-highlight">
                <MdDelete size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {modal && <InviteUserModal setModal={setModal} />}
    </>
  );
};

export default UserSettings;
