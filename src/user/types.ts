export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: UserRoles;
}

export type UserRoles = 'user' | 'admin';
