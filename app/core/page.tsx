import { getCollection, getCollectionProducts } from 'lib/shopify';

import Grid from 'components/grid';
import Footer from 'components/layout/footer';
import ProductGridItems from 'components/layout/product-grid-items';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import CategoryFilter from 'components/layout/search/category-filter';

export async function generateMetadata(): Promise<Metadata> {
  const collection = await getCollection('core');

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`
  };
}

const categoriesTags = ['ALL', 'BOTTOMS', 'CAPES', 'TOPS'];

export default async function CorePage({
  searchParams
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const { sort: searchValue } = searchParams as { [key: string]: string };

  const products = await getCollectionProducts({ collection: 'core', tagQ: searchValue });
  const collection = await getCollection('core');

  return (
    <section>
      <div className="mx-4 mb-32 md:mx-24">
        <div className="flex items-center justify-center p-14">
          <h1 className="text-center font-hta text-6xl uppercase text-neutral-800 lg:text-7xl">
            {collection?.description}
          </h1>
        </div>
        <div className="relative mr-4 mt-8 flex w-full items-center justify-end gap-4 text-sm">
          <span className="absolute left-0 top-0 uppercase">tags</span>
          {categoriesTags.map((cat: any, x: number) => {
            return <CategoryFilter key={`${cat}-${x}`} item={cat} />;
          })}
        </div>
        {products.length === 0 ? (
          <p className="py-3 pt-44 text-center font-hta text-xl lg:text-3xl">{`all out of ${searchValue}.`}</p>
        ) : (
          <Grid className="">
            <ProductGridItems collection="core" products={products} />
          </Grid>
        )}
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </section>
  );
}
