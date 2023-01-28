import axios from 'axios';
export const login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/authentication/login', { email, password })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};
export const register = ({ firstName, lastName, email, organization, password, passwordConfirmation }) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/authentication/register', { firstName, lastName, email, organization, password, passwordConfirmation })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};
export const getUser = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/authentication/me')
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};
