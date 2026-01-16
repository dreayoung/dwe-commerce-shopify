import { getCollection, getCollectionProducts } from 'lib/shopify';

import Grid from 'components/grid';
import Footer from 'components/layout/footer';
import ProductGridItems from 'components/layout/product-grid-items';
import CategoryFilter from 'components/layout/search/category-filter';
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

const categoriesTags = ['ALL', 'CAPS', 'TOPS', 'BOTTOMS', 'CAPES'];

export default async function CorePage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;

  const searchValue = resolvedSearchParams.sort;

  const [products, collection] = await Promise.all([
    getCollectionProducts({ collection: 'core', tagQ: searchValue }),
    getCollection('core')
  ]);

  return (
    <section>
      <div className="mx-4 mb-32 md:mx-24">
        <div className="flex items-center justify-center p-14">
          <h1 className="text-center font-hta text-6xl uppercase text-neutral-800 lg:text-7xl">
            {collection?.description}
          </h1>
        </div>
        <div className="relative mr-4 mt-8 flex w-full items-center justify-end gap-4 text-xs md:text-sm">
          <span className="absolute left-0 top-0 uppercase">tags</span>
          {categoriesTags.map((cat: any, x: number) => {
            return <CategoryFilter key={`${cat}-${x}`} item={cat} />;
          })}
        </div>
        {products.length === 0 ? (
          <p className="flex min-h-screen items-center justify-center text-center font-hta text-xl lg:text-3xl">{`all out of ${searchValue}.`}</p>
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
