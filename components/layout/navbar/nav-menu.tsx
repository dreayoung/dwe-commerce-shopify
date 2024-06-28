'use client';

import clsx from 'clsx';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NavMenuItem = ({ item }: { item: Menu }) => {
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

export default function NavMenu({ menu }: { menu: Menu[] }) {
  if (!menu.length) return null;

  return (
    <nav>
      <ul className="mt-3 flex items-center justify-center gap-4">
        {menu.map((item: Menu) => {
          return <NavMenuItem key={item.title} item={item} />;
        })}
      </ul>
    </nav>
  );
}
