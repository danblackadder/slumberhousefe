import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import { AcceptedFile, TextInput } from 'components/Forms';
import Header from 'components/Header';
import { UserContext } from 'context/user.context';
import useUser from 'hooks/user.hook';
import { IProfileErrors } from 'models/profile.types';
import { putProfile } from 'network/profile.network';
import { capitalize } from 'utility/helper';

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const { updateUser } = useUser({ dispatch });

  const [firstName, setFirstName] = useState<string>(state.user?.firstName ? capitalize(state.user.firstName) : '');
  const [lastName, setLastName] = useState<string>(state.user?.lastName ? capitalize(state.user.lastName) : '');
  const [email, setEmail] = useState<string>(state.user?.email || '');
  const [errors, setErrors] = useState<IProfileErrors>();
  const [files, setFiles] = useState<AcceptedFile[]>([]);
  const [image, setImage] = useState<File[]>();
  const [hoverImage, setHoverImage] = useState<boolean>(false);

  const handleProfileUpdate = useCallback(() => {
    if (state.user) {
      putProfile({ userId: state.user?._id, email, firstName, lastName, image })
        .then(() => {
          updateUser();
          toast.success('Profile updated');
        })
        .catch((err) => {
          setErrors(err.errors);
          toast.error('Something went wrong...');
        });
    }
  }, [state, email, firstName, lastName, image]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <img
      key={file.name}
      src={file.preview}
      className="center-image"
      // Revoke data uri after image is loaded
      onLoad={() => {
        URL.revokeObjectURL(file.preview);
      }}
    />
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const onHover = (e: React.MouseEvent) => {
    e.preventDefault();
    setHoverImage(true);
    console.log('hovered');
  };

  const onHoverOver = (e: React.MouseEvent) => {
    e.preventDefault();
    setHoverImage(false);
  };

  return (
    <div className="container flex-column padding-horizontal-90 ">
      <div className="flex-row align-center justify-space-between">
        <Header text="Profile" />
        <Button text="Save changes" width={200} onClick={() => handleProfileUpdate()} />
      </div>
      <div className="margin-vertical-64">
        <div className="flex-column">
          <div className="flex-row">
            <div
              className="relative width-200 height-200 background-neutral border-circle-none margin-top-16 hover-border-primary pointer center-items overflow-hidden"
              onMouseEnter={(e: React.MouseEvent) => onHover(e)}
              onMouseLeave={(e: React.MouseEvent) => onHoverOver(e)}
              {...getRootProps()}
            >
              {hoverImage && (
                <div className="absolute top-0 left-0 full-height flex align-center justify-center full-width background-primary-shadow text-center text-bold white z-index">
                  Click to select
                  <br />a new image
                </div>
              )}
              <input {...getInputProps()} />
              {thumbs && thumbs.length > 0
                ? thumbs
                : state.user?.image && <img src={state.user?.image} className="center-image" />}
            </div>
            <div className="flex-column margin-left-64 flex-1">
              <TextInput
                id="firstname"
                label="First Name"
                value={firstName}
                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                  setFirstName(event.currentTarget.value);
                }}
                errors={errors?.firstName}
                width={300}
              />
              <TextInput
                id="lastname"
                label="Last Name"
                value={lastName}
                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                  setLastName(event.currentTarget.value);
                }}
                errors={errors?.lastName}
                width={300}
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
                width={300}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
