import React from 'react';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import Modal from 'components/Modal';
import { IGroupUser } from 'models/group.types';
import { removeGroupUser } from 'network/group.network';

const RemoveUserModal = ({
  user,
  groupId,
  onClose,
  updateUsers,
}: {
  user: IGroupUser;
  groupId: string | undefined;
  onClose: () => void;
  updateUsers: () => void;
}) => {
  const confirm = () => {
    if (groupId) {
      removeGroupUser({ groupId, userId: user._id })
        .then(() => {
          updateUsers();
          onClose();
          toast.success('User removed');
        })
        .catch((err) => {
          console.log(err);
          toast.error('Something went wrong...');
        });
    }
  };
  return (
    <Modal onClose={onClose} width={500}>
      <div className="margin-bottom-4">
        Are you sure you want to remove user: <span className="text-bold">{user.email}</span>.
      </div>
      <div className="flex-row justify-space-between">
        <Button text="Cancel" onClick={() => onClose()} width={150} />
        <Button text="Confirm" onClick={() => confirm()} width={150} />
      </div>
    </Modal>
  );
};

export default RemoveUserModal;
