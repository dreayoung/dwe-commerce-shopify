import Footer from 'components/layout/footer';
import { Suspense } from 'react';

export default function AboutPage() {
  return (
    <>
      <div className="w-full">
        <div className="mx-auto max-w-2xl px-10 py-20 pb-44 text-center">
          <div className="flex flex-col items-center space-y-2">
            <h1 className="font-vcr py-8 text-7xl uppercase text-neutral-800 text-opacity-50">
              About
            </h1>
            <div className="font-hta text-2xl">
              The only way you can truly help everyone, is to work on yourself. The science of a
              sound mind.
            </div>
            <p className="text-xs text-htf_green lg:text-lg">528 Hz</p>
          </div>
        </div>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
