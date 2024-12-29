'use client';

import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useCart } from '../context/cart-context';
import Price from 'components/price';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useRef, useState } from 'react';
import CloseCart from './close-cart';
import { DeleteItemButton } from './delete-item-button';
import OpenCart from './open-cart';
import LoadingDots from 'components/loading-dots';

export default function CartModal() {
  const { cart, handleCheckout, loading } = useCart();
  const path = usePathname();
  const htf = path.includes('herotofew');

  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart.length);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  let cartTotal = 0;
  cart.map((item) => (cartTotal += item?.price * item?.quantity));

  useEffect(() => {
    // Open cart modal when quantity changes.
    if (cart.length !== quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!isOpen) {
        setIsOpen(true);
      }

      // Always update the quantity reference
      quantityRef.current = cart.length;
    }
  }, [isOpen, cart.length, quantityRef]);

  const checkoutBorder =
    'mb-3 flex items-center justify-between border-b border-neutral-800 pb-1 pt-1';

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div
              className={clsx('fixed inset-0 bg-black/75', { 'bg-htf_bg/70': htf })}
              aria-hidden="true"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel
              className={clsx(
                'fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-black bg-black p-6 backdrop-blur-xl md:w-[390px]',
                {
                  'border-htf_bg bg-htf_bg': htf
                }
              )}
            >
              <div className="text-right">
                {/* <p className="text-lg font-semibold">My Cart</p>  */}

                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.length === 0 ? (
                <div className="flex h-full w-full items-center justify-center overflow-hidden">
                  {!loading ? (
                    <p className="mt-6 text-center font-hta text-xl uppercase">
                      Your cart is empty.
                    </p>
                  ) : (
                    <p className="mt-6 text-center font-hta text-xl uppercase">
                      redirecting to checkout....
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="flex-grow overflow-auto py-4">
                    {cart.map((item: any, i: number) => {
                      //  const merchandiseSearchParams = {} as MerchandiseSearchParams;

                      //  item.merchandise.selectedOptions.forEach(({ name, value }: any) => {
                      //    if (value !== 'DEFAULT_OPTION') {
                      //      merchandiseSearchParams[name.toLowerCase()] = value;
                      //    }
                      //  });

                      //  const merchandiseUrl = createUrl(
                      //    `/product/${item.merchandise.product.handle}`,
                      //    new URLSearchParams(merchandiseSearchParams)
                      //  );

                      return (
                        <li
                          key={i}
                          className={clsx(
                            'flex w-full flex-col border-b-[1px] border-neutral-800',
                            {
                              'border-neutral-100/10': htf
                            }
                          )}
                        >
                          <div className="relative flex w-full flex-row justify-between px-1 py-4">
                            <div className="absolute z-40 -mt-2 ml-[55px]">
                              <DeleteItemButton item={item} />
                            </div>
                            <Link
                              href=""
                              onClick={closeCart}
                              className="z-30 flex flex-row space-x-4"
                            >
                              <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300">
                                <Image
                                  className="h-full w-full object-cover"
                                  width={64}
                                  height={64}
                                  alt={item.itemName}
                                  src={item.image}
                                />
                              </div>

                              <div className="flex flex-1 flex-col text-base">
                                <span className="font-hta text-lg leading-tight">
                                  {item.itemName}
                                </span>
                                {item.variationName !== undefined ? (
                                  <p className="text-sm">{item.variationName}</p>
                                ) : (
                                  <p className="text-sm">OS</p>
                                )}
                                <span className="text-sm">q:{item.quantity}</span>
                              </div>
                            </Link>
                            <div className="flex h-16 flex-col justify-between">
                              <Price
                                className="flex justify-end space-y-2 text-right text-sm"
                                amount={item.price}
                                currencyCode="USD"
                              />
                              {/* <div
                                className={clsx(
                                  'ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-800',
                                  {
                                    'border-neutral-100/10': htf
                                  }
                                )}
                              >
                                <EditItemQuantityButton item={item} type="minus" />
                                <p className="w-6 text-center">
                                  <span className="w-full text-sm">{item.quantity}</span>
                                </p>
                                <EditItemQuantityButton item={item} type="plus" />
                              </div> */}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="py-4 text-sm">
                    {/* <div className={clsx(checkoutBorder, { 'border-neutral-100/10': htf })}>
                      <p>Taxes</p>
                      <p className="text-right">included.</p>
                    </div> */}
                    <div className={clsx(checkoutBorder, { 'border-neutral-100/10': htf })}>
                      <p>Shipping</p>
                      <p className="text-right">Calculated at checkout</p>
                    </div>
                    <div className={clsx(checkoutBorder, { 'border-neutral-100/10': htf })}>
                      <p>Total</p>
                      <p>{`$ ${cartTotal.toFixed(2)} USD`}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="block w-full rounded-full bg-white p-3 text-center text-sm font-medium text-black opacity-90 hover:opacity-100"
                  >
                    {!loading ? 'Proceed to Checkout' : <LoadingDots className="bg-black" />}
                  </button>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
