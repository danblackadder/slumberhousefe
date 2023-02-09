import React, { useCallback, useEffect, useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';

import Loading from 'components/Loading';
import { GroupBy, ITask, TaskPriority, TaskStatus, ViewMode } from 'models/task.types';
import { capitalize } from 'utility/helper';
import Accordion from 'components/Accordion';
import TaskItem from './TaskItem';
import { IOption } from 'models/generic.types';
import { getTaskTags, getTaskUsers } from 'network/tasks.network';
import { useGroup } from 'network/group.network';

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
  const { groupId } = useGroup();

  const [tagOptions, setTagOptions] = useState<IOption<string>[]>([]);
  const [userOptions, setUserOptions] = useState<IOption<string>[]>([]);

  useEffect(() => {
    getTaskTags({ groupId }).then((res) =>
      setTagOptions(
        res.map((tag) => {
          return { value: tag, label: capitalize(tag) };
        })
      )
    );

    getTaskUsers({ groupId }).then((res) =>
      setUserOptions(
        res.map((user) => {
          return {
            value: user._id.toString(),
            label: `${capitalize(user.firstName)} ${capitalize(user.lastName)} - ${user.email}`,
          };
        })
      )
    );
  }, []);

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
            {tasks.length > 0 ? (
              tasks.map((task) => <TaskItem task={task} tagOptions={tagOptions} userOptions={userOptions} />)
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
