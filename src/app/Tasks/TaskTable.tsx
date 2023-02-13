import React, { Dispatch, SetStateAction, useCallback } from 'react';

import Accordion from 'components/Accordion';
import Loading from 'components/Loading';
import { GroupBy, ITask, TaskPriority, TaskStatus } from 'models/task.types';
import { capitalize } from 'utility/helper';

import TaskItem from './TaskItem';

const TaskTable = ({
  tasks,
  loading,
  groupBy,
  setActiveTask,
}: {
  tasks: ITask[];
  loading: boolean;
  groupBy: GroupBy;
  setActiveTask: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const taskGroups = useCallback(() => {
    switch (groupBy) {
      case GroupBy.STATUS:
        return Object.values(TaskStatus);
      case GroupBy.PRIORITY:
        return Object.values(TaskPriority);
      default: {
        const exhaustiveCheck: never = groupBy;
        throw new Error(`Unhandled case: ${exhaustiveCheck}`);
      }
    }
  }, [groupBy, tasks]);

  const groupTasks = useCallback(
    (group: string) => {
      switch (groupBy) {
        case GroupBy.STATUS:
          return tasks.filter((task) => task.status === group);
        case GroupBy.PRIORITY:
          return tasks.filter((task) => task.priority === group);
        default: {
          const exhaustiveCheck: never = groupBy;
          throw new Error(`Unhandled case: ${exhaustiveCheck}`);
        }
      }
    },
    [groupBy, tasks]
  );

  const renderView = useCallback(() => {
    const groups = taskGroups();

    return groups.map((group) => {
      const renderTasks = groupTasks(group as string);

      return (
        <Accordion key={group} header={`${capitalize(group as string)} - ${renderTasks.length}`}>
          {renderTasks.length > 0 ? (
            renderTasks.map((task) => <TaskItem key={task._id} setActiveTask={setActiveTask} task={task} />)
          ) : (
            <div
              className="relative flex-row justify-center padding-8 border-neutral height-40"
              style={{ margin: '0 -2px -2px -2px' }}
            >
              There are currently no tasks to display for this group.
            </div>
          )}
        </Accordion>
      );
    });
  }, [tasks, groupBy]);

  if (loading) {
    return <Loading color="primary" height={512} />;
  }

  return <div className="flex-column margin-vertical-16">{renderView()}</div>;
};

export default TaskTable;
