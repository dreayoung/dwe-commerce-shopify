'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  const htf = path.includes('herotofew');

  return (
    <body
      className={clsx('bg-black tracking-widest text-neutral-400', {
        'bg-htf_bg text-neutral-900': htf
      })}
    >
      {children}
    </body>
  );
};

export default MainLayout;
