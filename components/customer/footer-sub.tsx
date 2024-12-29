'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import clsx from 'clsx';

import { AiOutlineArrowRight } from 'react-icons/ai';
import { addCustomer } from './actions';
import LoadingDots from 'components/loading-dots';

export default function SubscribeSection() {
  const path = usePathname();
  const htf = path.includes('herotofew');

  const [reveal, setReveal] = useState(false);
  const [email, setEmail] = useState('');
  const [addedCustomer, setAddedCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const newsletterSub = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    const createdCustomer = await addCustomer(email);

    setEmail('');
    setLoading(false);
    return setAddedCustomer(createdCustomer);
  };

  return (
    <>
      <p className="py-2 md:w-[80%] md:px-0">
        <span
          onClick={() => setReveal(true)}
          className="leading-6 underline underline-offset-4 hover:cursor-pointer hover:text-off_white"
        >
          Sign up
        </span>{' '}
        for HTA &amp; HTF emails and receive the latest news from the Cave, including exclusive
        online pre-launches and new collectibles.
      </p>
      {reveal && (
        <div
          className={clsx(
            'my-6 w-full border-b-[1px] border-b-neutral-800 px-2 text-center md:w-[80%]',
            {
              'border-b-neutral-100/10': htf
            }
          )}
        >
          <div className="pointer-events-none space-y-2 pb-2">
            <form onSubmit={(e) => newsletterSub(e)} className="relative">
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="pointer-events-auto w-full bg-transparent tracking-widest placeholder:text-current focus-visible:outline-none"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 flex items-center text-xl hover:text-off_white"
              >
                {!loading ? <AiOutlineArrowRight /> : <LoadingDots className="bg-white" />}
              </button>
            </form>
          </div>
        </div>
      )}

      {addedCustomer?.id === 'Error adding customer' ? (
        <p className="text-xs text-red-700">Error.</p>
      ) : addedCustomer?.id === 'Customer exists' ? (
        <p className="rounded-full bg-white/5 p-4 text-xs">You are already subscribed!</p>
      ) : addedCustomer?.id && addedCustomer.createdAt ? (
        <p className="rounded-full bg-white/5 p-2 px-4 text-xs text-green-700">
          sucessfully added.
        </p>
      ) : null}
    </>
  );
}
