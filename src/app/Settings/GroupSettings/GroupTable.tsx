import Loading from 'components/Loading';
import Pagination from 'components/Pagination';
import TableHeader from 'components/TableHeader';
import { IPagination } from 'models/generic.types';
import { IGroupSetting } from 'models/settings.types';
import React, { Dispatch, SetStateAction } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import GroupItem from './GroupItem';

const GroupTable = ({
  loading,
  groups,
  resetSort,
  sortName,
  setSortName,
  sortUsers,
  setSortUsers,
  updateGroups,
  pagination,
  setPage,
}: {
  loading: boolean;
  groups: IGroupSetting[];
  resetSort: () => void;
  sortName: number;
  setSortName: Dispatch<SetStateAction<number>>;
  sortUsers: number;
  setSortUsers: Dispatch<SetStateAction<number>>;
  updateGroups: () => void;
  pagination: IPagination | undefined;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  if (loading) {
    return <Loading color="primary" height={512} />;
  }

  if (groups.length > 0) {
    return (
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
    );
  }

  return (
    <div className="flex-column full-width align-center padding-vertical-64 text-center">
      <MdErrorOutline size={128} className="primary margin-bottom-8" />
      <div className="margin-bottom-4">There are no results to display...</div>
      <div>Please try changing your search parameters</div>
    </div>
  );
};

export default GroupTable;
