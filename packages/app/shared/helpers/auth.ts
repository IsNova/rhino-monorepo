import { User } from "@game-portal/types";

const users: User[] = [
  {
    id: "1",
    username: "user1",
    password: "password1",
    name: "Israel Amare",
    email: "israel@test.com",
  },
  {
    id: "2",
    username: "user2",
    password: "password2",
    name: "Darshinee Test",
    email: "darshinee@example.com",
  },
];

export const authenticateUser = (
  username: string,
  password: string
): User | null => {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) return null;

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
};

export const getUserById = (id: string): User | null => {
  const user = users.find((u) => u.id === id);
  if (!user) return null;

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
};
