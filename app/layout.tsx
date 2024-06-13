import Navbar from 'components/layout/navbar';
import { ensureStartsWith } from 'lib/utils';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import './globals.css';
import MainLayout from './mainLayout';

const vcr = localFont({
  src: './vcr.woff2',
  display: 'swap',
  variable: '--font-vcr'
});

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    })
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`font-mono ${vcr.variable}`}>
      <MainLayout>
        <Navbar />
        <main>{children}</main>
      </MainLayout>
    </html>
  );
}
