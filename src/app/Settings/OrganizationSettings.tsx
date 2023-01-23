import Button from 'components/Button';
import { TextInput } from 'components/Forms';
import { IOrganizationSettingsErrors } from 'models/settings.types';
import React, { useState } from 'react';

const OrganizationSettings = () => {
  const [name, setName] = useState<string>('');
  const [errors, setErrors] = useState<IOrganizationSettingsErrors>();

  return (
    <div className="flex-column">
      <TextInput
        id="name"
        label="Name"
        value={name}
        onChange={(event: React.FormEvent<HTMLInputElement>) => {
          setName(event.currentTarget.value);
        }}
        errors={errors?.name}
        width={400}
      />
      <Button text="Save changes" width={200} />
      <Button text="Delete organization" disabled={true} width={200} />
    </div>
  );
};

export default OrganizationSettings;
