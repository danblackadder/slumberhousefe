import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Header from 'components/Header';
import { Tab, TabsContainer } from 'components/Tabs';
import { GroupTabSettings } from 'models/settings.types';
import { capitalize } from 'utility/helper';

import { Group } from './Group';
import { Users } from './Users';

const Settings = () => {
  const [searchParams] = useSearchParams();
  const [active, setActive] = useState<GroupTabSettings>(
    (searchParams.get('option') as GroupTabSettings) || GroupTabSettings.GROUP
  );

  return (
    <div className="container">
      <Header text="Group Settings" />
      <TabsContainer>
        <Tab
          text={capitalize(GroupTabSettings.GROUP)}
          active={active === GroupTabSettings.GROUP}
          onClick={() => setActive(GroupTabSettings.GROUP)}
        />
        <Tab
          text={capitalize(GroupTabSettings.USERS)}
          active={active === GroupTabSettings.USERS}
          onClick={() => setActive(GroupTabSettings.USERS)}
        />
      </TabsContainer>
      <div className="padding-top-16 flex-column">
        {active === GroupTabSettings.USERS && <Users />}
        {active === GroupTabSettings.GROUP && <Group />}
      </div>
    </div>
  );
};

export default Settings;
