import React, { useCallback, useEffect, useState } from 'react';
import { MdErrorOutline, MdFilterAlt } from 'react-icons/md';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import { TextInput } from 'components/Forms';
import Pagination from 'components/Pagination';
import Select from 'components/Select';
import TableHeader from 'components/TableHeader';
import { IPagination } from 'models/generic.types';
import { IUserSetting, OrganizationRole, UserStatus } from 'models/settings.types';
import { getSettingsUsers } from 'network/settings';

import InviteUserModal from './InviteUserModal';
import UserItem from './UserItem';

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

  const updateUsers = useCallback(() => {
    getSettingsUsers({ page, sortName, sortEmail, sortRole, sortStatus, filterRole, filterStatus, filterNameEmail })
      .then((res) => {
        setUsers(res.users);
        setPagination(res.pagination);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went wrong...');
      });
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
                selected={filterRole}
                setSelected={(option: string | undefined) => setFilterRole(option as OrganizationRole)}
                options={[OrganizationRole.OWNER, OrganizationRole.ADMIN, OrganizationRole.BASIC]}
                width={200}
                inline={true}
              />
            </div>
            <div className="margin-right-8">
              <Select
                id="role"
                label="Status"
                selected={filterStatus}
                setSelected={(option: string | undefined) => setFilterStatus(option as UserStatus)}
                options={[UserStatus.ACTIVE, UserStatus.INVITED, UserStatus.INACTIVE]}
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
        {users.length > 0 ? (
          <>
            <div className="flex-row margin-vertical-16 padding-left-16">
              <div className="width-50 padding-horizontal-8" />
              <TableHeader label="Name" resetSort={resetSort} sort={sortName} setSort={setSortName} width={200} />
              <TableHeader label="Email" resetSort={resetSort} sort={sortEmail} setSort={setSortEmail} width={300} />
              <TableHeader label="Role" resetSort={resetSort} sort={sortRole} setSort={setSortRole} width={100} />
              <TableHeader label="Status" resetSort={resetSort} sort={sortStatus} setSort={setSortStatus} width={100} />
            </div>
            {users.map((user) => (
              <UserItem key={user._id} user={user} updateUsers={updateUsers} />
            ))}
            <Pagination
              totalDocuments={pagination?.totalDocuments || 0}
              totalPages={pagination?.totalPages || 0}
              currentPage={pagination?.currentPage || 0}
              onChange={(pageNumber: number) => setPage(pageNumber)}
            />
          </>
        ) : (
          <div className="flex-column full-width align-center padding-vertical-64 text-center">
            <MdErrorOutline size={128} className="primary margin-bottom-8" />
            <div className="margin-bottom-4">There are no results to display...</div>
            <div>Please try changing your filter parameters</div>
          </div>
        )}
      </div>
      {modal && <InviteUserModal setModal={setModal} updateUsers={updateUsers} />}
    </>
  );
};

export default UserSettings;
