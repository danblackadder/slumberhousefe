import React, { Dispatch, SetStateAction } from 'react';
import { format, parseISO } from 'date-fns';

import { ITask } from 'models/task.types';
import { capitalize } from 'utility/helper';

const TaskItem = ({
  task,
  setActiveTask,
}: {
  task: ITask;
  setActiveTask: Dispatch<SetStateAction<string | undefined>>;
}) => {
  return (
    <div
      className="relative flex-row hover-z-index border-neutral hover-border-primary pointer"
      style={{ margin: '0 -2px -2px -2px' }}
      onClick={() => setActiveTask(task._id.toString())}
    >
      <div className="flex-column flex-1 margin-left-8 padding-8">
        <div className="flex-1">{task.title}</div>
        <div className="margin-horizontal-4 flex-row align-center">
          {task?.users?.map((_value, i) => (
            <div
              key={i}
              className="border-circle-white background-neutral height-32 width-32"
              style={{ marginLeft: -8 }}
            />
          ))}
        </div>
      </div>
      <div className="flex-column width-200 padding-8 align-flex-end">
        <div className="flex-row align-center">
          {task.due && (
            <div className="margin-horizontal-4 flex-row align-center padding-4">
              <div>{`Due ${format(parseISO(task.due), 'dd-MM-yyyy')}`}</div>
            </div>
          )}
        </div>
        {task.priority && (
          <div className="flex-row align-center">
            <div className="margin-horizontal-4 flex-row align-center padding-4">
              <div>{`Priority ${capitalize(task.priority)}`}</div>
            </div>
          </div>
        )}
        <div className="flex-row align-center margin-vertical-4">
          {task.tags?.map((tag) => (
            <div key={tag} className="margin-right-4 font-14 white background-primary text-upper padding-4">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
