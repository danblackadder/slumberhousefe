import Loading from 'components/Loading';
import Pagination from 'components/Pagination';
import TableHeader from 'components/TableHeader';
import { IPagination } from 'models/generic.types';
import { IUserSetting } from 'models/settings.types';
import React, { Dispatch, SetStateAction } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import UserItem from './UserItem';

const UsersTable = ({
  loading,
  users,
  resetSort,
  sortName,
  setSortName,
  sortEmail,
  setSortEmail,
  sortRole,
  setSortRole,
  sortStatus,
  setSortStatus,
  updateUsers,
  pagination,
  setPage,
}: {
  loading: boolean;
  users: IUserSetting[];
  resetSort: () => void;
  sortName: number;
  setSortName: Dispatch<SetStateAction<number>>;
  sortEmail: number;
  setSortEmail: Dispatch<SetStateAction<number>>;
  sortRole: number;
  setSortRole: Dispatch<SetStateAction<number>>;
  sortStatus: number;
  setSortStatus: Dispatch<SetStateAction<number>>;
  updateUsers: () => void;
  pagination: IPagination | undefined;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
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

export default UsersTable;
