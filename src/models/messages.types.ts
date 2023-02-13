export interface IMessageUser {
  _id: string;
  firstName: string;
  lastName: string;
  image: string;
}

export interface IMessage {
  _id: string;
  message: string;
  user: IMessageUser;
}
