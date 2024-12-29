import Footer from 'components/layout/footer';
import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full">
      <div className="mb-32 md:px-24">{children}</div>
    </main>
  );
}
