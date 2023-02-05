import React, { useCallback, useEffect, useState } from 'react';
import { MdFilterAlt } from 'react-icons/md';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import { TextInput } from 'components/Forms';
import Select from 'components/Select';
import { IPagination } from 'models/generic.types';
import {
  IUserSetting,
  OrganizationRole,
  OrganizationRoleOptions,
  UserStatus,
  UserStatusOptions,
} from 'models/settings.types';
import { getSettingsUsers } from 'network/settings.network';

import InviteUserModal from './InviteUserModal';
import UsersTable from './UserTable';

const UserSettings = () => {
  const [users, setUsers] = useState<IUserSetting[]>([]);
  const [pagination, setPagination] = useState<IPagination>();
  const [page, setPage] = useState<number>(1);
  const [modal, setModal] = useState<boolean>(false);
  const [filterRole, setFilterRole] = useState<OrganizationRole>();
  const [filterStatus, setFilterStatus] = useState<UserStatus>();
  const [filterNameEmail, setFilterNameEmail] = useState<string>('');
  const [sortName, setSortName] = useState<number>(0);
  const [sortEmail, setSortEmail] = useState<number>(0);
  const [sortRole, setSortRole] = useState<number>(0);
  const [sortStatus, setSortStatus] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const updateUsers = useCallback(() => {
    getSettingsUsers({ page, sortName, sortEmail, sortRole, sortStatus, filterRole, filterStatus, filterNameEmail })
      .then((res) => {
        setUsers(res.users);
        setPagination(res.pagination);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went wrong...');
      })
      .finally(() => setLoading(false));
  }, [page, sortName, sortEmail, sortRole, sortStatus, filterRole, filterStatus, filterNameEmail]);

  const resetSort = () => {
    setSortName(0);
    setSortEmail(0);
    setSortRole(0);
    setSortStatus(0);
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      updateUsers();
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [filterNameEmail]);

  useEffect(() => {
    setLoading(true);
    updateUsers();
  }, [page, sortName, sortEmail, sortRole, sortStatus, filterRole, filterStatus]);

  return (
    <>
      <div className="flex-column">
        <div className="flex-row justify-space-between align-center">
          <div className="flex-row align-center primary">
            <MdFilterAlt size={24} />
            <div className="font-24 margin-left-8">Filters</div>
          </div>
          <Button text="Invite user" width={200} onClick={() => setModal(true)} />
        </div>
        <div className="flex-row align-center justify-space-between margin-bottom-16">
          <div className="flex-row align-center">
            <div className="margin-right-8">
              <Select
                id="role"
                label="Role"
                selectedItem={filterRole}
                setSelectedItem={setFilterRole}
                options={OrganizationRoleOptions}
                width={200}
                inline={true}
              />
            </div>
            <div className="margin-right-8">
              <Select
                id="role"
                label="Status"
                selectedItem={filterStatus}
                setSelectedItem={setFilterStatus}
                options={UserStatusOptions}
                width={200}
                inline={true}
              />
            </div>
          </div>
          <div className="">
            <TextInput
              id="search"
              label="Search"
              value={filterNameEmail}
              onChange={(event: React.FormEvent<HTMLInputElement>) => setFilterNameEmail(event.currentTarget.value)}
              width={300}
              inline={true}
              placeholder="Search by name or email..."
            />
          </div>
        </div>
        <UsersTable
          loading={loading}
          users={users}
          resetSort={resetSort}
          sortName={sortName}
          setSortName={setSortName}
          sortEmail={sortEmail}
          setSortEmail={setSortEmail}
          sortRole={sortRole}
          setSortRole={setSortRole}
          sortStatus={sortStatus}
          setSortStatus={setSortStatus}
          updateUsers={updateUsers}
          pagination={pagination}
          setPage={setPage}
        />
      </div>
      {modal && <InviteUserModal setModal={setModal} updateUsers={updateUsers} />}
    </>
  );
};

export default UserSettings;
