import React, { useCallback, useEffect, useState } from 'react';
import { MdFilterAlt } from 'react-icons/md';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import { TextInput } from 'components/Forms';
import Select from 'components/Select';
import { useGroup } from 'hooks/group.hook';
import { IOption, IPagination } from 'models/generic.types';
import { IGroupUser } from 'models/group.types';
import { GroupRole, GroupRoleOptions } from 'models/settings.types';
import { getGroupUsers } from 'network/group.network';

import AddUserModal from './AddGroupUserModal';
import GroupUserTable from './GroupUserTable';

const GroupUsers = () => {
  const { groupId } = useGroup();

  const [users, setUsers] = useState<IGroupUser[]>([]);
  const [pagination, setPagination] = useState<IPagination>();
  const [page, setPage] = useState<number>(1);
  const [addUserModal, setAddUserModal] = useState<boolean>(false);
  const [filterRole, setFilterRole] = useState<IOption<GroupRole> | undefined>();
  const [filterNameEmail, setFilterNameEmail] = useState<string>('');
  const [sortName, setSortName] = useState<number>(0);
  const [sortEmail, setSortEmail] = useState<number>(0);
  const [sortRole, setSortRole] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const updateUsers = useCallback(() => {
    if (groupId) {
      getGroupUsers({
        groupId,
        page,
        sortName,
        sortEmail,
        sortRole,
        filterRole: filterRole?.value,
        filterNameEmail,
      })
        .then((res) => {
          setUsers(res.users);
          setPagination(res.pagination);
        })
        .catch((err) => {
          console.log(err);
          toast.error('Something went wrong...');
        })
        .finally(() => setLoading(false));
    }
  }, [page, groupId, sortName, sortEmail, sortRole, filterRole, filterNameEmail]);

  const resetSort = () => {
    setSortName(0);
    setSortEmail(0);
    setSortRole(0);
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
  }, [page, sortName, sortEmail, sortRole, filterRole, filterNameEmail]);

  return (
    <>
      <div className="flex-row justify-space-between align-center">
        <div className="flex-row align-center primary">
          <MdFilterAlt size={24} />
          <div className="font-24 margin-left-8">Filters</div>
        </div>
        <Button text="Add user" width={200} onClick={() => setAddUserModal(true)} />
      </div>
      <div className="flex-row align-center justify-space-between margin-bottom-16">
        <div className="flex-row align-center">
          <div className="margin-right-8">
            <Select
              id="role"
              label="Role"
              selectedItem={filterRole}
              setSelectedItem={setFilterRole}
              options={GroupRoleOptions}
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
      <GroupUserTable
        loading={loading}
        users={users}
        resetSort={resetSort}
        sortName={sortName}
        setSortName={setSortName}
        sortEmail={sortEmail}
        setSortEmail={setSortEmail}
        sortRole={sortRole}
        setSortRole={setSortRole}
        updateUsers={updateUsers}
        pagination={pagination}
        setPage={setPage}
      />
      {addUserModal && groupId && (
        <AddUserModal groupId={groupId} onClose={() => setAddUserModal(false)} updateUsers={updateUsers} />
      )}
    </>
  );
};

export default GroupUsers;
