import Header from 'components/Header';
import { Tab, TabsContainer } from 'components/Tabs';
import { TabSettingsOptions } from 'models/settings.types';
import React, { useState } from 'react';
import GroupSettings from './GroupSettings';
import OrganizationSettings from './OrganizationSettings';
import UserSettings from './UserSettings';

const Settings = () => {
  const [active, setActive] = useState<TabSettingsOptions>(TabSettingsOptions.ORGANIZATION);
  console.log(active);
  return (
    <div className="container">
      <Header text="Settings" />
      <TabsContainer>
        <Tab
          text="Organization"
          active={active === TabSettingsOptions.ORGANIZATION}
          onClick={() => setActive(TabSettingsOptions.ORGANIZATION)}
        />
        <Tab
          text="Users"
          active={active === TabSettingsOptions.USERS}
          onClick={() => setActive(TabSettingsOptions.USERS)}
        />
        <Tab
          text="Group"
          active={active === TabSettingsOptions.GROUPS}
          onClick={() => setActive(TabSettingsOptions.GROUPS)}
        />
      </TabsContainer>
      <div className="padding-top-32 flex-column">
        {active === TabSettingsOptions.ORGANIZATION && <OrganizationSettings />}
        {active === TabSettingsOptions.USERS && <UserSettings />}
        {active === TabSettingsOptions.GROUPS && <GroupSettings />}
      </div>
    </div>
  );
};

export default Settings;
