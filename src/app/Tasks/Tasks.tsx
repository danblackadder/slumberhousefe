import React, { useContext, useEffect, useState } from 'react';
import { MdFilterAlt, MdViewAgenda, MdViewColumn, MdViewModule } from 'react-icons/md';

import Button from 'components/Button';
import Header from 'components/Header';
import { useGroup } from 'network/group.network';
import { useGroupTasks } from 'network/tasks.network';

import TaskModal from './TaskModal';
import TaskTable from './TaskTable';
import { GroupBy, ViewMode } from 'models/task.types';

const Tasks = () => {
  const { groupId } = useGroup();

  const [pauseStream] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.ROW);
  const [groupBy, setGroupBy] = useState<GroupBy>(GroupBy.STATUS);

  const { tasks, error, loading } = useGroupTasks({ groupId, pauseStream });

  return (
    <div className="container">
      <Header text="Tasks" />
      <div className="flex-column">
        <div className="flex-row justify-space-between align-center">
          <div className="flex-column flex-1">
            <div className="flex-row align-center justify-flex-start margin-bottom-8">
              <div className="margin-right-4 width-100">View mode</div>
              <div
                className={`flex center-items padding-4 width-40 margin-right-4 pointer border-primary ${
                  viewMode === ViewMode.ROW
                    ? 'background-primary white'
                    : 'background-white primary hover-background-primary hover-white'
                }`}
                onClick={() => setViewMode(ViewMode.ROW)}
              >
                <MdViewAgenda size={16} />
              </div>
              <div
                className={`flex center-items padding-4 width-40 pointer border-primary ${
                  viewMode === ViewMode.COLUMN
                    ? 'background-primary white'
                    : 'background-white primary hover-background-primary hover-white'
                }`}
                onClick={() => setViewMode(ViewMode.COLUMN)}
              >
                <MdViewColumn size={16} />
              </div>
            </div>
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
          </div>
          <Button text="Add new task" width={200} onClick={() => setModal(true)} />
        </div>
        <div className="flex-row align-center justify-space-between margin-bottom-16"></div>
        <TaskTable tasks={tasks} error={error} loading={loading} viewMode={viewMode} groupBy={groupBy} />
      </div>
      {modal && <TaskModal groupId={groupId} onClose={() => setModal(false)} />}
    </div>
  );
};

export default Tasks;
