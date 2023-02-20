import React from 'react';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import Modal from 'components/Modal';
import { IUserSetting } from 'models/settings.types';
import { deleteSettingsUser } from 'network/settings.network';

const DeleteUserModal = ({
  user,
  onClose,
  updateUsers,
}: {
  user: IUserSetting;
  onClose: () => void;
  updateUsers: () => void;
}) => {
  const confirm = () => {
    deleteSettingsUser({ id: user._id })
      .then(() => {
        updateUsers();
        onClose();
        toast.success('User updated');
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went wrong...');
      });
  };
  return (
    <Modal onClose={onClose} width={500}>
      <div className="margin-bottom-4">
        Are you sure you want to permanently delete user: <span className="text-bold">{user.email}</span>.
      </div>
      <div className="margin-bottom-4 error">This can not be undone.</div>
      <div className="flex-row justify-space-between">
        <Button text="Cancel" onClick={() => onClose()} width={150} />
        <Button text="Confirm" onClick={() => confirm()} width={150} />
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
