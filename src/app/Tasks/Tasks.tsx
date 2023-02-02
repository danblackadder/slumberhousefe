import Header from 'components/Header';
import Loading from 'components/Loading';
import { GroupContext } from 'context/group.context';
import { ITask } from 'models/task.types';
import { getGroupTasks } from 'network/tasks.network';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Tasks = () => {
  const { state: groupState } = useContext(GroupContext);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const updateTasks = useCallback(() => {
    if (groupState.group) {
      getGroupTasks({
        groupId: groupState?.group?._id,
      })
        .then((res) => {
          setTasks(res);
        })
        .catch((err) => {
          console.log(err);
          toast.error('Something went wrong...');
        })
        .finally(() => setLoading(false));
    }
  }, [groupState]);

  useEffect(() => {
    setLoading(true);
    updateTasks();
  }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <div className="container">
      <Header text="Tasks" />
      <div className="flex-column">{loading && <Loading color="primary" height={512} />}</div>
    </div>
  );
};

export default Tasks;
