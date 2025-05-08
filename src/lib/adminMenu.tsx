// lib/adminMenu.ts
import { FaUser, FaUserMd, FaUsers, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';

export const adminMenuItems = [
  {
    label: 'Profile',
    href: '/dashboard/profile',
    icon: <FaUser size={18} />,
  },
  {
    label: 'Doctors',
    href: '/dashboard/doctors',
    icon: <FaUserMd size={18} />,
  },
  {
    label: 'Staff',
    href: '/dashboard/staff',
    icon: <FaUsers size={18} />,
  },
  {
    label: 'Appointments',
    href: '/dashboard/appointments',
    icon: <FaCalendarAlt size={18} />,
  },
  {
    label: 'Logout',
    href: '/logout',
    icon: <FaSignOutAlt size={18} />,
  },
];