import NavMenu from './nav-menu';
import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Navbar() {
  const menu = await getMenu('current-menu');

  return (
    <nav className="relative mx-auto w-full max-w-6xl p-6">
      <div className="flex items-center justify-between border-b border-neutral-100/10 pb-2  md:justify-around">
        <Link href="/" className="">
          <LogoSquare size="sm" />
        </Link>

        <Link href="/" className="font-hta text-2xl font-black">
          <span>HTA</span>
        </Link>

        <div className="flex-none">
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
      <NavMenu menu={menu} />
    </nav>
  );
}
