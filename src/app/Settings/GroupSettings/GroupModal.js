import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import Button from 'components/Button';
import { FileUpload, TextArea, TextInput } from 'components/Forms';
import Modal from 'components/Modal';
import { postSettingsGroups, putSettingsGroups } from 'network/settings';
const GroupModal = ({ updateGroups, onClose, group, edit }) => {
  const [name, setName] = useState(group?.name || '');
  const [description, setDescription] = useState(group?.description || '');
  const [image, setImage] = useState();
  const [errors, setErrors] = useState();
  const handlePostGroup = useCallback(() => {
    postSettingsGroups({ name, description, image })
      .then(() => {
        updateGroups();
        onClose();
      })
      .catch((err) => {
        setErrors(err.errors);
        toast.error('Something went wrong...');
      });
  }, [name, description, image]);
  const handlePutGroup = useCallback(() => {
    if (group) {
      putSettingsGroups({ id: group._id, name, description, image })
        .then(() => {
          updateGroups();
          onClose();
        })
        .catch((err) => {
          setErrors(err.errors);
          toast.error('Something went wrong...');
        });
    }
  }, [group, name, description, image]);
  return React.createElement(
    Modal,
    { onClose: onClose, width: 500 },
    React.createElement(FileUpload, { label: 'Image', image: group?.image, onChange: (file) => setImage(file) }),
    React.createElement(TextInput, {
      id: 'company',
      label: 'Company Name',
      value: name,
      onChange: (event) => {
        setName(event.currentTarget.value);
      },
      errors: errors?.name,
    }),
    React.createElement(TextArea, {
      id: 'description',
      label: 'Description',
      value: description,
      onChange: (event) => {
        setDescription(event.currentTarget.value);
      },
    }),
    React.createElement(
      'div',
      { className: 'flex-row full-width align-center justify-space-between margin-top-16' },
      React.createElement(Button, { text: 'Cancel', width: 160, onClick: onClose }),
      React.createElement(Button, {
        text: edit ? 'Update group' : 'Create group',
        width: 160,
        onClick: () => (edit ? handlePutGroup() : handlePostGroup()),
      })
    )
  );
};
export default GroupModal;
