import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import Modal from 'components/Modal';
import Select from 'components/Select';
import { IOption } from 'models/generic.types';
import { GroupRole, GroupRoleOptions } from 'models/settings.types';
import { getGroupAvailableUsers, postGroupUsers } from 'network/group.network';

const AddGroupUserModal = ({
  groupId,
  onClose,
  updateUsers,
}: {
  groupId: string;
  onClose: () => void;
  updateUsers: () => void;
}) => {
  const [userOptions, setUserOptions] = useState<IOption<string>[]>([]);
  const [selectedUser, setSelectedUser] = useState<IOption<string>>();
  const [selectedRole, setSelectedRole] = useState<IOption<GroupRole>>();

  const confirm = useCallback(() => {
    if (selectedUser && selectedRole) {
      postGroupUsers({ groupId, userId: selectedUser.value, role: selectedRole.value })
        .then(() => {
          updateUsers();
          onClose();
          toast.success('User successfully added');
        })
        .catch((err) => {
          console.log(err);
          toast.error('Something went wrong...');
        });
    }
  }, [groupId, selectedUser, selectedRole]);

  useEffect(() => {
    getGroupAvailableUsers({ groupId }).then((res) => {
      setUserOptions(
        res.map((user) => {
          return { value: user._id, label: `${user.firstName} ${user.lastName} - ${user.email}` };
        })
      );
    });
  }, []);

  return (
    <Modal onClose={onClose} width={500}>
      <div className="margin-bottom-4">
        <Select
          id="users"
          label="Users"
          selectedItem={selectedUser}
          setSelectedItem={setSelectedUser}
          options={userOptions}
        />
      </div>
      <div className="margin-bottom-4">
        <Select
          id="role"
          label="Role"
          selectedItem={selectedRole}
          setSelectedItem={setSelectedRole}
          options={GroupRoleOptions.filter((option) => option.value !== GroupRole.EXTERNAL)}
          width={250}
        />
      </div>
      <div className="flex-row justify-space-between">
        <Button text="Cancel" onClick={() => onClose()} width={150} />
        <Button text="Confirm" onClick={() => confirm()} width={150} />
      </div>
    </Modal>
  );
};

export default AddGroupUserModal;
