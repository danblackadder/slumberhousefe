import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import { FileUpload, TextArea, TextInput } from 'components/Forms';
import Modal from 'components/Modal';
import { IGroupErrors } from 'models/group.types';
import { IGroupSetting } from 'models/settings.types';
import { postSettingsGroups, putSettingsGroups } from 'network/settings.network';
import { getGroupName } from 'utility/helper';
import { postGroupTask } from 'network/tasks.network';
import Select from 'components/Select';
import { TaskPriority, TaskPriorityOptions, TaskStatus, TaskStatusOptions } from 'models/task.types';
import DatePicker from 'components/DatePicker';
import Multiselect from 'components/Multiselect';

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
  const [status, setStatus] = useState<TaskStatus | undefined>(TaskStatus.DRAFT);
  const [priority, setPriority] = useState<TaskPriority | undefined>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [tags, setTags] = useState<string[]>([]);

  const handlePostTask = useCallback(() => {
    if (groupId) {
      postGroupTask({ groupId, title })
        .then(() => {
          onClose();
          toast.success('Task successfully added');
        })
        .catch((err) => {
          console.log(err);
          toast.error('Something went wrong...');
        });
    }
  }, [groupId, title]);

  const handlePutTask = useCallback(() => {}, []);

  return (
    <Modal onClose={onClose} width={800}>
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
          <Multiselect
            id="tags"
            label="Tags"
            selectedItems={tags}
            setSelectedItems={setTags}
            options={['tag1', 'tag2']}
            creation={true}
          />
        </div>
        <div className="flex-column width-200">
          <Select
            id="status"
            label="Status"
            selectedItem={status}
            setSelectedItem={setStatus}
            options={TaskStatusOptions}
            required={true}
          />
          <Select
            id="priority"
            label="Priority"
            selectedItem={priority}
            setSelectedItem={setPriority}
            options={TaskPriorityOptions}
          />
          <DatePicker
            id="date"
            label="Due date"
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            placeholder="Select date..."
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
