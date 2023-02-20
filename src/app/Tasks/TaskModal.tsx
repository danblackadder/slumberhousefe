import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';

import Button from 'components/Button';
import DatePicker from 'components/DatePicker';
import { TextArea, TextInput } from 'components/Forms';
import Modal from 'components/Modal';
import Multiselect from 'components/Multiselect';
import Select from 'components/Select';
import { useGroup } from 'hooks/group.hook';
import { IOption } from 'models/generic.types';
import { ITask, TaskPriority, TaskPriorityOptions, TaskStatus, TaskStatusOptions } from 'models/task.types';
import { postGroupTask, putGroupTask } from 'network/tasks.network';
import { capitalize } from 'utility/helper';

const TaskModal = ({
  tagOptions,
  userOptions,
  onClose,
  task,
  create,
}: {
  tagOptions: IOption<string>[];
  userOptions: IOption<string>[];
  onClose: () => void;
  task?: ITask;
  create?: boolean;
}) => {
  const { groupId } = useGroup();

  const [title, setTitle] = useState<string>(task?.title ? task.title : '');
  const [initialTitle, setInitialTitle] = useState<string>(task?.title ? task.title : '');
  const [titleInputActive, setTitleInputActive] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(task?.description ? task.description : '');
  const [initialDescription, setInitialDescription] = useState<string>(task?.description ? task.description : '');
  const [descriptionInputActive, setDescriptionInputActive] = useState<boolean>(false);
  const [status, setStatus] = useState<IOption<TaskStatus> | undefined>(
    task?.status
      ? TaskStatusOptions.find((option) => option.value === task.status)
      : TaskStatusOptions.find((option) => option.value === TaskStatus.BACKLOG)
  );
  const [priority, setPriority] = useState<IOption<TaskPriority> | undefined>(
    task?.priority
      ? TaskPriorityOptions.find((option) => option.value === task.priority)
      : TaskPriorityOptions.find((option) => option.value === TaskPriority.LOW)
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(task?.due ? parseISO(task.due) : undefined);
  const [tags, setTags] = useState<IOption<string>[]>(
    task?.tags
      ? task.tags.map((tag) => {
          return { value: tag, label: capitalize(tag) };
        })
      : []
  );
  const [users, setUsers] = useState<IOption<string>[]>(
    task?.users
      ? task.users.map((user) => {
          return {
            value: user._id.toString(),
            label: `${capitalize(user.firstName)} ${capitalize(user.lastName)} - ${user.email}`,
          };
        })
      : []
  );

  useEffect(() => {
    if (!titleInputActive && task?.title && title !== task.title) {
      setTitle(task.title);
      setInitialTitle(task.title);
    }

    if (!descriptionInputActive && task?.description && description !== task.description) {
      setDescription(task.description || '');
      setInitialDescription(task.description || '');
    }
  }, [titleInputActive, descriptionInputActive, task, title, description]);

  const handlePostTask = useCallback(() => {
    if (groupId) {
      postGroupTask({
        groupId,
        title,
        description,
        status: status?.value || TaskStatus.BACKLOG,
        priority: priority?.value,
        due: selectedDate,
        tags: tags.map((tag) => tag.value),
        users: users.map((user) => user.value),
      })
        .then(() => {
          onClose();
          toast.success('Task successfully added');
        })
        .catch((err) => {
          console.log(err);
          toast.error('Something went wrong...');
        });
    }
  }, [groupId, title, description, status, priority, selectedDate, tags, users, onClose]);

  const handleTaskUpdate = useCallback(() => {
    if (!create && task) {
      setTitleInputActive(false);
      setDescriptionInputActive(false);
      putGroupTask({
        groupId,
        taskId: task._id,
        title,
        description,
        status: status?.value || TaskStatus.BACKLOG,
        priority: priority?.value,
        due: selectedDate,
        tags: tags.map((tag) => tag.value),
        users: users.map((user) => user.value),
      })
        .then(() => {
          setTitleInputActive(false);
          toast.success('Task successfully updated');
        })
        .catch((err) => {
          console.log(err);
          toast.error('Something went wrong...');
        });
    }
  }, [groupId, task, title, description, status, priority, selectedDate, tags, users]);

  useEffect(() => {
    if (
      !create &&
      (status?.value !== task?.status ||
        priority?.value !== task?.priority ||
        (task?.due &&
          selectedDate &&
          format(selectedDate, 'dd-MM-yyyy') !== format(parseISO(task.due), 'dd-MM-yyyy')) ||
        JSON.stringify(tags.map((tag) => tag.value)) !== JSON.stringify(task?.tags) ||
        JSON.stringify(users.map((user) => user.value)) !== JSON.stringify(task?.users?.map((user) => user._id)))
    ) {
      handleTaskUpdate();
    }
  }, [create, status, priority, selectedDate, tags, users]);

  return (
    <Modal onClose={onClose} width={700}>
      <div className="flex-column flex-1">
        <TextInput
          id="title"
          label="Title"
          value={title}
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setTitle(event.currentTarget.value);
          }}
          onClick={() => !create && setTitleInputActive(true)}
        />
        {task && titleInputActive && (
          <div className="flex-row align-flex-start justify-flex-end">
            {task.title && initialTitle !== task.title && (
              <div className="neutral-dark font-12 margin-right-16">{`Title recently changed by ${capitalize(
                task.updatedBy.firstName
              )} ${capitalize(task.updatedBy.lastName)} to ${task.title}`}</div>
            )}
            <div className="flex-row align-center">
              <Button
                variation="inline"
                width={initialTitle !== task.title ? 150 : 60}
                text={initialTitle !== task.title ? 'Cancel and keep' : 'Cancel'}
                onClick={() => setTitleInputActive(false)}
              />
              <Button
                variation="inline"
                width={initialTitle !== task.title ? 150 : 60}
                text={initialTitle !== task.title ? 'Save and overwrite' : 'Save'}
                onClick={() => handleTaskUpdate()}
              />
            </div>
          </div>
        )}
        <TextArea
          id="description"
          label="Description"
          value={description}
          onChange={(event: React.FormEvent<HTMLTextAreaElement>) => {
            setDescription(event.currentTarget.value);
          }}
          onClick={() => !create && setDescriptionInputActive(true)}
        />
        {task && descriptionInputActive && (
          <div className="flex-row align-flex-start justify-flex-end">
            {initialDescription !== task.description && (
              <div className="neutral-dark font-12 margin-right-16">{`Description recently changed by ${capitalize(
                task.updatedBy.firstName
              )} ${capitalize(task.updatedBy.lastName)} to ${task.description}`}</div>
            )}
            <div className="flex-row align-center">
              <Button
                variation="inline"
                width={initialDescription !== task.description ? 150 : 60}
                text={initialDescription !== task.description ? 'Cancel and keep' : 'Cancel'}
                onClick={() => setDescriptionInputActive(false)}
              />
              <Button
                variation="inline"
                width={initialDescription !== task.description ? 150 : 60}
                text={initialDescription !== task.description ? 'Save and overwrite' : 'Save'}
                onClick={() => handleTaskUpdate()}
              />
            </div>
          </div>
        )}
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
        <Multiselect id="users" label="Users" selectedItems={users} setSelectedItems={setUsers} options={userOptions} />
        {task && (
          <div className="flex-row justify-flex-end">
            {task.updatedAt === task.createdAt ? (
              <div className="neutral-dark font-12">{`Created by ${capitalize(task.createdBy.firstName)} ${capitalize(
                task.createdBy.lastName
              )} on ${format(parseISO(task.createdAt), 'dd-MM-yyyy')}`}</div>
            ) : (
              <div className="neutral-dark font-12">{`Updated by ${capitalize(task.updatedBy.firstName)} ${capitalize(
                task.updatedBy.lastName
              )} on ${format(parseISO(task.updatedAt), 'dd-MM-yyyy')}`}</div>
            )}
          </div>
        )}
        {create && (
          <div className="flex-row full-width align-center justify-space-between margin-top-16">
            <Button text="Cancel" width={160} onClick={onClose} />
            <Button text="Create task" width={160} onClick={() => handlePostTask()} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TaskModal;
