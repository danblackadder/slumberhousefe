import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import { TextInput } from 'components/Forms';
import Modal from 'components/Modal';
import Select from 'components/Select';
import { IOption } from 'models/generic.types';
import { IUserSetting, OrganizationRole, OrganizationRoleOptions } from 'models/settings.types';
import { putSettingsUser } from 'network/settings.network';
import { capitalize } from 'utility/helper';

const EditUserModal = ({
  user,
  onClose,
  updateUsers,
}: {
  user: IUserSetting;
  onClose: () => void;
  updateUsers: () => void;
}) => {
  const [selectedRole, setSelectedRole] = useState<IOption<OrganizationRole> | undefined>(
    OrganizationRoleOptions.find((option) => option.value === user.role)
  );

  const options = useMemo(() => {
    if (user.role === OrganizationRole.OWNER) {
      return OrganizationRoleOptions;
    }

    return OrganizationRoleOptions.filter((option) => option.value === OrganizationRole.OWNER);
  }, [user]);

  const save = () => {
    if (selectedRole) {
      putSettingsUser({ id: user._id, role: selectedRole.value })
        .then(() => {
          updateUsers();
          onClose();
          toast.success('User updated');
        })
        .catch((err: unknown) => {
          console.log(err);
          toast.error('Something went wrong...');
        });
    }
  };
  return (
    <Modal onClose={onClose} width={400}>
      <TextInput id="firstName" label="First name" value={user.firstName} disabled={true} width={250} />
      <TextInput id="lastName" label="Last name" value={user.lastName} disabled={true} width={250} />
      <TextInput id="email" label="Email" value={user.email} disabled={true} width={250} />
      <Select
        id="role"
        label="Role"
        selectedItem={selectedRole}
        setSelectedItem={setSelectedRole}
        options={options}
        width={250}
      />
      <TextInput id="status" label="Status" value={capitalize(user.status)} disabled={true} width={250} />
      <div className="flex-row justify-space-between">
        <Button text="Cancel" onClick={() => onClose()} width={150} />
        <Button text="Save" onClick={() => save()} width={150} />
      </div>
    </Modal>
  );
};

export default EditUserModal;
