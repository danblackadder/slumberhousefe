import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { capitalize } from 'utility/helper';
import RemoveUserModal from './RemoveUserModal';
const UserItem = ({ group, user, updateUsers }) => {
  const [editModal, setEditModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  useEffect(() => {
    updateUsers();
  }, [editModal, removeModal]);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      { className: 'relative flex-row align-center margin-bottom-8 padding-left-16 border-neutral' },
      React.createElement(
        'div',
        { className: 'width-50' },
        React.createElement('div', { className: 'border-circle background-neutral height-30 width-30' })
      ),
      React.createElement(
        'div',
        { className: 'width-200 padding-horizontal-8' },
        user.firstName && user.lastName && `${user.firstName} ${user.lastName}`
      ),
      React.createElement('div', { className: 'width-300 padding-horizontal-8' }, user.email),
      React.createElement('div', { className: 'width-100 padding-horizontal-8' }, capitalize(user.role)),
      React.createElement(
        'div',
        { className: 'flex-1 flex-row justify-flex-end' },
        React.createElement(
          'div',
          {
            className: 'height-40 width-40 center-items pointer black hover-primary',
            onClick: () => setEditModal(true),
          },
          React.createElement(MdEdit, { size: 16 })
        ),
        React.createElement(
          'div',
          {
            className: 'height-40 width-40 center-items pointer error hover-primary',
            onClick: () => setRemoveModal(true),
          },
          React.createElement(MdDelete, { size: 16 })
        )
      )
    ),
    removeModal &&
      React.createElement(RemoveUserModal, {
        onClose: () => setRemoveModal(false),
        user: user,
        group: group,
        updateUsers: updateUsers,
      })
  );
};
export default UserItem;
