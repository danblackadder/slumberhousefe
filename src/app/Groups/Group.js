import React, { useContext } from 'react';
import { MdPeople } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Truncate from 'react-truncate';
import { GroupContext } from 'context/group.context';
import { GroupContextActionTypes } from 'models/group.context.types';
const Group = ({ group }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(GroupContext);
  const { name, description, image, users } = group;
  const handleGroup = () => {
    dispatch({ type: GroupContextActionTypes.SET_GROUP, payload: { group } });
    navigate('/dashboard');
  };
  return React.createElement(
    'div',
    { className: 'relative flex-column height-256 width-256 border-primary pointer', onClick: () => handleGroup() },
    React.createElement('div', {
      className: 'full-height full-width hover-background-primary-shadow absolute top-0 left-0',
      style: { zIndex: 1 },
    }),
    image &&
      React.createElement(
        'div',
        { className: 'relative height-128 full-width overflow-hidden' },
        React.createElement('img', { className: 'center-image', src: image })
      ),
    React.createElement(
      'div',
      { className: 'relative flex-column flex-1 padding-8' },
      React.createElement('div', { className: 'font-24 margin-bottom-4' }, name),
      React.createElement('div', { className: 'flex-1' }, React.createElement(Truncate, { lines: 4 }, description)),
      React.createElement(
        'div',
        { className: 'flex-row full-width justify-flex-end align-center primary' },
        React.createElement(MdPeople, null),
        React.createElement('span', { className: 'margin-left-4 font-12' }, users)
      )
    )
  );
};
export default Group;
