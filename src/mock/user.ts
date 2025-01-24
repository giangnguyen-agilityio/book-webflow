export const MOCK_USER = {
  id: '1',
  username: 'TestUser',
  name: 'Test User',
  password: 'password123!',
  email: 'test@example.com',
  image: 'avatar.jpg',
  role: 'USER',
  createdAt: '2024-01-01T00:00:00.000Z',
};

export const getMockUserWithoutPassword = () => {
  const { password: _, ...userWithoutPassword } = MOCK_USER;

  return userWithoutPassword;
};

export const getMockSignUpData = () => {
  const { username, password, email, name } = MOCK_USER;

  return { username, password, email, name };
};
