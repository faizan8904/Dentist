import { User } from "./user.type";
import { Doctor } from "./doctor.type";
import { Service } from "./service.type"; // Create this similarly


export type Appointment = {
  id: string;
  patientId: number;
  serviceId: number;
  doctorId: number;
  date: Date;
  status: AppointmentStatus;
  notes?: string | null;
  patient?: User;        // Optional relation
  service?: Service;     // Optional relation 
  doctor?: Doctor;       // Optional relation
};

enum AppointmentStatus {
    PENDING,
    CONFIRMED,
    CANCELLED,
    COMPLETED
  }

// Simplified version for listing
export type SlimAppointment = Pick<
  Appointment, 
  "id" | "date" | "status" | "doctorId" | "patientId"
>;