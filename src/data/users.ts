import { UserRole } from "@/features/auth/authSlice";

export type StaticUser = {
  username: string;
  password: string;
  role: UserRole;
};

export const USERS: StaticUser[] = [
  {
    username: "admin",
    password: "123456",
    role: "ADMIN",
  },
  {
    username: "subadmin1",
    password: "123456",
    role: "ADMIN",
  },
  {
    username: "subadmin2",
    password: "123456",
    role: "ADMIN",
  },
  {
    username: "user1",
    password: "123456",
    role: "USER",
  },
];
