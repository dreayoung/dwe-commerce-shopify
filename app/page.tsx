import Footer from 'components/layout/footer';
import Hero from 'components/layout/hero';

export const metadata = {
  description: 'Hero To All',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return <Hero />;
}
