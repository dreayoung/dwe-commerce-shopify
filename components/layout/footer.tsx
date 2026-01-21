import FooterMenu from 'components/layout/footer-menu';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import Link from 'next/link';
import { Suspense } from 'react';
import SubscribeSection from '../customer/footer-sub';
import FooterLinks from './footer-links';

const { COMPANY_NAME, SITE_NAME, LOCKED_SCREEN_PASSW } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-900';
  const menu = await getMenu('current-menu');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="relative mx-auto flex flex-col items-center justify-center gap-4 text-sm">
      {!LOCKED_SCREEN_PASSW && (
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 border-t border-neutral-100/10 p-6 pt-10 text-sm min-[1320px]:px-0">
          <div className="font-hta text-xl font-semibold uppercase">Navigation</div>
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
      )}
      <div className="md:px-20">
        <div className="mx-auto flex w-[90%] max-w-2xl flex-col items-center justify-center gap-4 rounded-lg border border-neutral-100/10 bg-transparent/20 p-12 shadow-sm">
          <LogoSquare size="sm" />
          <SubscribeSection />
          <FooterLinks />
        </div>
      </div>
      <div className="mt-8 h-5 w-full border-t border-neutral-100/10" />
      <div className="pb-8">
        <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-1 px-4 text-xs">
          <p>
            &copy; {currentYear} {copyrightName}. All rights reserved.
          </p>
          <Link href="https://askdwe.xyz" target="_blank" className="mt-1">
            Developed by @?k
          </Link>
        </div>
      </div>
    </footer>
  );
}
