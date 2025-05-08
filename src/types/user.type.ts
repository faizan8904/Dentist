import { Appointment } from "./appointment.type";
import { Doctor } from "./doctor.type";

export type User = {
  id: string;
  name: string;
  fatherName?: string | null;
  email: string;
  password: string;
  securityCode : string;
  phone: string;
  age?: number | null;
  img: string;
  address?: string | null;
  role: Role;
  doctor?: Doctor | null;
  appointments?: Appointment[];
};

enum Role {
    ADMIN,
    DOCTOR,
    STAFF
}


// For user creation (excludes auto-generated fields)
export type CreateUser = Omit<User, 
  "id" | "doctor" | "appointments" | "createdAt" | "updatedAt"
> & {
  password?: string; // Only for registration
};

// Simplified view
export type SimpleUser = Pick<
  User, 
  "id" | "name" | "email" | "phone" | "img" | "role"
>;