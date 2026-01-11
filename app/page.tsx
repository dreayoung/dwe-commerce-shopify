import Footer from 'components/layout/footer';
import Hero from 'components/layout/hero';
import LockPage from 'components/layout/lockpage';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  description: 'Hero To All',
  openGraph: {
    type: 'website'
  }
};

const envVariable = process.env.LOCKED_SCREEN_PASSW;

export default async function HomePage() {
  return (
    <>
      <Suspense>
        {!envVariable ? <Hero /> : <LockPage />}
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
