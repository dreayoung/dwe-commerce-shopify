import LogoSquare from 'components/logo-square';
import Link from 'next/link';
import FooterLinks from './footer-links';
import SubscribeSection from '../customer/footer-sub';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="mx-auto grid content-end gap-4 pb-10 text-sm">
      <div className="p-6 md:px-20">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-4 rounded-lg border border-neutral-100/10 bg-transparent/20 p-12 shadow-sm">
          <LogoSquare size="sm" />
          <SubscribeSection />
          <FooterLinks />
        </div>
      </div>
      <div className="py-6">
        <div className="flex w-full max-w-7xl flex-col items-center justify-end gap-1 px-4 text-xs">
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
