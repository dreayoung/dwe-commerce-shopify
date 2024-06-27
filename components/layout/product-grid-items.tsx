'use client';

import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import Label from 'components/label';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';

export default function ProductGridItems({
  products,
  collection
}: {
  products: Product[];
  collection: string;
}) {
  console.log('products', products);

  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link className="relative h-full w-full" href={`/${collection}/${product.handle}`}>
            {!product.availableForSale ? (
              <span className="absolute inset-2 z-50 h-fit w-fit rounded-full bg-zinc-900 p-1 px-3 text-xs text-zinc-100">
                Sold Out
              </span>
            ) : null}
            <GridTileImage
              alt={product.title}
              src={product.featuredImage?.url}
              width={350}
              height={350}
            />
            <Label
              title={product.title}
              amount={product.priceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
