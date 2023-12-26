export enum UserRole {
  USER = 'U', ADMIN = 'A'
}

export interface User {
  email: string;
  role: 'U' | 'A';
  id: number;
}

export interface Login {
  email: string;
  password: string;
}

export interface LoggedInUser {
  accessToken: string;
  user: User;
}
