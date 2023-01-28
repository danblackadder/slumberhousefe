import React from 'react';
import { toast } from 'react-toastify';
import Button from 'components/Button';
import Modal from 'components/Modal';
import { deleteSettingsGroups } from 'network/settings';
const DeleteGroupModal = ({ group, onClose, updateGroups }) => {
  const confirm = () => {
    deleteSettingsGroups({ id: group._id })
      .then(() => {
        updateGroups();
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
      'Are you sure you want to permanently delete group: ',
      React.createElement('span', { className: 'text-bold' }, group.name),
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
export default DeleteGroupModal;
