'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import clsx from 'clsx';

import { AiOutlineArrowRight } from 'react-icons/ai';
import { addCustomer } from './actions';
import LoadingDots from 'components/loading-dots';
import { Customer } from 'lib/shopify/types';

export default function SubscribeSection() {
  const path = usePathname();
  const htf = path.includes('herotofew');

  const [reveal, setReveal] = useState(false);
  const [email, setEmail] = useState('');
  const [addedCustomer, setAddedCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(false);

  const newsletterSub = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    const createdCustomer = await addCustomer(email);

    setLoading(false);
    return setAddedCustomer(createdCustomer);
  };

  return (
    <>
      <p className="px-6 py-2 md:w-[80%] md:px-0">
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
          className={clsx('my-6 w-full border-b-[1px] border-b-neutral-800 px-6 text-center', {
            'border-b-neutral-100/10': htf
          })}
        >
          <div className="space-y-2 pb-2">
            <form onSubmit={(e) => newsletterSub(e)} className="relative">
              <input
                type="email"
                placeholder="Email"
                name="Email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full bg-transparent focus-visible:outline-none"
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

      {addedCustomer?.id !== 'Error adding customer' ? (
        <p className="text-xs text-red-700">{addedCustomer?.id}</p>
      ) : addedCustomer?.id.includes('gid') ? (
        <p className="text-xs text-green-700">✔️ sucessfully added.</p>
      ) : null}
    </>
  );
}
