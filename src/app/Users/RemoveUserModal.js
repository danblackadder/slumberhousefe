import React from 'react';
import { toast } from 'react-toastify';
import Button from 'components/Button';
import Modal from 'components/Modal';
import { removeGroupUser } from 'network/group';
const RemoveUserModal = ({ user, group, onClose, updateUsers }) => {
  const confirm = () => {
    if (group) {
      removeGroupUser({ groupId: group._id, userId: user._id })
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
  return React.createElement(
    Modal,
    { onClose: onClose, width: 500 },
    React.createElement(
      'div',
      { className: 'margin-bottom-4' },
      'Are you sure you want to remove user: ',
      React.createElement('span', { className: 'text-bold' }, user.email),
      '.'
    ),
    React.createElement(
      'div',
      { className: 'flex-row justify-space-between' },
      React.createElement(Button, { text: 'Cancel', onClick: () => onClose(), width: 150 }),
      React.createElement(Button, { text: 'Confirm', onClick: () => confirm(), width: 150 })
    )
  );
};
export default RemoveUserModal;
