export interface ILogin {
  token: string;
}

export interface IRegistrationErrors {
  firstName: string[];
  lastName: string[];
  email: string[];
  organization: string[];
  password: string[];
  passwordConfirmation: string[];
}
