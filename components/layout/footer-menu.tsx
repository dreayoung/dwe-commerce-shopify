'use client';

import clsx from 'clsx';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const FooterMenuItem = ({ item }: { item: Menu }) => {
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
        className={clsx('block p-2 text-center text-sm lowercase tracking-widest md:inline-block', {
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

export default function FooterMenu({ menu }: { menu: Menu[] }) {
  if (!menu.length) return null;

  return (
    <nav>
      <ul className="flex items-center space-x-px">
        {menu.map((item: Menu) => {
          return <FooterMenuItem key={item.title} item={item} />;
        })}
      </ul>
    </nav>
  );
}
