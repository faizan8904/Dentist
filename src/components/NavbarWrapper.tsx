
'use client';

import { usePathname } from 'next/navigation';
import NavbarHome from './NavbarHome';

export default function NavbarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith('/dashboard');

  return (
    <>
      {!isDashboardRoute && <NavbarHome />}
      {children}
    </>
  );
}