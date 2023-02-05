import React, { useContext } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { GroupContext } from 'context/group.context';
import { UserContext } from 'context/user.context';
import { GroupRole, OrganizationRole } from 'models/settings.types';

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

  console.log(state);
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

const GroupRoute = () => {
  const { state } = useContext(GroupContext);

  console.log(state);
  if (!state.group) {
    return <Navigate to={'/groups'} replace />;
  }

  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

const AdminRoute = () => {
  const { state: userState } = useContext(UserContext);
  const { state: groupState } = useContext(GroupContext);

  if (
    userState.user &&
    groupState.group &&
    ![OrganizationRole.OWNER, OrganizationRole.ADMIN].includes(userState.user.role) &&
    ![GroupRole.ADMIN].includes(groupState.group.role)
  ) {
    return <Navigate to={'/dashboard'} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

const AppRoutes = () => {
  const { state } = useContext(UserContext);

  return (
    <Routes>
      <Route element={<AuthenticatedRoute />}>
        <Route element={<GroupRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/documents" element={<Documents />} />
          <Route element={<AdminRoute />}>
            <Route path="/users" element={<GroupUsers />} />
            <Route path="/reporting" element={<Reporting />} />
          </Route>
        </Route>
        <Route path="/groups" element={<Groups />} />
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
