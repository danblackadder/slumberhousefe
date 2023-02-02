import React from 'react';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import Modal from 'components/Modal';
import { IGroupSetting } from 'models/settings.types';
import { deleteSettingsGroups } from 'network/settings.network';

const DeleteGroupModal = ({
  group,
  onClose,
  updateGroups,
}: {
  group: IGroupSetting;
  onClose: () => void;
  updateGroups: () => void;
}) => {
  const confirm = () => {
    deleteSettingsGroups({ id: group._id })
      .then(() => {
        updateGroups();
        onClose();
        toast.success('User updated');
      })
      .catch((err: unknown) => {
        console.log(err);
        toast.error('Something went wrong...');
      });
  };
  return (
    <Modal onClose={onClose} width={500}>
      <div className="margin-bottom-4">
        Are you sure you want to permanently delete group: <span className="text-bold">{group.name}</span>.
      </div>
      <div className="margin-bottom-4 error">This can not be undone.</div>
      <div className="flex-row justify-space-between">
        <Button text="Cancel" onClick={() => onClose()} width={150} />
        <Button text="Confirm" onClick={() => confirm()} width={150} />
      </div>
    </Modal>
  );
};

export default DeleteGroupModal;
