import ConnectForm from 'components/connect/send-message';
import Footer from 'components/layout/footer';
import { Suspense } from 'react';

export default function ConnectPage() {
  return (
    <>
      <div className="w-full">
        <div className="mx-8 max-w-4xl py-20 pb-32 sm:mx-auto md:px-8 lg:px-0">
          <h1 className="pt-10 font-hta text-6xl uppercase">Let&apos;s Connect</h1>
          <p className="">leave us a message</p>
          <ConnectForm />
        </div>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
