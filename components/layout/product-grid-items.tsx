'use client';

import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import Label from 'components/label';
import Link from 'next/link';

export default function ProductGridItems({
  products,
  collection
}: {
  products: any;
  collection: string;
}) {
  // console.log('products', products);

  return (
    <>
      {products.map((product: any) => (
        <Grid.Item key={product.id} className="animate-fadeIn">
          <Link className="relative h-full w-full" href={`/${collection}/${product.id}`}>
            {!product.availableForSale ? (
              <span className="absolute inset-2 z-50 h-fit w-fit rounded-full bg-zinc-900 p-2 text-xs text-zinc-100">
                Sold Out
              </span>
            ) : null}
            <GridTileImage alt={product.name} src={product.previewImg} width={350} height={350} />
            <Label title={product.name} amount={product.price} currencyCode="USD" />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
