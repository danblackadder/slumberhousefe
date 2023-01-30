import React, { useCallback, useContext, useEffect, useState } from 'react';
import { MdFilterAlt } from 'react-icons/md';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import Header from 'components/Header';
import Pagination from 'components/Pagination';
import Select from 'components/Select';
import { GroupContext } from 'context/group.context';
import { IPagination } from 'models/generic.types';
import { IGroupUser } from 'models/group.types';
import { getGroupUsers } from 'network/group';

import AddUserModal from './AddUserModal';
import UserItem from './UserItem';

const GroupUsers = () => {
  const { state: groupState } = useContext(GroupContext);
  const [users, setUsers] = useState<IGroupUser[]>([]);
  const [pagination, setPagination] = useState<IPagination>();
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState<boolean>(false);
  const [addUserModal, setAddUserModal] = useState<boolean>(false);

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

  return (
    <div className="container">
      <Header text="Users" />
      <div className="flex-column">
        <div className="flex-row justify-space-between">
          <div className="flex-row align-center primary pointer margin-left-16" onClick={() => setFilters(true)}>
            <div className="margin-right-8">
              <MdFilterAlt size={16} />
            </div>
            <div>Filters</div>
          </div>
          <Button text="Add user" width={200} onClick={() => setAddUserModal(true)} />
        </div>
        {filters && (
          <div className="flex-row align-center">
            <Select
              id="role"
              label="Role"
              selected="option1"
              setSelected={() => null}
              options={['option1', 'option2']}
              width={200}
            />
          </div>
        )}
        <div className="flex-row margin-vertical-16 padding-left-16">
          <div className="width-50 padding-horizontal-8" />
          <div className="width-200 padding-horizontal-8">Name</div>
          <div className="width-300 padding-horizontal-8">Email</div>
          <div className="width-100 padding-horizontal-8">Role</div>
        </div>
        {users.map((user) => (
          <UserItem key={user._id} group={groupState.group} user={user} updateUsers={updateUsers} />
        ))}
        <Pagination
          totalDocuments={pagination?.totalDocuments || 0}
          totalPages={pagination?.totalPages || 0}
          currentPage={pagination?.currentPage || 0}
          onChange={(pageNumber: number) => setPage(pageNumber)}
        />
      </div>
      {addUserModal && groupState.group && (
        <AddUserModal groupId={groupState.group._id} onClose={() => setAddUserModal(false)} updateUsers={updateUsers} />
      )}
    </div>
  );
};

export default GroupUsers;
