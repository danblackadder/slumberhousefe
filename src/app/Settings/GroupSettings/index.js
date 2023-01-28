import React, { useCallback, useEffect, useState } from 'react';
import { MdFilterAlt } from 'react-icons/md';
import { toast } from 'react-toastify';
import Button from 'components/Button';
import Pagination from 'components/Pagination';
import { getSettingsGroups } from 'network/settings';
import GroupItem from './GroupItem';
import AddGroupModal from './GroupModal';
const GroupSettings = () => {
  const [groups, setGroups] = useState([]);
  const [pagination, setPagination] = useState();
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [, setFilters] = useState(false);
  const updateGroups = useCallback(() => {
    getSettingsGroups({ page })
      .then((res) => {
        setGroups(res.groups);
        setPagination(res.pagination);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went wrong...');
      });
  }, [page]);
  useEffect(() => {
    updateGroups();
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
        React.createElement(Button, { text: 'Add group', width: 200, onClick: () => setModal(true) })
      ),
      React.createElement(
        'div',
        { className: 'flex-row margin-vertical-16 padding-left-16' },
        React.createElement('div', { className: 'width-200 padding-horizontal-8' }, 'Name'),
        React.createElement('div', { className: 'width-300 padding-horizontal-8' }, 'Users')
      ),
      groups.map((group) =>
        React.createElement(GroupItem, { key: group._id, group: group, updateGroups: updateGroups })
      ),
      React.createElement(Pagination, {
        totalPages: pagination?.totalPages || 0,
        currentPage: pagination?.currentPage || 0,
        onChange: (pageNumber) => setPage(pageNumber),
      })
    ),
    modal && React.createElement(AddGroupModal, { onClose: () => setModal(false), updateGroups: updateGroups })
  );
};
export default GroupSettings;
