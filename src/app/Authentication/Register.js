import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from 'components/Button';
import { TextInput } from 'components/Forms';
import Header from 'components/Header';
import { FullWidth } from 'components/Layout';
import Loading from 'components/Loading';
import { register } from 'network/authentication';
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState();
  useEffect(() => {
    setLoading(false);
  }, []);
  const handleRegister = () => {
    register({ firstName, lastName, email, organization, password, passwordConfirmation })
      .then(() => {
        toast.success('Registration successful');
        navigate('/login');
      })
      .catch((err) => setErrors(err.errors));
  };
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
        React.createElement(Header, { text: 'Register' }),
        React.createElement(
          'div',
          { className: 'margin-bottom-16' },
          React.createElement(TextInput, {
            id: 'firstname',
            label: 'First Name',
            value: firstName,
            onChange: (event) => {
              setFirstName(event.currentTarget.value);
            },
            errors: errors?.firstName,
          }),
          React.createElement(TextInput, {
            id: 'lastname',
            label: 'Last Name',
            value: lastName,
            onChange: (event) => {
              setLastName(event.currentTarget.value);
            },
            errors: errors?.lastName,
          }),
          React.createElement(TextInput, {
            id: 'email',
            label: 'Email',
            value: email,
            onChange: (event) => {
              setEmail(event.currentTarget.value);
            },
            errors: errors?.email,
            autocomplete: 'username',
          }),
          React.createElement(TextInput, {
            id: 'organization',
            label: 'Organization',
            value: organization,
            onChange: (event) => {
              setOrganization(event.currentTarget.value);
            },
            errors: errors?.organization,
          }),
          React.createElement(TextInput, {
            id: 'password',
            label: 'Password',
            value: password,
            onChange: (event) => {
              setPassword(event.currentTarget.value);
            },
            password: true,
            errors: errors?.password,
            autocomplete: 'new-password',
          }),
          React.createElement(TextInput, {
            id: 'passwordConfirmation',
            label: 'Password Confirmation',
            value: passwordConfirmation,
            onChange: (event) => {
              setPasswordConfirmation(event.currentTarget.value);
            },
            password: true,
            errors: errors?.passwordConfirmation,
            autocomplete: 'new-password',
          })
        ),
        React.createElement(Button, { text: 'Register', onClick: () => handleRegister() }),
        React.createElement(Link, { to: '/login' }, React.createElement(Button, { text: 'Cancel' }))
      )
    )
  );
};
export default Register;
