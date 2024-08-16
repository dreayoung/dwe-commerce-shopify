import { ensureStartsWith } from 'lib/utils';
import { Londrina_Solid } from 'next/font/google';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import './globals.css';
import MainLayout from './mainLayout';

const HtaFont = localFont({
  src: '../fonts/HtaFont-Regular.ttf',
  display: 'swap',
  variable: '--font-hta'
});

const londria = Londrina_Solid({
  subsets: ['latin'],
  weight: ['100', '300']
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

const envVariable = process.env.LOCKED_SCREEN_PASSW;

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`font-extralight ${londria.className} ${HtaFont.variable}`}>
      <MainLayout>
        <main>{children}</main>
      </MainLayout>
    </html>
  );
}
