'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navLinks = [
  { title: 'core', path: '/core' },
  { title: 'collectibles', path: '/collectibles' },
  { title: 'connect', path: '/connect' }
];

const NavMenuItem = ({ item }: { item: any }) => {
  const pathname = usePathname();
  const htf = pathname.includes('herotofew');
  const [active, setActive] = useState(pathname === item.path);

  useEffect(() => {
    setActive(pathname.includes(item.path));
  }, [pathname, item.path]);

  return (
    <li>
      <Link
        href={item.path}
        className={clsx('text-sm underline-offset-4', {
          'font-bold text-white': active && !htf,
          'font-bold': active && htf,
          'hover:text-white': !htf
        })}
      >
        {item.title}
      </Link>
    </li>
  );
};

export default function NavMenu() {
  return (
    <nav>
      <ul className="mt-3 flex items-center justify-center gap-4">
        {navLinks.map((item: any) => {
          return <NavMenuItem key={item.title} item={item} />;
        })}
      </ul>
    </nav>
  );
}
