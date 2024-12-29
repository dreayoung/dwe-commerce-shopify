'use client';

import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';

import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: any }) {
  // console.log('PRODUCT', product);

  const inStock = product.variations.every((prod: any) => !prod.availableForSale);

  return (
    <>
      <div className="mb-6 flex flex-col pt-4">
        <div className="mr-auto w-auto rounded-full text-2xl font-bold">
          <Price amount={product.price} currencyCode="USD" />
        </div>
      </div>
      {product.description ? (
        <>
          <p className="font-semibold uppercase">details</p>
          <Prose className="mb-6 text-sm leading-tight" html={product.description} />
        </>
      ) : null}
      <VariantSelector options={product.options} variants={product.variations} />
      <AddToCart product={product} variants={product.variations} availableForSale={inStock} />
    </>
  );
}
