import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { OrganizationRole } from 'models/settings.types';
import { capitalize } from 'utility/helper';
import DeleteUserModal from './DeleteUserModal';
import EditUserModal from './EditUserModal';
const UserItem = ({ user, updateUsers }) => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
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
      React.createElement('div', { className: 'width-100 padding-horizontal-8' }, capitalize(user.status)),
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
            className: `height-40 width-40 center-items ${
              user.role === OrganizationRole.OWNER ? 'neutral' : 'pointer error hover-primary'
            }`,
            onClick: () => setDeleteModal(true),
          },
          React.createElement(MdDelete, { size: 16 })
        )
      )
    ),
    editModal &&
      React.createElement(EditUserModal, { onClose: () => setEditModal(false), user: user, updateUsers: updateUsers }),
    deleteModal &&
      React.createElement(DeleteUserModal, {
        onClose: () => setDeleteModal(false),
        user: user,
        updateUsers: updateUsers,
      })
  );
};
export default UserItem;
