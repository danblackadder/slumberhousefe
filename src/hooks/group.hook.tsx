import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { GroupContext } from 'context/group.context';
import { GroupContextActionTypes } from 'models/group.context.types';
import { getGroup } from 'network/group.network';

export const useGroup = () => {
  const { groupId } = useParams();
  const { state, dispatch } = useContext(GroupContext);

  const updateGroup = () => {
    if (groupId) {
      getGroup({ groupId })
        .then((res) => dispatch({ type: GroupContextActionTypes.SET_GROUP, payload: { group: res } }))
        .catch((err) => {
          console.log(err);
          dispatch({ type: GroupContextActionTypes.REMOVE_GROUP });
        });
    }
  };

  useEffect(() => {
    if (groupId && !state.group) {
      updateGroup();
    }
  }, [groupId, state]);

  return {
    groupId: state.group?._id.toString(),
    group: state.group,
    updateGroup,
  };
};
