import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Header from 'components/Header';
import { Tab, TabsContainer } from 'components/Tabs';
import { OrganizationTabSettings } from 'models/settings.types';
import { capitalize } from 'utility/helper';

import GroupSettings from './GroupSettings';
import OrganizationSettings from './OrganizationSettings';
import UserSettings from './UserSettings';

const Settings = () => {
  const [searchParams] = useSearchParams();
  const [active, setActive] = useState<OrganizationTabSettings>(
    (searchParams.get('option') as OrganizationTabSettings) || OrganizationTabSettings.USERS
  );

  return (
    <div className="container">
      <Header text="Organization Settings" />
      <TabsContainer>
        <Tab
          text={capitalize(OrganizationTabSettings.USERS)}
          active={active === OrganizationTabSettings.USERS}
          onClick={() => setActive(OrganizationTabSettings.USERS)}
        />
        <Tab
          text={capitalize(OrganizationTabSettings.ORGANIZATION)}
          active={active === OrganizationTabSettings.ORGANIZATION}
          onClick={() => setActive(OrganizationTabSettings.ORGANIZATION)}
        />
        <Tab
          text={capitalize(OrganizationTabSettings.GROUPS)}
          active={active === OrganizationTabSettings.GROUPS}
          onClick={() => setActive(OrganizationTabSettings.GROUPS)}
        />
      </TabsContainer>
      <div className="padding-top-16 flex-column">
        {active === OrganizationTabSettings.USERS && <UserSettings />}
        {active === OrganizationTabSettings.ORGANIZATION && <OrganizationSettings />}
        {active === OrganizationTabSettings.GROUPS && <GroupSettings />}
      </div>
    </div>
  );
};

export default Settings;
