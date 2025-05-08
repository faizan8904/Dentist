
'use client';

import { usePathname } from 'next/navigation';

export default function SpaceDivWrapper() {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith('/dashboard');

  return (
    <>
      {!isDashboardRoute && <div className='mt-18'></div>}
    </>
  );
}