export const enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  image: string;
  role: UserRole;
  createdAt: string;
}
