import React, { useContext, useEffect, useState } from 'react';
import { MdFilterAlt } from 'react-icons/md';

import Button from 'components/Button';
import Header from 'components/Header';
import { useGroupTasks } from 'network/tasks.network';

import TaskModal from './TaskModal';
import TaskTable from './TaskTable';
import { useGroup } from 'network/group.network';

const Tasks = () => {
  const { groupId } = useGroup();

  const [loading, setLoading] = useState<boolean>(true);
  const [pauseStream] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const { tasks, error } = useGroupTasks({ groupId, pauseStream });

  useEffect(() => {
    setLoading(true);
    if (tasks) {
      setLoading(false);
    }
  }, [tasks]);

  return (
    <div className="container">
      <Header text="Tasks" />
      <div className="flex-column">
        <div className="flex-row justify-space-between align-center">
          <div className="flex-row align-center primary">
            <MdFilterAlt size={24} />
            <div className="font-24 margin-left-8">Filters</div>
          </div>
          <Button text="Add new task" width={200} onClick={() => setModal(true)} />
        </div>
        <div className="flex-row align-center justify-flex-end margin-bottom-16"></div>
        <TaskTable tasks={tasks} error={error} loading={loading} />
      </div>
      {modal && <TaskModal groupId={groupId} onClose={() => setModal(false)} />}
    </div>
  );
};

export default Tasks;
