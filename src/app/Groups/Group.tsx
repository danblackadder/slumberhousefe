import { GroupContext } from 'context/group.context';
import { GroupContextActionTypes } from 'models/group.context.types';
import { IGroup } from 'models/group.types';
import React, { useContext } from 'react';
import { MdPeople } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Truncate from 'react-truncate';

const Group = ({ group }: { group: IGroup }) => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(GroupContext);
  const { name, description, image, users } = group;

  const handleGroup = () => {
    dispatch({ type: GroupContextActionTypes.SET_GROUP, payload: { group } });
    navigate('/dashboard');
  };

  return (
    <div className="relative flex-column height-256 width-256 border-primary pointer" onClick={() => handleGroup()}>
      <div
        className="full-height full-width hover-background-primary-shadow absolute top-0 left-0"
        style={{ zIndex: 1 }}
      />
      {image && (
        <div className="relative height-128 full-width overflow-hidden">
          <img className="center-image" src={image} />
        </div>
      )}
      <div className="relative flex-column flex-1 padding-8">
        <div className="font-24 margin-bottom-4">{name}</div>
        <div className="flex-1">
          <Truncate lines={4}>{description}</Truncate>
        </div>
        <div className="flex-row full-width justify-flex-end align-center primary">
          <MdPeople />
          <span className="margin-left-4 font-12">{users}</span>
        </div>
      </div>
    </div>
  );
};

export default Group;
