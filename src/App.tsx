import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppRoutes from 'app/Routes';

import { GroupProvider } from 'context/group.context';
import { UserProvider } from 'context/user.context';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <UserProvider>
      <GroupProvider>
        <BrowserRouter>
          <AppRoutes />
          <ToastContainer position="bottom-center" />
        </BrowserRouter>
      </GroupProvider>
    </UserProvider>
  );
};

export default App;
