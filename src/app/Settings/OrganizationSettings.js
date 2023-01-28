import React, { useState } from 'react';
import Button from 'components/Button';
import { TextInput } from 'components/Forms';
const OrganizationSettings = () => {
  const [name, setName] = useState('');
  const [errors] = useState();
  return React.createElement(
    'div',
    { className: 'flex-column' },
    React.createElement(TextInput, {
      id: 'name',
      label: 'Name',
      value: name,
      onChange: (event) => {
        setName(event.currentTarget.value);
      },
      errors: errors?.name,
      width: 400,
    }),
    React.createElement(Button, { text: 'Save changes', width: 200 }),
    React.createElement(Button, { text: 'Delete organization', disabled: true, width: 200 })
  );
};
export default OrganizationSettings;
