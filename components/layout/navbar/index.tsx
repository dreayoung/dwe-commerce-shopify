import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
// const { SITE_NAME, INSTAGRAM_URL, TIKTOK_URL, YOUTUBE_URL } = process.env;

export default async function Navbar() {
  const menu = await getMenu('current-menu');

  return (
    <nav className="relative mx-auto w-full max-w-6xl p-6">
      <div className="flex items-center justify-between pb-2 md:justify-around">
        {/* <div className="md:hidden">
          <MobileMenu menu={menu} />
        </div> */}
        {/* <Socials /> */}

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
      {menu.length ? (
        <ul className="mx-auto flex w-fit items-center justify-center gap-4 rounded-2xl border-[1px] border-neutral-800 bg-black p-2 px-6">
          {menu.map((item: Menu) => (
            <li key={item.title}>
              <Link
                href={item.path}
                className="text-sm lowercase underline-offset-4 hover:text-white hover:underline md:text-lg"
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
