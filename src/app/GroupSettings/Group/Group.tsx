import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import { FileUpload, TextArea, TextInput } from 'components/Forms';
import { useGroup } from 'hooks/group.hook';
import useWidgets from 'hooks/widgets.hook';
import { IGroupErrors } from 'models/group.types';
import { putGroup } from 'network/group.network';
import { capitalize, getGroupName } from 'utility/helper';

const GroupSettings = () => {
  const { groupId, group, updateGroup } = useGroup();
  const { widgets } = useWidgets();

  const [name, setName] = useState<string>(getGroupName({ name: group?.name }) || '');
  const [description, setDescription] = useState<string>(group?.description || '');
  const [image, setImage] = useState<File[]>();
  const [widgetIds, setWidgetIds] = useState<string[]>(group?.widgets ? group.widgets.map((widget) => widget._id) : []);
  const [errors, setErrors] = useState<IGroupErrors>();

  const handlePutGroup = useCallback(() => {
    if (groupId) {
      putGroup({ id: groupId, name, description, image, widgets: widgetIds })
        .then(() => {
          updateGroup();
          toast.success('Group has been successfully updated.');
        })
        .catch((err) => {
          setErrors(err.errors);
          toast.error('Something went wrong...');
        });
    }
  }, [group, name, description, image, widgetIds]);

  const handleWidgetId = (id: string) => {
    if (widgetIds.includes(id)) {
      const ids = widgetIds.filter((widgetId) => id !== widgetId);
      setWidgetIds(ids);
    } else {
      setWidgetIds([...widgetIds, id]);
    }
  };

  return (
    <div className="flex-column">
      <div className="flex-row full-width align-center justify-flex-end margin-vertical-16">
        <Button text={'Update group'} width={160} onClick={() => handlePutGroup()} />
      </div>
      <div className="flex-row">
        <div className="flex-column width-500">
          <FileUpload label="Image" image={group?.image} onChange={(file) => setImage(file)} />
          <TextInput
            id="company"
            label="Company Name"
            value={name}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setName(event.currentTarget.value);
            }}
            errors={errors?.name}
          />
          <TextArea
            id="description"
            label="Description"
            value={description}
            onChange={(event: React.FormEvent<HTMLTextAreaElement>) => {
              setDescription(event.currentTarget.value);
            }}
          />
        </div>
        <div className="flex-column flex-1 padding-left-16">
          <div className="padding-bottom-16">Widgets</div>
          {widgets.map((widget) => (
            <div key={widget._id} className="flex-row align-center justify-space-between width-200">
              <div className="margin-right-8">{capitalize(widget.widget)}</div>
              <Checkbox checked={widgetIds.includes(widget._id)} setChecked={() => handleWidgetId(widget._id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupSettings;
