import React, { useContext } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { UserContext } from 'context/user.context';
import { GroupRole, OrganizationRole } from 'models/settings.types';
import { useGroup } from 'network/group.network';

import { Login, Register } from './Authentication';
import { Chat } from './Chat';
import { Dashboard } from './Dashboard';
import { Documents } from './Documents';
import { Groups } from './Groups';
import { GroupUsers } from './GroupUsers';
import { Sidebar, Topbar } from './Navigation';
import { Profile } from './Profile';
import { Reporting } from './Reporting';
import { Settings } from './Settings';
import { Tasks } from './Tasks';

const AuthenticatedRoute = () => {
  const { state } = useContext(UserContext);

  if (!state.isAuthenticated) {
    return <Navigate to={'/login'} replace />;
  }

  return (
    <>
      <Topbar />
      <Outlet />
    </>
  );
};

const AdminRoute = () => {
  const { state: userState } = useContext(UserContext);
  const { group, groupId } = useGroup();

  if (
    userState.user &&
    group &&
    ![OrganizationRole.OWNER, OrganizationRole.ADMIN].includes(userState.user.role) &&
    ![GroupRole.ADMIN].includes(group.role)
  ) {
    return <Navigate to={`/groups/${groupId}/`} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

const GroupIdRoutes = () => {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/documents" element={<Documents />} />
        <Route element={<AdminRoute />}>
          <Route path="/users" element={<GroupUsers />} />
          <Route path="/reporting" element={<Reporting />} />
        </Route>
      </Routes>
    </>
  );
};

const GroupRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Groups />} />
        <Route path="/:groupId/*" element={<GroupIdRoutes />} />
      </Routes>
    </>
  );
};

const AppRoutes = () => {
  const { state } = useContext(UserContext);

  return (
    <Routes>
      <Route element={<AuthenticatedRoute />}>
        <Route path="/groups/*" element={<GroupRoutes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to={state.isAuthenticated ? '/groups' : '/login'} replace />} />
    </Routes>
  );
};

export default AppRoutes;
