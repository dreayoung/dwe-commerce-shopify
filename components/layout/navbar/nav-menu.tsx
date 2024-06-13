'use client';

import clsx from 'clsx';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NavMenuItem = ({ item }: { item: Menu }) => {
  const pathname = usePathname();
  const htf = pathname.includes('htf');
  const [active, setActive] = useState(pathname === item.path);

  useEffect(() => {
    setActive(pathname === item.path);
  }, [pathname, item.path]);

  return (
    <li>
      <Link
        href={item.path}
        className={clsx('text-sm underline-offset-4 hover:text-white hover:underline', {
          'underline underline-offset-4': active,
          'hover:text-neutral-800': htf
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
      <ul className="mt-4 flex items-center justify-center gap-4 uppercase tracking-wider">
        {menu.map((item: Menu) => {
          return <NavMenuItem key={item.title} item={item} />;
        })}
      </ul>
    </nav>
  );
}
