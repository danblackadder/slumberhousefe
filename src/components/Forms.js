import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BiHide, BiShow } from 'react-icons/bi';
export const TextInput = ({ id, label, value, onChange, errors, password, autocomplete, width, disabled }) => {
  const [showPassword, setShowPassword] = useState(false);
  return React.createElement(
    'div',
    { className: `relative ${width ? `width-${width}` : 'full-width'} flex-column align-stretch margin-vertical-8` },
    React.createElement('div', { className: 'margin-bottom-4' }, label),
    React.createElement('input', {
      type: password && !showPassword ? 'password' : 'text',
      id: id,
      name: id,
      onChange: onChange,
      value: value,
      className: 'height-32 padding-4 font-16 border-neutral',
      autoComplete: autocomplete,
      disabled: disabled,
    }),
    password &&
      React.createElement(
        'div',
        {
          className: 'absolute height-32 width-32 right-0 center-items primary pointer',
          style: { top: 23 },
          onClick: () => setShowPassword(!showPassword),
        },
        showPassword ? React.createElement(BiShow, null) : React.createElement(BiHide, null)
      ),
    errors &&
      errors.length > 0 &&
      React.createElement(
        'div',
        { className: 'flex-column font-10 error' },
        errors.map((error) => React.createElement('div', { key: error }, error))
      )
  );
};
export const TextArea = ({ id, label, onChange, value, errors, width }) => {
  return React.createElement(
    'div',
    { className: `relative ${width ? `width-${width}` : 'full-width'} flex-column align-stretch margin-vertical-8` },
    React.createElement('div', { className: 'margin-bottom-4' }, label),
    React.createElement('textarea', {
      id: id,
      name: id,
      onChange: onChange,
      value: value,
      className: 'height-128 padding-4 font-16 resize-none',
    }),
    errors &&
      errors.length > 0 &&
      React.createElement(
        'div',
        { className: 'flex-column font-10 error' },
        errors.map((error) => React.createElement('div', { key: error }, error))
      )
  );
};
export const FileUpload = ({ label, onChange, image }) => {
  const [files, setFiles] = useState([]);
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
  const thumbs = files.map((file) =>
    React.createElement('img', {
      key: file.name,
      src: file.preview,
      className: 'center-image',
      // Revoke data uri after image is loaded
      onLoad: () => {
        URL.revokeObjectURL(file.preview);
      },
    })
  );
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);
  return React.createElement(
    'div',
    null,
    React.createElement(
      'div',
      { className: 'margin-bottom-4 flex-row' },
      React.createElement('div', { className: 'margin-right-4' }, label),
      thumbs && thumbs.length > 0 && React.createElement('div', null, ' - preview')
    ),
    React.createElement(
      'div',
      { className: 'relative border-neutral height-128 center-items overflow-hidden' },
      React.createElement(
        'div',
        { className: 'height-128 full-width pointer center-items', ...getRootProps() },
        React.createElement('input', { ...getInputProps() }),
        thumbs && thumbs.length > 0
          ? thumbs
          : image
          ? React.createElement('img', { src: image, className: 'center-image' })
          : React.createElement('div', null, "Drag 'n' drop some files here, or click to select files")
      )
    )
  );
};
