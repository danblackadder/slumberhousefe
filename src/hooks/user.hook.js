import { UserContextActionTypes } from 'models/user.context.types';
import { getUser } from 'network/authentication';
const useUser = ({ dispatch }) => {
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
