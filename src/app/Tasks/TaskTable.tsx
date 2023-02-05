import React from 'react';
import { MdErrorOutline } from 'react-icons/md';

import Loading from 'components/Loading';
import { ITask } from 'models/task.types';

const TaskTable = ({ tasks, error, loading }: { tasks: ITask[]; error: string; loading: boolean }) => {
  if (loading) {
    return <Loading color="primary" height={512} />;
  }

  if (tasks.length > 0) {
    return (
      <div className="flex-column margin-vertical-16 padding-left-16">
        {tasks.map((task) => (
          <div key={task._id}>{task.title}</div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex-column full-width align-center padding-vertical-64 text-center">
      <MdErrorOutline size={128} className="primary margin-bottom-8" />
      <div>{error}</div>
    </div>
  );
};

export default TaskTable;
