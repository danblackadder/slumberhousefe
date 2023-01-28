import React, { useCallback, useContext, useState } from 'react';
import { MdDelete, MdEdit, MdOpenInNew, MdPeople } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { GroupContext } from 'context/group.context';
import { GroupContextActionTypes } from 'models/group.context.types';
import DeleteGroupModal from './DeleteGroupModal';
import GroupModal from './GroupModal';
const GroupItem = ({ group, updateGroups }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(GroupContext);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const handleManageGroupUsers = useCallback(() => {
    dispatch({ type: GroupContextActionTypes.SET_GROUP, payload: { group } });
    navigate('/users');
  }, [group]);
  const handleGroup = () => {
    dispatch({ type: GroupContextActionTypes.SET_GROUP, payload: { group } });
    navigate('/dashboard');
  };
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      { className: 'relative flex-row align-center margin-bottom-8 padding-left-16 border-neutral' },
      React.createElement('div', { className: 'width-200 padding-horizontal-8' }, group.name),
      React.createElement('div', { className: 'width-100 padding-horizontal-8' }, group.users),
      React.createElement(
        'div',
        { className: 'flex-1 flex-row justify-flex-end' },
        React.createElement(
          'div',
          { className: 'height-40 width-40 center-items pointer black hover-primary', onClick: () => handleGroup() },
          React.createElement(MdOpenInNew, { size: 16 })
        ),
        React.createElement(
          'div',
          {
            className: 'height-40 width-40 center-items pointer black hover-primary',
            onClick: () => handleManageGroupUsers(),
          },
          React.createElement(MdPeople, { size: 16 })
        ),
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
            onClick: () => setDeleteModal(true),
          },
          React.createElement(MdDelete, { size: 16 })
        )
      )
    ),
    editModal &&
      React.createElement(GroupModal, {
        onClose: () => setEditModal(false),
        group: group,
        updateGroups: updateGroups,
        edit: true,
      }),
    deleteModal &&
      React.createElement(DeleteGroupModal, {
        onClose: () => setDeleteModal(false),
        group: group,
        updateGroups: updateGroups,
      })
  );
};
export default GroupItem;
