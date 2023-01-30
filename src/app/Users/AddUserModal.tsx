import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import Modal from 'components/Modal';
import Select from 'components/Select';
import { IGroupAvailableUser } from 'models/group.types';
import { GroupRole } from 'models/settings.types';
import { getGroupAvailableUsers, postGroupUsers } from 'network/group';

const AddUserModal = ({
  groupId,
  onClose,
  updateUsers,
}: {
  groupId: string;
  onClose: () => void;
  updateUsers: () => void;
}) => {
  const [availableUsers, setAvailableUsers] = useState<IGroupAvailableUser[]>([]);
  const [userOptions, setUserOptions] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>();
  const [userId, setUserId] = useState<string>();
  const [role, setRole] = useState<GroupRole>();
  const roleOptions = [GroupRole.ADMIN, GroupRole.BASIC];

  const confirm = useCallback(() => {
    if (userId && role) {
      postGroupUsers({ groupId, userId, role })
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
  }, [groupId, userId, role]);

  useEffect(() => {
    getGroupAvailableUsers({ groupId }).then((res) => {
      setUserOptions(res.map((user) => `${user.firstName} ${user.lastName} - ${user.email}`));
      setAvailableUsers(res);
    });
  }, []);

  useEffect(() => {
    const user = availableUsers.find((user) => user.email === selectedUser?.split(' ')[3]);
    setUserId(user?._id);
  }, [selectedUser]);

  return (
    <Modal onClose={onClose} width={500}>
      <div className="margin-bottom-4">
        <Select
          id="users"
          label="Users"
          selected={selectedUser}
          setSelected={(option: string | undefined) => setSelectedUser(option)}
          options={userOptions}
        />
      </div>
      <div className="margin-bottom-4">
        <Select
          id="role"
          label="Role"
          selected={role}
          setSelected={(option: string | undefined) => setRole(option as GroupRole)}
          options={roleOptions}
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

export default AddUserModal;
