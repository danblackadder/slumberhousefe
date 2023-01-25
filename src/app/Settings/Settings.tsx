import Header from 'components/Header';
import { Tab, TabsContainer } from 'components/Tabs';
import { TabSettingsOptions } from 'models/settings.types';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { capitalize } from 'utility/helper';
import GroupSettings from './GroupSettings';
import OrganizationSettings from './OrganizationSettings';
import UserSettings from './UserSettings';

const Settings = () => {
  const [searchParams] = useSearchParams();
  const [active, setActive] = useState<TabSettingsOptions>(
    (searchParams.get('option') as TabSettingsOptions) || TabSettingsOptions.USERS
  );

  console.log(searchParams.get('option'));

  return (
    <div className="container">
      <Header text="Settings" />
      <TabsContainer>
        <Tab
          text={capitalize(TabSettingsOptions.USERS)}
          active={active === TabSettingsOptions.USERS}
          onClick={() => setActive(TabSettingsOptions.USERS)}
        />
        <Tab
          text={capitalize(TabSettingsOptions.ORGANIZATION)}
          active={active === TabSettingsOptions.ORGANIZATION}
          onClick={() => setActive(TabSettingsOptions.ORGANIZATION)}
        />
        <Tab
          text={capitalize(TabSettingsOptions.GROUPS)}
          active={active === TabSettingsOptions.GROUPS}
          onClick={() => setActive(TabSettingsOptions.GROUPS)}
        />
      </TabsContainer>
      <div className="padding-top-32 flex-column">
        {active === TabSettingsOptions.USERS && <UserSettings />}
        {active === TabSettingsOptions.ORGANIZATION && <OrganizationSettings />}
        {active === TabSettingsOptions.GROUPS && <GroupSettings />}
      </div>
    </div>
  );
};

export default Settings;
