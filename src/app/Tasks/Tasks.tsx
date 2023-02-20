import React, { useEffect, useMemo, useState } from 'react';

import Button from 'components/Button';
import Header from 'components/Header';
import Select from 'components/Select';
import { useGroup } from 'hooks/group.hook';
import { IOption } from 'models/generic.types';
import { GroupBy, ITask } from 'models/task.types';
import { getTaskTags, getTaskUsers, useGroupTasks } from 'network/tasks.network';
import { capitalize } from 'utility/helper';

import TaskModal from './TaskModal';
import TaskTable from './TaskTable';

const Tasks = () => {
  const { groupId } = useGroup();

  const [modal, setModal] = useState<boolean>(false);
  const [groupBy, setGroupBy] = useState<GroupBy>(GroupBy.STATUS);
  const [activeTask, setActiveTask] = useState<string>();
  const [modalTask, setModalTask] = useState<ITask>();

  const { tasks, loading } = useGroupTasks({ groupId });

  const [tagOptions, setTagOptions] = useState<IOption<string>[]>([]);
  const [userOptions, setUserOptions] = useState<IOption<string>[]>([]);
  const [filterTags, setFilterTags] = useState<IOption<string>>();
  const [filterUsers, setFilterUsers] = useState<IOption<string>>();

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filterTags && filterUsers) {
        return (
          task.tags?.find((tag) => tag === filterTags?.value) &&
          task.users?.find((user) => user._id === filterUsers.value)
        );
      }

      if (filterTags) {
        return task.tags?.find((tag) => tag === filterTags?.value);
      }

      if (filterUsers) {
        return task.users?.find((user) => user._id === filterUsers.value);
      }

      return task;
    });
  }, [tasks, filterTags, filterUsers]);

  useEffect(() => {
    if (activeTask) {
      setModalTask(tasks.find((task) => task._id === activeTask));
      setModal(true);
    }
  }, [activeTask, tasks]);

  useEffect(() => {
    getTaskTags({ groupId }).then((res) =>
      setTagOptions(
        res.map((tag) => {
          return { value: tag, label: capitalize(tag) };
        })
      )
    );

    getTaskUsers({ groupId }).then((res) => {
      const users = res.map((user) => {
        return {
          value: user._id.toString(),
          label: `${capitalize(user.firstName)} ${capitalize(user.lastName)} - ${user.email}`,
        };
      });
      const uniqueUsers = users.filter(
        (value, index, self) => index === self.findIndex((user) => user.value === value.value)
      );
      setUserOptions(uniqueUsers);
    });
  }, []);

  return (
    <div className="container">
      <Header text="Tasks" />
      <div className="flex-column">
        <div className="flex-row justify-space-between align-flex-start">
          <div className="flex-column flex-1">
            <div className="flex-row align-center justify-flex-start">
              <div className="margin-right-4 width-100">Group by</div>
              <div
                className={`flex center-items padding-4 margin-right-4 width-80 pointer border-primary ${
                  groupBy === GroupBy.STATUS
                    ? 'background-primary white'
                    : 'background-white primary hover-background-primary hover-white'
                }`}
                onClick={() => setGroupBy(GroupBy.STATUS)}
              >
                Status
              </div>
              <div
                className={`flex center-items padding-4 margin-right-4 width-80 pointer border-primary ${
                  groupBy === GroupBy.PRIORITY
                    ? 'background-primary white'
                    : 'background-white primary hover-background-primary hover-white'
                }`}
                onClick={() => setGroupBy(GroupBy.PRIORITY)}
              >
                Priority
              </div>
            </div>
            <div className="flex-row align-center justify-flex-start margin-top-8">
              <div className="margin-right-4 width-100">Filter by</div>
              <div className="width-200 margin-right-8">
                <Select
                  id="tags"
                  label="Tags"
                  selectedItem={filterTags}
                  setSelectedItem={setFilterTags}
                  options={tagOptions}
                  inline={true}
                />
              </div>
              <div className="width-400 margin-right-8">
                <Select
                  id="users"
                  label="Users"
                  selectedItem={filterUsers}
                  setSelectedItem={setFilterUsers}
                  options={userOptions}
                  inline={true}
                />
              </div>
            </div>
          </div>
          <Button text="Add new task" width={200} onClick={() => setModal(true)} />
        </div>
        <div className="flex-row align-center justify-space-between margin-bottom-16"></div>
        <TaskTable tasks={filteredTasks} loading={loading} groupBy={groupBy} setActiveTask={setActiveTask} />
      </div>
      {modal && (
        <TaskModal
          onClose={() => {
            setActiveTask(undefined);
            setModalTask(undefined);
            setModal(false);
          }}
          tagOptions={tagOptions}
          userOptions={userOptions}
          create={!modalTask}
          task={modalTask}
        />
      )}
    </div>
  );
};

export default Tasks;
