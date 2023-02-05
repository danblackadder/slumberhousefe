import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import { TextInput } from 'components/Forms';
import Header from 'components/Header';
import { FullWidth } from 'components/Layout';
import Loading from 'components/Loading';
import { IRegistrationErrors } from 'models/authentication.types';
import { register } from 'network/authentication.network';

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [errors, setErrors] = useState<IRegistrationErrors>();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleRegister = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      register({ firstName, lastName, email, organization, password, passwordConfirmation })
        .then(() => {
          toast.success('Registration successful');
          navigate('/login');
        })
        .catch((err) => setErrors(err.errors));
    },
    [firstName, lastName, email, organization, password, passwordConfirmation]
  );

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
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleRegister(event)}
        >
          <Header text="Register" />
          <div className="margin-bottom-16">
            <TextInput
              id="firstname"
              label="First Name"
              value={firstName}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setFirstName(event.currentTarget.value);
              }}
              errors={errors?.firstName}
            />
            <TextInput
              id="lastname"
              label="Last Name"
              value={lastName}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setLastName(event.currentTarget.value);
              }}
              errors={errors?.lastName}
            />
            <TextInput
              id="email"
              label="Email"
              value={email}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setEmail(event.currentTarget.value);
              }}
              errors={errors?.email}
              autocomplete="username"
            />
            <TextInput
              id="organization"
              label="Organization"
              value={organization}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setOrganization(event.currentTarget.value);
              }}
              errors={errors?.organization}
            />
            <TextInput
              id="password"
              label="Password"
              value={password}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setPassword(event.currentTarget.value);
              }}
              password={true}
              errors={errors?.password}
              autocomplete="new-password"
            />
            <TextInput
              id="passwordConfirmation"
              label="Password Confirmation"
              value={passwordConfirmation}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setPasswordConfirmation(event.currentTarget.value);
              }}
              password={true}
              errors={errors?.passwordConfirmation}
              autocomplete="new-password"
            />
          </div>
          <Button text="Register" type="submit" />
          <Link to="/login">
            <Button text="Cancel" />
          </Link>
        </form>
      </div>
    </FullWidth>
  );
};

export default Register;
