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
  // console.log('Rendering ProductGridItems with products:', products);

  return (
    <>
      {products.map((product) => {
        // A product is truly "Sold Out" if Shopify says it's not available
        // OR if the physical inventory count is 0 or less.
        const isSoldOut = !product.availableForSale || product.totalInventory <= 0;

        return (
          <Grid.Item key={product.handle} className="animate-fadeIn">
            <Link className="relative h-full w-full" href={`/${collection}/${product.handle}`}>
              {!product.availableForSale ? (
                <span className="absolute inset-2 z-50 h-fit w-fit whitespace-nowrap rounded-full border-black bg-black/65 p-1 px-2 text-[8.5px] text-zinc-100 backdrop-blur-xl">
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
        );
      })}
    </>
  );
}
