import { Doctor } from "./doctor.type";
import { Appointment } from "./appointment.type";

export type Service = {
  id: string;
  name: string;
  description?: string | null;
  img: string;
  duration: number; // in minutes
  price: number;
  doctorId: number;
  doctor?: Doctor; // Optional relation
  appointments?: Appointment[]; // Optional relation
};

// Simplified version for forms/listing
export type BasicService = Pick<
  Service, 
  "id" | "name" | "duration" | "price" | "img"
>;

// For service creation (omits id and relations)
export type CreateService = Omit<
  Service, 
  "id" | "doctor" | "appointments"
>;