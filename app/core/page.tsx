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

export default async function CorePage() {
  const products = await getCollectionProducts({ collection: 'core' });
  const collection = await getCollection('core');

  const catFilter = products.filter((product) => product.tags.includes('BOTTOMS'));

  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <div className="mx-4 mb-32 md:mx-24">
          <div className="flex items-center justify-center py-4">
            <h1 className="text-center font-vcr text-5xl uppercase text-neutral-800 lg:text-8xl">
              {collection?.description}
            </h1>
          </div>
          {/* <div className="py-8 text-sm flex items-center justify-center gap-4">
            <div className="py-1 px-6 rounded-2xl border border-white">Tops</div>
            <div className="py-1 px-6 rounded-2xl border border-white">Bottoms</div>
            <div className="py-1 px-6 rounded-2xl border border-white">Capes</div>
          </div> */}
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
