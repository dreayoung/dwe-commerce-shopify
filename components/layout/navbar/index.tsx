import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search from './search';
import Socials from './socials-grid';
const { SITE_NAME, INSTAGRAM_URL, TIKTOK_URL, YOUTUBE_URL } = process.env;

export default async function Navbar() {
  const menu = await getMenu('current-menu');

  console.log('MENU', menu);

  return (
    <nav className="relative mx-auto w-full max-w-6xl p-6">
      <div className="flex items-center justify-between">
        {/* <div className="md:hidden">
          <MobileMenu menu={menu} />
        </div> */}
        <Socials />

        <Link href="/" className="">
          <LogoSquare />
        </Link>

        <div className="flex-none">
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
      {menu.length ? (
        <ul className="flex items-center justify-center gap-6 text-sm">
          {menu.map((item: Menu) => (
            <li key={item.title}>
              <Link
                href={item.path}
                className="text-neutral-500 underline-offset-4 hover:text-black hover:underline"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </nav>
  );
}
