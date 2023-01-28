import React, { useCallback, useEffect, useState } from 'react';
import { MdFilterAlt } from 'react-icons/md';
import { toast } from 'react-toastify';
import Button from 'components/Button';
import Pagination from 'components/Pagination';
import Select from 'components/Select';
import { getSettingsUsers } from 'network/settings';
import InviteUserModal from './InviteUserModal';
import UserItem from './UserItem';
const UserSettings = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState();
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [filters, setFilters] = useState(false);
  const updateUsers = useCallback(() => {
    getSettingsUsers({ page })
      .then((res) => {
        setUsers(res.users);
        setPagination(res.pagination);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went wrong...');
      });
  }, [page]);
  useEffect(() => {
    updateUsers();
  }, [page]);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      { className: 'flex-column' },
      React.createElement(
        'div',
        { className: 'flex-row justify-space-between' },
        React.createElement(
          'div',
          { className: 'flex-row align-center primary pointer margin-left-16', onClick: () => setFilters(true) },
          React.createElement('div', { className: 'margin-right-8' }, React.createElement(MdFilterAlt, { size: 16 })),
          React.createElement('div', null, 'Filters')
        ),
        React.createElement(Button, { text: 'Invite user', width: 200, onClick: () => setModal(true) })
      ),
      filters &&
        React.createElement(
          'div',
          { className: 'flex-row align-center' },
          React.createElement(Select, {
            id: 'role',
            label: 'Role',
            selected: 'option1',
            setSelected: () => null,
            options: ['option1', 'option2'],
            width: 200,
          })
        ),
      React.createElement(
        'div',
        { className: 'flex-row margin-vertical-16 padding-left-16' },
        React.createElement('div', { className: 'width-50 padding-horizontal-8' }),
        React.createElement('div', { className: 'width-200 padding-horizontal-8' }, 'Name'),
        React.createElement('div', { className: 'width-300 padding-horizontal-8' }, 'Email'),
        React.createElement('div', { className: 'width-100 padding-horizontal-8' }, 'Role'),
        React.createElement('div', { className: 'width-100 padding-horizontal-8' }, 'Status')
      ),
      users.map((user) => React.createElement(UserItem, { key: user._id, user: user, updateUsers: updateUsers })),
      React.createElement(Pagination, {
        totalPages: pagination?.totalPages || 0,
        currentPage: pagination?.currentPage || 0,
        onChange: (pageNumber) => setPage(pageNumber),
      })
    ),
    modal && React.createElement(InviteUserModal, { setModal: setModal, updateUsers: updateUsers })
  );
};
export default UserSettings;
