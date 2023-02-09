import React, { useState, useCallback } from 'react';

import { ITask, TaskPriority, TaskPriorityOptions, TaskStatus, TaskStatusOptions } from 'models/task.types';
import { capitalize } from 'utility/helper';
import { format, parseISO } from 'date-fns';
import { TextArea, TextInput } from 'components/Forms';
import Select from 'components/Select';
import DatePicker from 'components/DatePicker';
import Multiselect from 'components/Multiselect';
import { IOption } from 'models/generic.types';
import { MdClose } from 'react-icons/md';

const TaskItem = ({
  task,
  tagOptions,
  userOptions,
}: {
  task: ITask;
  tagOptions: IOption<string>[];
  userOptions: IOption<string>[];
}) => {
  const [active, setActive] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description || '');
  const [status, setStatus] = useState<IOption<TaskStatus> | undefined>(
    TaskStatusOptions.find((option) => option.value === task.status)
  );
  const [priority, setPriority] = useState<IOption<TaskPriority> | undefined>(
    TaskPriorityOptions.find((option) => option.value === task.priority)
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(task.due ? parseISO(task.due) : undefined);
  const [tags, setTags] = useState<IOption<string>[]>(
    task.tags
      ? task.tags.map((tag) => {
          return { value: tag, label: capitalize(tag) };
        })
      : []
  );
  const [users, setUsers] = useState<IOption<string>[]>(
    task.users
      ? task.users.map((user) => {
          return {
            value: user._id.toString(),
            label: `${capitalize(user.firstName)} ${capitalize(user.lastName)} - ${user.email}`,
          };
        })
      : []
  );

  const renderItem = useCallback(() => {
    if (active) {
      return (
        <div className="relative flex-row flex-gap full-width padding-16">
          <div className="absolute top-0 right-0 padding-8 pointer" onClick={() => setActive(false)}>
            <MdClose size={24} />
          </div>
          <div className="flex-column flex-1">
            <TextInput
              id="title"
              label="Title"
              value={title}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setTitle(event.currentTarget.value);
              }}
            />
            <TextArea
              id="description"
              label="Description"
              value={description}
              onChange={(event: React.FormEvent<HTMLTextAreaElement>) => {
                setDescription(event.currentTarget.value);
              }}
            />
            <div className="flex-row align-center justify-space-between">
              <div className="flex-1 margin-right-8">
                <Select
                  id="status"
                  label="Status"
                  selectedItem={status}
                  setSelectedItem={setStatus}
                  options={TaskStatusOptions}
                  required={true}
                />
              </div>
              <div className="flex-1">
                <Select
                  id="priority"
                  label="Priority"
                  selectedItem={priority}
                  setSelectedItem={setPriority}
                  options={TaskPriorityOptions}
                  required={true}
                />
              </div>
              <div className="flex-1 margin-left-8">
                <DatePicker
                  id="date"
                  label="Due date"
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  placeholder="Select date..."
                />
              </div>
            </div>
            <Multiselect
              id="tags"
              label="Tags"
              selectedItems={tags}
              setSelectedItems={setTags}
              options={tagOptions}
              creatable={true}
            />
            <Multiselect
              id="users"
              label="Users"
              selectedItems={users}
              setSelectedItems={setUsers}
              options={userOptions}
            />
            <div className="flex-row justify-flex-end">
              {task.createdBy._id === task.updatedBy._id ? (
                <div className="neutral-dark font-12">{`Created by ${capitalize(task.createdBy.firstName)} ${capitalize(
                  task.createdBy.lastName
                )}`}</div>
              ) : (
                <div className="neutral-dark font-12">{`Updated by ${capitalize(task.updatedBy.firstName)} ${capitalize(
                  task.updatedBy.lastName
                )}`}</div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="flex-column flex-1 margin-left-8">
          <div className="flex-1">{task.title}</div>
          <div className="margin-horizontal-4 flex-row align-center">
            {task?.users?.map(() => (
              <div className="border-circle-white background-neutral height-32 width-32" style={{ marginLeft: -8 }} />
            ))}
          </div>
        </div>
        <div className="flex-column width-140">
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
        </div>
      </>
    );
  }, [task, title, description, status, priority, selectedDate, tags, tagOptions, users, userOptions, active]);

  return (
    <div
      className={`relative flex-row padding-8 ${
        active ? 'border-primary z-index' : 'hover-z-index border-neutral hover-border-primary pointer'
      }`}
      style={{ margin: '0 -2px -2px -2px' }}
      onClick={() => !active && setActive(true)}
    >
      {renderItem()}
    </div>
  );
};

export default TaskItem;
