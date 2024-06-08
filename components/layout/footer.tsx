import Link from 'next/link';

import FooterMenu from 'components/layout/footer-menu';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import { Suspense } from 'react';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
  const menu = await getMenu('current-menu');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="text-sm text-neutral-500">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 border-t border-neutral-200 p-6 text-sm min-[1320px]:px-0">
        <div className="font-semibold uppercase text-black">Navigation</div>
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] items-center gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu menu={menu} />
        </Suspense>
      </div>
      <div className="p-6 md:px-20">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4 rounded-lg border border-neutral-200 bg-off_white/20 px-6 py-4 shadow-sm min-[1320px]:px-0">
          <LogoSquare size="sm" />
          <p className="px-6 py-2 md:w-1/2 md:px-0">
            <span className="leading-6 underline underline-offset-4">Sign up</span> for HTA emails
            and receive the latest news from the Cave, including exclusive online pre-launches and
            new collections.
          </p>
          <div className="flex items-center space-x-4 pt-4">
            <p>insta</p>
            <p>twitter</p>
            <p>youtube</p>
            <p>tik tok</p>
          </div>
        </div>
      </div>
      <div className="py-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 min-[1320px]:px-0">
          <p>
            &copy; {currentYear} {copyrightName}. All rights reserved.
          </p>
          <p>Developed by @?k</p>
        </div>
      </div>
    </footer>
  );
}
