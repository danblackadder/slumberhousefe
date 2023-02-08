import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import Modal from 'components/Modal';
import Select from 'components/Select';
import { IOption } from 'models/generic.types';
import { IGroup, IGroupUser } from 'models/group.types';
import { GroupRole, GroupRoleOptions } from 'models/settings.types';
import { putGroupUser } from 'network/group.network';

const EditGroupUserModal = ({
  user,
  groupId,
  onClose,
  updateUsers,
}: {
  groupId: string | undefined;
  user: IGroupUser;
  onClose: () => void;
  updateUsers: () => void;
}) => {
  const [selectedRole, setSelectedRole] = useState<IOption<GroupRole> | undefined>(
    GroupRoleOptions.find((option) => option.value === user.role)
  );

  const save = () => {
    if (groupId && selectedRole) {
      putGroupUser({ groupId, userId: user._id, role: selectedRole.value })
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
        selectedItem={selectedRole}
        setSelectedItem={setSelectedRole}
        options={GroupRoleOptions.filter((option) => option.value !== GroupRole.EXTERNAL)}
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
