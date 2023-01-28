export var TabSettingsOptions;
(function (TabSettingsOptions) {
  TabSettingsOptions['ORGANIZATION'] = 'organization';
  TabSettingsOptions['USERS'] = 'users';
  TabSettingsOptions['GROUPS'] = 'groups';
})(TabSettingsOptions || (TabSettingsOptions = {}));
export var UserStatus;
(function (UserStatus) {
  UserStatus['INVITED'] = 'invited';
  UserStatus['ACTIVE'] = 'active';
  UserStatus['INACTIVE'] = 'inactive';
})(UserStatus || (UserStatus = {}));
export var OrganizationRole;
(function (OrganizationRole) {
  OrganizationRole['OWNER'] = 'owner';
  OrganizationRole['ADMIN'] = 'admin';
  OrganizationRole['BASIC'] = 'basic';
})(OrganizationRole || (OrganizationRole = {}));
export var GroupRole;
(function (GroupRole) {
  GroupRole['ADMIN'] = 'admin';
  GroupRole['BASIC'] = 'basic';
  GroupRole['EXTERNAL'] = 'external';
})(GroupRole || (GroupRole = {}));
