import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from 'components/Header';
import { Tab, TabsContainer } from 'components/Tabs';
import { TabSettingsOptions } from 'models/settings.types';
import { capitalize } from 'utility/helper';
import GroupSettings from './GroupSettings';
import OrganizationSettings from './OrganizationSettings';
import UserSettings from './UserSettings';
const Settings = () => {
  const [searchParams] = useSearchParams();
  const [active, setActive] = useState(searchParams.get('option') || TabSettingsOptions.USERS);
  return React.createElement(
    'div',
    { className: 'container' },
    React.createElement(Header, { text: 'Settings' }),
    React.createElement(
      TabsContainer,
      null,
      React.createElement(Tab, {
        text: capitalize(TabSettingsOptions.USERS),
        active: active === TabSettingsOptions.USERS,
        onClick: () => setActive(TabSettingsOptions.USERS),
      }),
      React.createElement(Tab, {
        text: capitalize(TabSettingsOptions.ORGANIZATION),
        active: active === TabSettingsOptions.ORGANIZATION,
        onClick: () => setActive(TabSettingsOptions.ORGANIZATION),
      }),
      React.createElement(Tab, {
        text: capitalize(TabSettingsOptions.GROUPS),
        active: active === TabSettingsOptions.GROUPS,
        onClick: () => setActive(TabSettingsOptions.GROUPS),
      })
    ),
    React.createElement(
      'div',
      { className: 'padding-top-32 flex-column' },
      active === TabSettingsOptions.USERS && React.createElement(UserSettings, null),
      active === TabSettingsOptions.ORGANIZATION && React.createElement(OrganizationSettings, null),
      active === TabSettingsOptions.GROUPS && React.createElement(GroupSettings, null)
    )
  );
};
export default Settings;
