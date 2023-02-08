import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import DatePicker from 'components/DatePicker';
import { TextArea, TextInput } from 'components/Forms';
import Modal from 'components/Modal';
import Multiselect from 'components/Multiselect';
import Select from 'components/Select';
import { IOption } from 'models/generic.types';
import { TaskPriority, TaskPriorityOptions, TaskStatus, TaskStatusOptions } from 'models/task.types';
import { getTaskTags, getTaskUsers, postGroupTask } from 'network/tasks.network';
import { capitalize } from 'utility/helper';

const TaskModal = ({
  groupId,
  onClose,
  edit,
}: {
  groupId: string | undefined;
  onClose: () => void;
  edit?: boolean;
}) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<IOption<TaskStatus> | undefined>(
    TaskStatusOptions.find((option) => option.value === TaskStatus.BACKLOG)
  );
  const [priority, setPriority] = useState<IOption<TaskPriority> | undefined>(
    TaskPriorityOptions.find((option) => option.value === TaskPriority.LOW)
  );
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [tags, setTags] = useState<IOption<string>[]>([]);
  const [tagOptions, setTagOptions] = useState<IOption<string>[]>([]);
  const [users, setUsers] = useState<IOption<string>[]>([]);
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

  const handlePutTask = useCallback(() => {
    console.log('test');
    console.log('test2');
  }, []);

  return (
    <Modal onClose={onClose} width={700}>
      <div className="flex-row flex-gap full-width">
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
        </div>
      </div>
      <div className="flex-row full-width align-center justify-space-between margin-top-16">
        <Button text="Cancel" width={160} onClick={onClose} />
        <Button
          text={edit ? 'Update task' : 'Create task'}
          width={160}
          onClick={() => (edit ? handlePutTask() : handlePostTask())}
        />
      </div>
    </Modal>
  );
};

export default TaskModal;
