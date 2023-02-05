import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Header from 'components/Header';
import { Tab, TabsContainer } from 'components/Tabs';
import { TabSettings } from 'models/settings.types';
import { capitalize } from 'utility/helper';

import GroupSettings from './GroupSettings';
import OrganizationSettings from './OrganizationSettings';
import UserSettings from './UserSettings';

const Settings = () => {
  const [searchParams] = useSearchParams();
  const [active, setActive] = useState<TabSettings>((searchParams.get('option') as TabSettings) || TabSettings.USERS);

  return (
    <div className="container">
      <Header text="Settings" />
      <TabsContainer>
        <Tab
          text={capitalize(TabSettings.USERS)}
          active={active === TabSettings.USERS}
          onClick={() => setActive(TabSettings.USERS)}
        />
        <Tab
          text={capitalize(TabSettings.ORGANIZATION)}
          active={active === TabSettings.ORGANIZATION}
          onClick={() => setActive(TabSettings.ORGANIZATION)}
        />
        <Tab
          text={capitalize(TabSettings.GROUPS)}
          active={active === TabSettings.GROUPS}
          onClick={() => setActive(TabSettings.GROUPS)}
        />
      </TabsContainer>
      <div className="padding-top-16 flex-column">
        {active === TabSettings.USERS && <UserSettings />}
        {active === TabSettings.ORGANIZATION && <OrganizationSettings />}
        {active === TabSettings.GROUPS && <GroupSettings />}
      </div>
    </div>
  );
};

export default Settings;
