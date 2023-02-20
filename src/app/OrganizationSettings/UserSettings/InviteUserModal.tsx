import React, { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import { TextInput } from 'components/Forms';
import Modal from 'components/Modal';
import { IUserSettingPostErrors } from 'models/settings.types';
import { postSettingsUsers } from 'network/settings.network';

const InviteUserModal = ({
  setModal,
  updateUsers,
}: {
  setModal: Dispatch<SetStateAction<boolean>>;
  updateUsers: () => void;
}) => {
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<IUserSettingPostErrors>();

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

  return (
    <Modal onClose={() => setModal(false)} width={500}>
      <div className="margin-bottom-16">
        <TextInput
          id="email"
          label="Email"
          value={email}
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setEmail(event.currentTarget.value);
          }}
          errors={errors?.email}
        />
        <div className="flex-row full-width align-center justify-space-between margin-top-16">
          <Button
            text="Cancel"
            width={160}
            onClick={() => {
              setModal(false);
            }}
          />
          <Button text="Send invite" width={160} onClick={() => handlePostUser()} />
        </div>
      </div>
    </Modal>
  );
};

export default InviteUserModal;
