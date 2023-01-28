import React from 'react';
import { toast } from 'react-toastify';
import Button from 'components/Button';
import Modal from 'components/Modal';
import { deleteSettingsUser } from 'network/settings';
const DeleteUserModal = ({ user, onClose, updateUsers }) => {
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
  return React.createElement(
    Modal,
    { onClose: onClose, width: 500 },
    React.createElement(
      'div',
      { className: 'margin-bottom-4' },
      'Are you sure you want to permanently delete user: ',
      React.createElement('span', { className: 'text-bold' }, user.email),
      '.'
    ),
    React.createElement('div', { className: 'margin-bottom-4 error' }, 'This can not be undone.'),
    React.createElement(
      'div',
      { className: 'flex-row justify-space-between' },
      React.createElement(Button, { text: 'Cancel', onClick: () => onClose(), width: 150 }),
      React.createElement(Button, { text: 'Confirm', onClick: () => confirm(), width: 150 })
    )
  );
};
export default DeleteUserModal;
