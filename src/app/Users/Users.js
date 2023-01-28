import React, { useCallback, useContext, useEffect, useState } from 'react';
import { MdFilterAlt } from 'react-icons/md';
import { toast } from 'react-toastify';
import Button from 'components/Button';
import Header from 'components/Header';
import Pagination from 'components/Pagination';
import Select from 'components/Select';
import { GroupContext } from 'context/group.context';
import { getGroupUsers } from 'network/group';
import AddUserModal from './AddUserModal';
import UserItem from './UserItem';
const GroupUsers = () => {
  const { state: groupState } = useContext(GroupContext);
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
  const updateUsers = useCallback(() => {
    if (groupState.group) {
      getGroupUsers({ groupId: groupState?.group?._id, page })
        .then((res) => {
          setUsers(res.users);
          setPagination(res.pagination);
        })
        .catch((err) => {
          console.log(err);
          toast.error('Something went wrong...');
        });
    }
  }, [page, groupState]);
  useEffect(() => {
    updateUsers();
  }, [page]);
  return React.createElement(
    'div',
    { className: 'container' },
    React.createElement(Header, { text: 'Users' }),
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
        React.createElement(Button, { text: 'Add user', width: 200, onClick: () => setAddUserModal(true) })
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
        React.createElement('div', { className: 'width-100 padding-horizontal-8' }, 'Role')
      ),
      users.map((user) =>
        React.createElement(UserItem, { key: user._id, group: groupState.group, user: user, updateUsers: updateUsers })
      ),
      React.createElement(Pagination, {
        totalPages: pagination?.totalPages || 0,
        currentPage: pagination?.currentPage || 0,
        onChange: (pageNumber) => setPage(pageNumber),
      })
    ),
    addUserModal &&
      groupState.group &&
      React.createElement(AddUserModal, {
        groupId: groupState.group._id,
        onClose: () => setAddUserModal(false),
        updateUsers: updateUsers,
      })
  );
};
export default GroupUsers;
