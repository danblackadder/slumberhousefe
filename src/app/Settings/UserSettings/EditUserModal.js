import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import Button from 'components/Button';
import { TextInput } from 'components/Forms';
import Modal from 'components/Modal';
import Select from 'components/Select';
import { OrganizationRole } from 'models/settings.types';
import { putSettingsUser } from 'network/settings';
import { capitalize } from 'utility/helper';
const EditUserModal = ({ user, onClose, updateUsers }) => {
  const [role, setRole] = useState(user.role);
  const options = useMemo(() => {
    if (user.role === OrganizationRole.OWNER) {
      return [OrganizationRole.OWNER, OrganizationRole.ADMIN, OrganizationRole.BASIC];
    }
    return [OrganizationRole.ADMIN, OrganizationRole.BASIC];
  }, [user]);
  const save = () => {
    putSettingsUser({ id: user._id, role })
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
  return React.createElement(
    Modal,
    { onClose: onClose, width: 400 },
    React.createElement(TextInput, {
      id: 'firstName',
      label: 'First name',
      value: user.firstName,
      disabled: true,
      width: 250,
    }),
    React.createElement(TextInput, {
      id: 'lastName',
      label: 'Last name',
      value: user.lastName,
      disabled: true,
      width: 250,
    }),
    React.createElement(TextInput, { id: 'email', label: 'Email', value: user.email, disabled: true, width: 250 }),
    React.createElement(Select, {
      id: 'role',
      label: 'Role',
      selected: user.role,
      setSelected: (option) => setRole(option),
      options: options,
      width: 250,
    }),
    React.createElement(TextInput, {
      id: 'status',
      label: 'Status',
      value: capitalize(user.status),
      disabled: true,
      width: 250,
    }),
    React.createElement(
      'div',
      { className: 'flex-row justify-space-between' },
      React.createElement(Button, { text: 'Cancel', onClick: () => onClose(), width: 150 }),
      React.createElement(Button, { text: 'Save', onClick: () => save(), width: 150 })
    )
  );
};
export default EditUserModal;
