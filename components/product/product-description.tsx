import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col pt-4">
        <div className="mr-auto w-auto rounded-full font-vcr text-2xl">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      {product.descriptionHtml ? (
        <>
          <p className="uppercase">details</p>
          <Prose className="mb-6 text-sm leading-tight" html={product.descriptionHtml} />
        </>
      ) : null}

      <VariantSelector options={product.options} variants={product.variants} />

      <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
    </>
  );
}
