import { getCollection, getCollectionProducts } from 'lib/shopify';

import Grid from 'components/grid';
import Footer from 'components/layout/footer';
import ProductGridItems from 'components/layout/product-grid-items';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const collection = await getCollection('core');

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`
  };
}

export default async function CorePage({
  searchParams
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const products = await getCollectionProducts({ collection: 'core' });
  const collection = await getCollection('core');

  const catFilter = products.filter((product) => product.tags.includes('BOTTOMS'));

  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 pt-32 text-center font-hta text-3xl lg:text-6xl">{`No products right now`}</p>
      ) : (
        <div className="mx-4 mb-32 md:mx-24">
          <div className="flex items-center justify-center p-14">
            <h1 className="text-center font-hta text-6xl uppercase text-neutral-800 lg:text-8xl">
              {collection?.description}
            </h1>
          </div>
          <div className="relative mt-8 flex w-full items-center justify-end gap-4 text-sm">
            <span className="absolute left-0 top-0">categories</span>
            <div className="rounded-2xl underline underline-offset-4">All</div>
            <div className="rounded-2xl underline-offset-4 hover:underline">Tops</div>
            <div className="rounded-2xl">Bottoms</div>
            <div className="rounded-2xl">Capes</div>
          </div>
          <Grid className="">
            <ProductGridItems collection="core" products={products} />
          </Grid>
        </div>
      )}
      <Suspense>
        <Footer />
      </Suspense>
    </section>
  );
}
