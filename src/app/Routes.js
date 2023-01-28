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
import { Sidebar, Topbar } from './Navigation';
import { Profile } from './Profile';
import { Reporting } from './Reporting';
import { Settings } from './Settings';
import { Tasks } from './Tasks';
import { Users } from './Users';
const AuthenticatedRoute = () => {
  const { state } = useContext(UserContext);
  if (!state.isAuthenticated) {
    return React.createElement(Navigate, { to: '/login', replace: true });
  }
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Topbar, null),
    React.createElement(Outlet, null)
  );
};
const GroupRoute = () => {
  const { state } = useContext(GroupContext);
  if (!state.group) {
    return React.createElement(Navigate, { to: '/groups', replace: true });
  }
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Sidebar, null),
    React.createElement(Outlet, null)
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
    return React.createElement(Navigate, { to: '/dashboard', replace: true });
  }
  return React.createElement(React.Fragment, null, React.createElement(Outlet, null));
};
const AppRoutes = () => {
  const { state } = useContext(UserContext);
  return React.createElement(
    Routes,
    null,
    React.createElement(
      Route,
      { element: React.createElement(AuthenticatedRoute, null) },
      React.createElement(
        Route,
        { element: React.createElement(GroupRoute, null) },
        React.createElement(Route, { path: '/dashboard', element: React.createElement(Dashboard, null) }),
        React.createElement(Route, { path: '/tasks', element: React.createElement(Tasks, null) }),
        React.createElement(Route, { path: '/chat', element: React.createElement(Chat, null) }),
        React.createElement(Route, { path: '/documents', element: React.createElement(Documents, null) }),
        React.createElement(
          Route,
          { element: React.createElement(AdminRoute, null) },
          React.createElement(Route, { path: '/users', element: React.createElement(Users, null) }),
          React.createElement(Route, { path: '/reporting', element: React.createElement(Reporting, null) })
        )
      ),
      React.createElement(Route, { path: '/groups', element: React.createElement(Groups, null) }),
      React.createElement(Route, { path: '/profile', element: React.createElement(Profile, null) }),
      React.createElement(Route, { path: '/settings', element: React.createElement(Settings, null) })
    ),
    React.createElement(Route, { path: '/register', element: React.createElement(Register, null) }),
    React.createElement(Route, { path: '/login', element: React.createElement(Login, null) }),
    React.createElement(Route, {
      path: '*',
      element: React.createElement(Navigate, { to: state.isAuthenticated ? '/groups' : '/login', replace: true }),
    })
  );
};
export default AppRoutes;
