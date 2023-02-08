import React, { useCallback } from 'react';
import { MdDateRange, MdErrorOutline, MdPeopleAlt, MdPriorityHigh } from 'react-icons/md';

import Loading from 'components/Loading';
import { GroupBy, ITask, TaskPriority, TaskStatus, ViewMode } from 'models/task.types';
import { capitalize } from 'utility/helper';
import Accordion from 'components/Accordion';
import { format, parseISO } from 'date-fns';

const TaskTable = ({
  tasks,
  error,
  loading,
  viewMode,
  groupBy,
}: {
  tasks: ITask[];
  error: string;
  loading: boolean;
  viewMode: ViewMode;
  groupBy: GroupBy;
}) => {
  const taskGroups = useCallback(() => {
    switch (groupBy) {
      case GroupBy.STATUS:
        return Object.values(TaskStatus);
      case GroupBy.PRIORITY:
        return Object.values(TaskPriority);
      default:
        const exhaustiveCheck: never = groupBy;
        throw new Error(`Unhandled case: ${exhaustiveCheck}`);
    }
  }, [groupBy, tasks]);

  const groupTasks = useCallback(
    (group: string) => {
      switch (groupBy) {
        case GroupBy.STATUS:
          return tasks.filter((task) => task.status === group);
        case GroupBy.PRIORITY:
          return tasks.filter((task) => task.priority === group);
        default:
          const exhaustiveCheck: never = groupBy;
          throw new Error(`Unhandled case: ${exhaustiveCheck}`);
      }
    },
    [groupBy, tasks]
  );

  const renderView = () => {
    const groups = taskGroups();

    if (viewMode === ViewMode.ROW) {
      return groups.map((group) => {
        const tasks = groupTasks(group as string);

        return (
          <Accordion header={`${capitalize(group as string)} - ${tasks.length}`}>
            {tasks.map((task) => {
              console.log(task.due);
              return (
                <div className="flex-row align-center border-top-neutral padding-vertical-8 padding-horizontal-8">
                  <div className="flex-1">{task.title}</div>
                  <div className="margin-horizontal-4 flex-row align-center padding-4 background-primary white">
                    <div className="margin-right-4">
                      <MdPriorityHigh size={12} />
                    </div>
                    <div>{task.priority}</div>
                  </div>
                  {task.due && (
                    <div className="margin-horizontal-4 flex-row align-center padding-4 background-primary white">
                      <div className="margin-right-4">
                        <MdDateRange size={12} />
                      </div>
                      <div>{format(parseISO(task.due), 'dd-MM-yyyy')}</div>
                    </div>
                  )}
                  <div className="margin-horizontal-4 flex-row align-center padding-4 background-primary white">
                    <div className="margin-right-4">
                      <MdPeopleAlt size={12} />
                    </div>
                    <div>{task?.users?.length}</div>
                  </div>
                </div>
              );
            })}
          </Accordion>
        );
      });
    }

    if (viewMode === ViewMode.COLUMN) {
      return tasks.map((task) => <div key={task._id}>{task.title}</div>);
    }

    return null;
  };

  if (loading) {
    return <Loading color="primary" height={512} />;
  }

  if (tasks.length > 0) {
    return <div className="flex-column margin-vertical-16">{renderView()}</div>;
  }

  return (
    <div className="flex-column full-width align-center padding-vertical-64 text-center">
      <MdErrorOutline size={128} className="primary margin-bottom-8" />
      <div>{error}</div>
    </div>
  );
};

export default TaskTable;
