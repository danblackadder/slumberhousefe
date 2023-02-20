import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import { FileUpload, TextArea, TextInput } from 'components/Forms';
import Modal from 'components/Modal';
import { IGroup, IGroupErrors } from 'models/group.types';
import { postSettingsGroups } from 'network/settings.network';
import { getGroupName } from 'utility/helper';

const GroupModal = ({
  updateGroups,
  onClose,
  group,
}: {
  updateGroups: () => void;
  onClose: () => void;
  group?: IGroup;
}) => {
  const [name, setName] = useState<string>(getGroupName({ name: group?.name }) || '');
  const [description, setDescription] = useState<string>(group?.description || '');
  const [image, setImage] = useState<File[]>();
  const [errors, setErrors] = useState<IGroupErrors>();

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

  return (
    <Modal onClose={onClose} width={500}>
      <FileUpload label="Image" image={group?.image} onChange={(file) => setImage(file)} />
      <TextInput
        id="company"
        label="Company Name"
        value={name}
        onChange={(event: React.FormEvent<HTMLInputElement>) => {
          setName(event.currentTarget.value);
        }}
        errors={errors?.name}
      />
      <TextArea
        id="description"
        label="Description"
        value={description}
        onChange={(event: React.FormEvent<HTMLTextAreaElement>) => {
          setDescription(event.currentTarget.value);
        }}
      />
      <div className="flex-row full-width align-center justify-space-between margin-top-16">
        <Button text="Cancel" width={160} onClick={onClose} />
        <Button text="Create group" width={160} onClick={() => handlePostGroup()} />
      </div>
    </Modal>
  );
};

export default GroupModal;
