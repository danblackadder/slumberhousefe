import React, { Dispatch, SetStateAction } from 'react';
import { MdErrorOutline } from 'react-icons/md';

import Loading from 'components/Loading';
import Pagination from 'components/Pagination';
import TableHeader from 'components/TableHeader';
import { IPagination } from 'models/generic.types';
import { IGroupUser } from 'models/group.types';
import { useGroup } from 'network/group.network';

import GroupUserItem from './GroupUserItem';

const GroupUserTable = ({
  loading,
  users,
  resetSort,
  sortName,
  setSortName,
  sortEmail,
  setSortEmail,
  sortRole,
  setSortRole,
  updateUsers,
  pagination,
  setPage,
}: {
  loading: boolean;
  users: IGroupUser[];
  resetSort: () => void;
  sortName: number;
  setSortName: Dispatch<SetStateAction<number>>;
  sortEmail: number;
  setSortEmail: Dispatch<SetStateAction<number>>;
  sortRole: number;
  setSortRole: Dispatch<SetStateAction<number>>;
  updateUsers: () => void;
  pagination: IPagination | undefined;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  const { groupId } = useGroup();

  if (loading) {
    return <Loading color="primary" height={512} />;
  }

  if (users.length > 0) {
    return (
      <>
        <div className="flex-row margin-vertical-16 padding-left-16">
          <div className="width-50 padding-horizontal-8" />
          <TableHeader label="Name" resetSort={resetSort} sort={sortName} setSort={setSortName} width={200} />
          <TableHeader label="Email" resetSort={resetSort} sort={sortEmail} setSort={setSortEmail} width={300} />
          <TableHeader label="Role" resetSort={resetSort} sort={sortRole} setSort={setSortRole} width={200} />
        </div>
        {users.map((user) => (
          <GroupUserItem key={user._id} groupId={groupId} user={user} updateUsers={updateUsers} />
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
      <div>Please try changing your filter parameters</div>
    </div>
  );
};

export default GroupUserTable;
