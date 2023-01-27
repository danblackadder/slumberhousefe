import React, { useCallback, useEffect, useState } from 'react';
import { MdFilterAlt } from 'react-icons/md';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import Pagination from 'components/Pagination';
import Select from 'components/Select';
import { IPagination } from 'models/generic.types';
import { IUserSetting } from 'models/settings.types';
import { getSettingsUsers } from 'network/settings';

import InviteUserModal from './InviteUserModal';
import UserItem from './UserItem';

const UserSettings = () => {
  const [users, setUsers] = useState<IUserSetting[]>([]);
  const [pagination, setPagination] = useState<IPagination>();
  const [page, setPage] = useState<number>(1);
  const [modal, setModal] = useState<boolean>(false);
  const [filters, setFilters] = useState<boolean>(false);

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

  return (
    <>
      <div className="flex-column">
        <div className="flex-row justify-space-between">
          <div className="flex-row align-center primary pointer margin-left-16" onClick={() => setFilters(true)}>
            <div className="margin-right-8">
              <MdFilterAlt size={16} />
            </div>
            <div>Filters</div>
          </div>
          <Button text="Invite user" width={200} onClick={() => setModal(true)} />
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
          <div className="width-100 padding-horizontal-8">Status</div>
        </div>
        {users.map((user) => (
          <UserItem key={user._id} user={user} updateUsers={updateUsers} />
        ))}
        <Pagination
          totalPages={pagination?.totalPages || 0}
          currentPage={pagination?.currentPage || 0}
          onChange={(pageNumber: number) => setPage(pageNumber)}
        />
      </div>
      {modal && <InviteUserModal setModal={setModal} updateUsers={updateUsers} />}
    </>
  );
};

export default UserSettings;
