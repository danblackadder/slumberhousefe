import React, { useContext } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { UserContext } from 'context/user.context';

import { Login, Register } from './Authentication';
import { Dashboard } from './Dashboard';
import { Sidebar, Topbar } from './Navigation';
import { Documents } from './Documents';
import { Chat } from './Chat';
import { Tasks } from './Tasks';
import { Settings } from './Settings';
import { Groups } from './Groups';
import { GroupContext } from 'context/group.context';
import { Profile } from './Profile';

const AuthenticatedRoute = ({ isAuthenticated, redirectPath }: { isAuthenticated: boolean; redirectPath: string }) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <>
      <Topbar />
      <Outlet />
    </>
  );
};

const GroupRoute = ({ redirectPath }: { redirectPath: string }) => {
  const { state } = useContext(GroupContext);

  if (!state.group) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

const AppRoutes = () => {
  const { state } = useContext(UserContext);

  return (
    <Routes>
      <Route element={<AuthenticatedRoute isAuthenticated={state.isAuthenticated} redirectPath="/login" />}>
        <Route element={<GroupRoute redirectPath="/groups" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/documents" element={<Documents />} />
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
