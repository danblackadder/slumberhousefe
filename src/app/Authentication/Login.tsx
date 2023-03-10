import React, { useCallback, useContext, useEffect, useState } from 'react';
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
import { login } from 'network/authentication.network';

const Login = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const { isAuthenticated } = state;

  const [loading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleLogin = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      login({ email, password })
        .then((res) => {
          dispatch({ type: UserContextActionTypes.LOGIN, payload: { token: res.token } });
          toast.success('Login successful');
        })
        .catch((err) => {
          dispatch({ type: UserContextActionTypes.LOGOUT });
          toast.error(err.error);
        });
    },
    [email, password]
  );

  useEffect(() => {
    if (Cookies.get('token')) {
      navigate('/groups');
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/groups');
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <FullWidth>
        <Loading />
      </FullWidth>
    );
  }

  return (
    <FullWidth>
      <div className="container center-items">
        <form
          className="relative background-white flex-column padding-32 width-400 shadow-light"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleLogin(event)}
        >
          <Header text="Login" />
          <div className="margin-bottom-16">
            <TextInput
              id="email"
              label="Email"
              value={email}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setEmail(event.currentTarget.value);
              }}
              autocomplete="username"
            />
            <TextInput
              id="password"
              label="Password"
              value={password}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setPassword(event.currentTarget.value);
              }}
              password={true}
              autocomplete="current-password"
            />
          </div>
          <div className="margin-bottom-8">
            <Button text="Login" type="submit" />
          </div>
          <Link to="/register">
            <Button text="Register" />
          </Link>
        </form>
      </div>
    </FullWidth>
  );
};

export default Login;
