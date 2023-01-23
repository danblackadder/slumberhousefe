import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserProvider } from 'context/user.context';
import AppRoutes from 'app/Routes';
import { GroupProvider } from 'context/group.context';

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
