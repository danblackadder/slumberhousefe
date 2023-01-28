import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppRoutes from 'app/Routes';
import { GroupProvider } from 'context/group.context';
import { UserProvider } from 'context/user.context';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return React.createElement(
    UserProvider,
    null,
    React.createElement(
      GroupProvider,
      null,
      React.createElement(
        BrowserRouter,
        null,
        React.createElement(AppRoutes, null),
        React.createElement(ToastContainer, { position: 'bottom-center' })
      )
    )
  );
};
export default App;
