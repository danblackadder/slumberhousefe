import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Button from 'components/Button';
import { TextInput } from 'components/Forms';
import Modal from 'components/Modal';
import { postSettingsUsers } from 'network/settings';
const InviteUserModal = ({ setModal, updateUsers }) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState();
  const handlePostUser = () => {
    postSettingsUsers({ email })
      .then(() => {
        updateUsers();
        setModal(false);
      })
      .catch((err) => {
        setErrors(err.errors);
        toast.error('Something went wrong...');
      });
  };
  return React.createElement(
    Modal,
    { onClose: () => setModal(false), width: 500 },
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
        errors: errors?.email,
      }),
      React.createElement(
        'div',
        { className: 'flex-row full-width align-center justify-space-between margin-top-16' },
        React.createElement(Button, {
          text: 'Cancel',
          width: 160,
          onClick: () => {
            setModal(false);
          },
        }),
        React.createElement(Button, { text: 'Send invite', width: 160, onClick: () => handlePostUser() })
      )
    )
  );
};
export default InviteUserModal;
