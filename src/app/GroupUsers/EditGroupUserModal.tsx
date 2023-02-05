import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import Modal from 'components/Modal';
import Select from 'components/Select';
import { IGroup, IGroupUser } from 'models/group.types';
import { GroupRole, GroupRoleOptions } from 'models/settings.types';
import { putGroupUser } from 'network/group.network';

const EditGroupUserModal = ({
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
  const [role, setRole] = useState<GroupRole | undefined>(user.role as GroupRole);

  const save = () => {
    if (group && role) {
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
        selectedItem={user.role}
        setSelectedItem={setRole}
        options={GroupRoleOptions.filter((option) => option !== GroupRole.EXTERNAL)}
        width={250}
      />
      <div className="flex-row justify-space-between">
        <Button text="Cancel" onClick={() => onClose()} width={150} />
        <Button text="Save" onClick={() => save()} width={150} />
      </div>
    </Modal>
  );
};

export default EditGroupUserModal;
