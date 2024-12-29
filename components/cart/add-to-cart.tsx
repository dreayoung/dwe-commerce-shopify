'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import LoadingDots from 'components/loading-dots';
import { CartItem, ProductVariant } from '../../@types';
import { useSearchParams } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { useCart } from '../context/cart-context';

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const { pending } = useFormStatus();
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full border border-neutral-800 hover:border-neutral-100 p-4 uppercase tracking-widest font-bold';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (availableForSale) {
    return (
      <button aria-disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        aria-disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart
      </button>
    );
  }

  return (
    <button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label="Add to cart"
      aria-disabled={pending}
      className={clsx(buttonClasses, {
        'hover:opacity-90': true,
        disabledClasses: pending
      })}
    >
      <div className="absolute left-0 ml-4">
        {pending ? <LoadingDots className="mb-3 bg-white" /> : <PlusIcon className="h-5" />}
      </div>
      Add To Cart
    </button>
  );
}

export function AddToCart({
  product,
  variants,
  availableForSale
}: {
  product: any;
  variants: ProductVariant[];
  availableForSale: boolean;
}) {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();

  const defaultVariantId = variants?.length === 1 ? variants[0]?.id : undefined;
  const variant = variants?.find(
    (variant: ProductVariant) => variant.name === searchParams.get('sizes')
  );

  const selectedVariantId = variant?.id || defaultVariantId;

  const uid = `${product.name.slice(0, 3)}_${variant?.name}_${variant?.id}`;
  const selected: CartItem = {
    catalogObjectId: selectedVariantId,
    itemName: product.name,
    variationName: variant?.name,
    price: product.price,
    image: product.imageUrls[0],
    uid,
    quantity: 1
  };

  // console.log('selected', selected);

  return (
    <form action={() => addToCart(selected)}>
      <SubmitButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} />
    </form>
  );
}
