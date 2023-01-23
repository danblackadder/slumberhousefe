import { Dispatch } from 'react';
import { getUser } from 'network/authentication';
import { UserContextActions, UserContextActionTypes } from 'models/user.context.types';

const useUser = ({ dispatch }: { dispatch: Dispatch<UserContextActions> }) => {
  const updateUser = () => {
    getUser()
      .then((res) => {
        dispatch({ type: UserContextActionTypes.USER, payload: { user: res } });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: UserContextActionTypes.LOGOUT });
      });
  };

  return { updateUser };
};

export default useUser;
