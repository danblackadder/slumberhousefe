import React, { useCallback, useContext, useState } from 'react';
import { MdDelete, MdEdit, MdOpenInNew, MdPeople } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { GroupContext } from 'context/group.context';
import { GroupContextActionTypes } from 'models/group.context.types';
import { IGroupSetting } from 'models/settings.types';
import { getGroupName } from 'utility/helper';

import DeleteGroupModal from './DeleteGroupModal';
import GroupModal from './GroupModal';

const GroupItem = ({ group, updateGroups }: { group: IGroupSetting; updateGroups: () => void }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(GroupContext);

  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const handleManageGroupUsers = useCallback(() => {
    dispatch({ type: GroupContextActionTypes.SET_GROUP, payload: { group } });
    navigate('/users');
  }, [group]);

  const handleGroup = () => {
    dispatch({ type: GroupContextActionTypes.SET_GROUP, payload: { group } });
    navigate('/dashboard');
  };

  return (
    <>
      <div className="relative flex-row align-center margin-bottom-8 padding-left-16 border-neutral">
        <div className="width-200 padding-horizontal-8">{getGroupName({ name: group.name })}</div>
        <div className="width-100 padding-horizontal-8">{group.users}</div>
        <div className="flex-1 flex-row justify-flex-end">
          <div className="height-40 width-40 center-items pointer black hover-primary" onClick={() => handleGroup()}>
            <MdOpenInNew size={16} />
          </div>
          <div
            className="height-40 width-40 center-items pointer black hover-primary"
            onClick={() => handleManageGroupUsers()}
          >
            <MdPeople size={16} />
          </div>
          <div
            className="height-40 width-40 center-items pointer black hover-primary"
            onClick={() => setEditModal(true)}
          >
            <MdEdit size={16} />
          </div>
          <div
            className="height-40 width-40 center-items pointer error hover-primary"
            onClick={() => setDeleteModal(true)}
          >
            <MdDelete size={16} />
          </div>
        </div>
      </div>
      {editModal && (
        <GroupModal onClose={() => setEditModal(false)} group={group} updateGroups={updateGroups} edit={true} />
      )}
      {deleteModal && (
        <DeleteGroupModal onClose={() => setDeleteModal(false)} group={group} updateGroups={updateGroups} />
      )}
    </>
  );
};

export default GroupItem;
