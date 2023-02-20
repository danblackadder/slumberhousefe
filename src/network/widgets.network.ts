import axios from 'axios';

import { IWidget } from 'models/widget.types';

export const getWidgets = async () => {
  return new Promise<IWidget[]>((resolve, reject) => {
    axios
      .get('/widgets')
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};
