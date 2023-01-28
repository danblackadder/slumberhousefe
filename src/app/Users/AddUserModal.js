import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Select from 'components/Select';
import { GroupRole } from 'models/settings.types';
import { getGroupAvailableUsers, postGroupUsers } from 'network/group';
const AddUserModal = ({ groupId, onClose, updateUsers }) => {
  const [availableUsers, setAvailableUsers] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [userId, setUserId] = useState();
  const [role, setRole] = useState();
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
  return React.createElement(
    Modal,
    { onClose: onClose, width: 500 },
    React.createElement(
      'div',
      { className: 'margin-bottom-4' },
      React.createElement(Select, {
        id: 'users',
        label: 'Users',
        selected: selectedUser,
        setSelected: (option) => setSelectedUser(option),
        options: userOptions,
      })
    ),
    React.createElement(
      'div',
      { className: 'margin-bottom-4' },
      React.createElement(Select, {
        id: 'role',
        label: 'Role',
        selected: role,
        setSelected: (option) => setRole(option),
        options: roleOptions,
        width: 250,
      })
    ),
    React.createElement(
      'div',
      { className: 'flex-row justify-space-between' },
      React.createElement(Button, { text: 'Cancel', onClick: () => onClose(), width: 150 }),
      React.createElement(Button, { text: 'Confirm', onClick: () => confirm(), width: 150 })
    )
  );
};
export default AddUserModal;
