import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BiHide, BiShow } from 'react-icons/bi';

export const TextInput = ({
  id,
  value,
  label,
  onChange,
  onClick,
  errors,
  password,
  autocomplete,
  width,
  disabled,
  inline,
  placeholder,
  autoFocus,
  ref,
}: {
  id: string;
  value: string;
  label?: string;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  errors?: string[];
  password?: boolean;
  autocomplete?: string;
  width?: number;
  disabled?: boolean;
  inline?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className={`relative margin-vertical-8 ${inline ? 'flex-row align-center' : 'flex-column align-stretch'}`}>
      {label && <div className={`margin-bottom-4 ${inline && 'margin-right-8'}`}>{label}</div>}
      <div className={`${width ? `width-${width}` : 'full-width'}`}>
        <input
          type={password && !showPassword ? 'password' : 'text'}
          id={id}
          name={id}
          onChange={onChange}
          value={value}
          className={`height-32 padding-4 font-16 border-neutral focus-primary ${
            width ? `width-${width}` : 'full-width'
          }`}
          autoComplete={autocomplete}
          placeholder={placeholder}
          disabled={disabled}
          onClick={onClick}
          autoFocus={autoFocus}
          ref={ref}
        />
        {password && (
          <div
            className="absolute height-32 width-32 right-0 center-items primary pointer"
            style={{ top: 23 }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <BiShow /> : <BiHide />}
          </div>
        )}
      </div>
      {errors && errors.length > 0 && (
        <div className="flex-column font-10 error">
          {errors.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export const TextArea = ({
  id,
  label,
  onChange,
  onClick,
  value,
  errors,
  width,
}: {
  id: string;
  label: string;
  onChange: (event: React.FormEvent<HTMLTextAreaElement>) => void;
  onClick?: () => void;
  value: string;
  errors?: string[];
  width?: number;
}) => {
  return (
    <div className={`relative ${width ? `width-${width}` : 'full-width'} flex-column align-stretch margin-vertical-8`}>
      <div className="margin-bottom-4">{label}</div>
      <textarea
        id={id}
        name={id}
        onChange={onChange}
        onClick={onClick}
        value={value}
        className="height-128 padding-4 font-16 resize-none border-neutral focus-primary"
      />
      {errors && errors.length > 0 && (
        <div className="flex-column font-10 error">
          {errors.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export interface AcceptedFile {
  name: string;
  preview: string;
}

export const FileUpload = ({
  label,
  onChange,
  image,
}: {
  label: string;
  onChange: (file: File[]) => void;
  image?: string;
}) => {
  const [files, setFiles] = useState<AcceptedFile[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      onChange(acceptedFiles);
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

  return (
    <div>
      <div className="margin-bottom-4 flex-row">
        <div className="margin-right-4">{label}</div>
        {thumbs && thumbs.length > 0 && <div> - preview</div>}
      </div>
      <div className="relative border-neutral height-128 center-items overflow-hidden">
        <div className="height-128 full-width pointer center-items" {...getRootProps()}>
          <input {...getInputProps()} />
          {thumbs && thumbs.length > 0 ? (
            thumbs
          ) : image ? (
            <img src={image} className="center-image" />
          ) : (
            <div>Drag 'n' drop some files here, or click to select files</div>
          )}
        </div>
      </div>
    </div>
  );
};
