import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import Modal from 'components/Modal';
import Select from 'components/Select';
import { IGroup, IGroupUser } from 'models/group.types';
import { GroupRole } from 'models/settings.types';
import { putGroupUser } from 'network/group';

const EditUserModal = ({
  user,
  group,
  onClose,
  updateUsers,
}: {
  group: IGroup | null;
  user: IGroupUser;
  onClose: () => void;
  updateUsers: () => void;
}) => {
  const [role, setRole] = useState<GroupRole>(user.role as GroupRole);

  const save = () => {
    if (group) {
      putGroupUser({ groupId: group._id, userId: user._id, role })
        .then(() => {
          updateUsers();
          onClose();
          toast.success('User updated');
        })
        .catch((err: unknown) => {
          console.log(err);
          toast.error('Something went wrong...');
        });
    }
  };

  return (
    <Modal onClose={onClose} width={400}>
      <div className="margin-bottom-8">Change role for user {user.email}</div>
      <Select
        id="role"
        label="Role"
        selected={user.role}
        setSelected={(option: string | undefined) => setRole(option as GroupRole)}
        options={[GroupRole.ADMIN, GroupRole.BASIC]}
        width={250}
      />
      <div className="flex-row justify-space-between">
        <Button text="Cancel" onClick={() => onClose()} width={150} />
        <Button text="Save" onClick={() => save()} width={150} />
      </div>
    </Modal>
  );
};

export default EditUserModal;
