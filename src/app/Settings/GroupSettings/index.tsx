import React, { useCallback, useEffect, useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import { TextInput } from 'components/Forms';
import Pagination from 'components/Pagination';
import TableHeader from 'components/TableHeader';
import { IPagination } from 'models/generic.types';
import { IGroupSetting } from 'models/settings.types';
import { getSettingsGroups } from 'network/settings';

import GroupItem from './GroupItem';
import AddGroupModal from './GroupModal';

const GroupSettings = () => {
  const [groups, setGroups] = useState<IGroupSetting[]>([]);
  const [pagination, setPagination] = useState<IPagination>();
  const [page, setPage] = useState<number>(1);
  const [modal, setModal] = useState<boolean>(false);
  const [sortName, setSortName] = useState<number>(0);
  const [sortUsers, setSortUsers] = useState<number>(0);
  const [filterName, setFilterName] = useState<string>('');

  const updateGroups = useCallback(() => {
    getSettingsGroups({ page, sortName, sortUsers, filterName })
      .then((res) => {
        setGroups(res.groups);
        setPagination(res.pagination);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went wrong...');
      });
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
        {groups.length > 0 ? (
          <>
            <div className="flex-row margin-vertical-16 padding-left-16">
              <TableHeader label="Name" resetSort={resetSort} sort={sortName} setSort={setSortName} width={200} />
              <TableHeader label="Users" resetSort={resetSort} sort={sortUsers} setSort={setSortUsers} width={100} />
            </div>
            {groups.map((group) => (
              <GroupItem key={group._id} group={group} updateGroups={updateGroups} />
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
            <div>Please try changing your search parameters</div>
          </div>
        )}
      </div>
      {modal && <AddGroupModal onClose={() => setModal(false)} updateGroups={updateGroups} />}
    </>
  );
};

export default GroupSettings;
