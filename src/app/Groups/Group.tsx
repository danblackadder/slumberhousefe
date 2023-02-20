import React, { useContext } from 'react';
import { MdPeople, MdWidgets } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';

import { GroupContext } from 'context/group.context';
import { GroupContextActionTypes } from 'models/group.context.types';
import { IGroup } from 'models/group.types';

const Group = ({ group }: { group: IGroup }) => {
  const { dispatch } = useContext(GroupContext);
  const { _id: groupId, name, description, image, widgets, users } = group;

  return (
    <Link
      className="relative flex-column height-256 width-256 border-primary pointer"
      to={`/groups/${groupId.toString()}/`}
      onClick={() => dispatch({ type: GroupContextActionTypes.SET_GROUP, payload: { group } })}
    >
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
        <div className="font-24 margin-bottom-4 primary">{name.toUpperCase()}</div>
        <div className="flex-1">
          <Truncate lines={2}>{description}</Truncate>
        </div>
        <div className="flex-row full-width justify-flex-end align-center primary">
          <div className="flex-row align-center margin-right-8">
            <MdWidgets />
            <span className="margin-left-4 font-12">{widgets.length}</span>
          </div>
          <div className="flex-row align-center">
            <MdPeople />
            <span className="margin-left-4 font-12">{users.length}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Group;
