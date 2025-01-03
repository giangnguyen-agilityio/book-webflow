const enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  image: string;
  role: string;
  createdAt: string;
}

export type { User, UserRole };
