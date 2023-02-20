import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { IWidget } from 'models/widget.types';
import { getWidgets } from 'network/widgets.network';

const useWidgets = () => {
  const [widgets, setWidgets] = useState<IWidget[]>([]);

  useEffect(() => {
    getWidgets()
      .then((res) => setWidgets(res))
      .catch((err) => {
        console.log(err);
        toast.error('There was a problem getting widgets...');
      });
  }, []);

  return {
    widgets,
  };
};

export default useWidgets;
