import Footer from 'components/layout/footer';
import LockPage from 'components/layout/lockpage';

export const metadata = {
  description: 'Hero To All',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <main className="grid h-dvh place-content-center place-items-end gap-y-8 pt-20">
      <LockPage />
      <Footer />
    </main>
  );
}
