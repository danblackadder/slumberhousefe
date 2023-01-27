import React, { useCallback, useEffect, useState } from 'react';
import { MdFilterAlt } from 'react-icons/md';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import Pagination from 'components/Pagination';
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
  const [, setFilters] = useState<boolean>(false);

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
          <Button text="Add group" width={200} onClick={() => setModal(true)} />
        </div>
        <div className="flex-row margin-vertical-16 padding-left-16">
          <div className="width-200 padding-horizontal-8">Name</div>
          <div className="width-300 padding-horizontal-8">Users</div>
        </div>
        {groups.map((group) => (
          <GroupItem key={group._id} group={group} updateGroups={updateGroups} />
        ))}
        <Pagination
          totalPages={pagination?.totalPages || 0}
          currentPage={pagination?.currentPage || 0}
          onChange={(pageNumber: number) => setPage(pageNumber)}
        />
      </div>
      {modal && <AddGroupModal onClose={() => setModal(false)} updateGroups={updateGroups} />}
    </>
  );
};

export default GroupSettings;
