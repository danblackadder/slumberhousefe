import Modal from 'components/Modal';
import React, { useState, useContext, Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

import { UserContext } from 'context/user.context';
import { postGroup } from 'network/group';
import { IGroupErrors, TabGroupOptions } from 'models/group.types';
import useUser from 'hooks/user.hook';
import { FileUpload, TextArea, TextInput } from 'components/Forms';
import Button from 'components/Button';
import { Tab, TabsContainer } from 'components/Tabs';

const AddCompanyModal = ({ setModal }: { setModal: Dispatch<SetStateAction<boolean>> }) => {
  const { dispatch } = useContext(UserContext);
  const { updateUser } = useUser({ dispatch });

  const [active, setActive] = useState<TabGroupOptions>(TabGroupOptions.ADD_NEW);
  const [company, setCompany] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [invitationCode, setInvitationCode] = useState<string>('');
  const [image, setImage] = useState<File[]>();
  const [errors, setErrors] = useState<IGroupErrors>();

  const handlePostGroup = () => {
    postGroup({ name: company, description, image })
      .then(() => {
        updateUser();
        setCompany('');
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
        <TabsContainer>
          <Tab
            text="Add new"
            active={active === TabGroupOptions.ADD_NEW}
            onClick={() => setActive(TabGroupOptions.ADD_NEW)}
          />
          <Tab
            text="From invitation"
            active={active === TabGroupOptions.INVITE}
            onClick={() => setActive(TabGroupOptions.INVITE)}
            disabled={true}
          />
        </TabsContainer>
      </div>
      <>
        {active === TabGroupOptions.ADD_NEW && (
          <>
            <FileUpload label="Image" onChange={(file) => setImage(file)} />
            <TextInput
              id="company"
              label="Company Name"
              value={company}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setCompany(event.currentTarget.value);
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
              <Button
                text="Cancel"
                width={160}
                onClick={() => {
                  setModal(false);
                }}
              />
              <Button text="Create Company" width={160} onClick={() => handlePostGroup()} />
            </div>
          </>
        )}
        {active === TabGroupOptions.INVITE && (
          <>
            <TextInput
              id="invitation"
              label="Invitation code"
              value={invitationCode}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setInvitationCode(event.currentTarget.value);
              }}
              width={300}
              errors={errors?.name}
            />
            <div className="flex-row full-width align-center justify-space-between margin-top-16">
              <Button
                text="Cancel"
                width={160}
                onClick={() => {
                  setModal(false);
                }}
              />
              <Button text="Create Company" width={160} onClick={() => null} />
            </div>
          </>
        )}
      </>
    </Modal>
  );
};

export default AddCompanyModal;
