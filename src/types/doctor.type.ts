import { User } from "./user.type";

export type Doctor = {
  id: string;
  userId: number;
  bio?: string | null;
  user?: User;  // Optional relation
};