import React, { useCallback, useEffect, useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import { TextInput } from 'components/Forms';
import Pagination from 'components/Pagination';
import TableHeader from 'components/TableHeader';
import { IPagination } from 'models/generic.types';
import { IGroupSetting } from 'models/settings.types';
import { getSettingsGroups } from 'network/settings.network';

import GroupItem from './GroupItem';
import AddGroupModal from './GroupModal';
import GroupTable from './GroupTable';

const GroupSettings = () => {
  const [groups, setGroups] = useState<IGroupSetting[]>([]);
  const [pagination, setPagination] = useState<IPagination>();
  const [page, setPage] = useState<number>(1);
  const [modal, setModal] = useState<boolean>(false);
  const [sortName, setSortName] = useState<number>(0);
  const [sortUsers, setSortUsers] = useState<number>(0);
  const [filterName, setFilterName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const updateGroups = useCallback(() => {
    getSettingsGroups({ page, sortName, sortUsers, filterName })
      .then((res) => {
        setGroups(res.groups);
        setPagination(res.pagination);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went wrong...');
      })
      .finally(() => setLoading(false));
  }, [page, sortName, sortUsers, filterName]);

  const resetSort = () => {
    setSortName(0);
    setSortUsers(0);
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      updateGroups();
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [filterName]);

  useEffect(() => {
    setLoading(true);
    updateGroups();
  }, [page, sortName, sortUsers]);

  return (
    <>
      <div className="flex-column">
        <div className="flex-row justify-flex-end align-center">
          <Button text="Add group" width={200} onClick={() => setModal(true)} />
        </div>
        <div className="flex-row align-center justify-flex-end margin-bottom-16">
          <div className="">
            <TextInput
              id="search"
              label="Search"
              value={filterName}
              onChange={(event: React.FormEvent<HTMLInputElement>) => setFilterName(event.currentTarget.value)}
              width={300}
              inline={true}
              placeholder="Search by group name..."
            />
          </div>
        </div>
        <GroupTable
          loading={loading}
          groups={groups}
          resetSort={resetSort}
          sortName={sortName}
          setSortName={setSortName}
          sortUsers={sortUsers}
          setSortUsers={setSortUsers}
          updateGroups={updateGroups}
          pagination={pagination}
          setPage={setPage}
        />
      </div>
      {modal && <AddGroupModal onClose={() => setModal(false)} updateGroups={updateGroups} />}
    </>
  );
};

export default GroupSettings;
