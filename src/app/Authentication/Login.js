import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Button from 'components/Button';
import { TextInput } from 'components/Forms';
import Header from 'components/Header';
import { FullWidth } from 'components/Layout';
import Loading from 'components/Loading';
import { UserContext } from 'context/user.context';
import { UserContextActionTypes } from 'models/user.context.types';
import { login } from 'network/authentication';
const Login = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const { isAuthenticated } = state;
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    setLoading(false);
  }, []);
  const handleLogin = () => {
    login({ email, password })
      .then((res) => {
        dispatch({ type: UserContextActionTypes.LOGIN, payload: { token: res.token } });
        toast.success('Login successful');
      })
      .catch((err) => {
        dispatch({ type: UserContextActionTypes.LOGOUT });
        toast.error(err.error);
      });
  };
  useEffect(() => {
    if (Cookies.get('token')) {
      navigate('/companies');
    }
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/companies');
    }
  }, [isAuthenticated]);
  if (loading) {
    return React.createElement(Loading, null);
  }
  return React.createElement(
    FullWidth,
    null,
    React.createElement(
      'div',
      { className: 'container center-items' },
      React.createElement(
        'div',
        { className: 'relative background-white flex-column padding-32 width-400 shadow-light' },
        React.createElement(Header, { text: 'Login' }),
        React.createElement(
          'div',
          { className: 'margin-bottom-16' },
          React.createElement(TextInput, {
            id: 'email',
            label: 'Email',
            value: email,
            onChange: (event) => {
              setEmail(event.currentTarget.value);
            },
            autocomplete: 'username',
          }),
          React.createElement(TextInput, {
            id: 'password',
            label: 'Password',
            value: password,
            onChange: (event) => {
              setPassword(event.currentTarget.value);
            },
            password: true,
            autocomplete: 'current-password',
          })
        ),
        React.createElement(Button, { text: 'Login', onClick: () => handleLogin() }),
        React.createElement(Link, { to: '/register' }, React.createElement(Button, { text: 'Register' }))
      )
    )
  );
};
export default Login;
