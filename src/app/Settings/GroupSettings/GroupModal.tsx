import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import { FileUpload, TextArea, TextInput } from 'components/Forms';
import Modal from 'components/Modal';
import { IGroupErrors } from 'models/group.types';
import { IGroupSetting } from 'models/settings.types';
import { postSettingsGroups, putSettingsGroups } from 'network/settings';

const GroupModal = ({
  updateGroups,
  onClose,
  group,
  edit,
}: {
  updateGroups: () => void;
  onClose: () => void;
  group?: IGroupSetting;
  edit?: boolean;
}) => {
  const [name, setName] = useState<string>(group?.name || '');
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
        <Button
          text={edit ? 'Update company' : 'Create company'}
          width={160}
          onClick={() => (edit ? handlePutGroup() : handlePostGroup())}
        />
      </div>
    </Modal>
  );
};

export default GroupModal;
