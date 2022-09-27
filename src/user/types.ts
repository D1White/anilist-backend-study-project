export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: UserRoles;
}

export enum UserRoles {
  user = 'user',
  admin = 'admin',
}
