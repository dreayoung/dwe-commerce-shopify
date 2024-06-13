import Footer from 'components/layout/footer';
import Hero from 'components/layout/hero';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'Hero to all',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      <Suspense>
        <Hero />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
