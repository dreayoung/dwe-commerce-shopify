'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  const htf = path.includes('htf');

  return (
    <body
      className={clsx('bg-[#0a0a0a] capitalize text-neutral-100', {
        'bg-[#686732] text-neutral-900': htf
      })}
    >
      {children}
    </body>
  );
};

export default MainLayout;
