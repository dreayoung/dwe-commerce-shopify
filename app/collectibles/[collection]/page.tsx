import ProductGridSkeleton from '@/components/layout/product-grid-skeletons';
import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export async function generateMetadata({
  params
}: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const { collection } = await params;
  const collectionData = await getCollection(collection);

  if (!collectionData) return notFound();

  return {
    title: collectionData.seo?.title || collectionData.title,
    description:
      collectionData.seo?.description ||
      collectionData.description ||
      `${collectionData.title} products`
  };
}

async function ProductList({ collection }: { collection: string }) {
  const products = await getCollectionProducts({ collection });

  if (products.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="px-20 pt-32 text-center font-hta text-3xl lg:text-6xl">
          No collectibles right now
        </p>
      </div>
    );
  }

  return <ProductGridItems collection={`collectibles/${collection}`} products={products} />;
}

export default async function Page({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  const collectionData = await getCollection(collection);

  return (
    <section>
      <div className="mx-4">
        <div className="flex flex-col items-center justify-center space-y-2 py-12 text-center uppercase">
          <p className="text-center font-hta text-6xl uppercase text-white/10 lg:text-8xl">
            {collectionData?.description}
          </p>
        </div>
        <Grid className="my-8">
          <Suspense fallback={<ProductGridSkeleton items={12} />}>
            <ProductList collection={collection} />
          </Suspense>
        </Grid>
      </div>
    </section>
  );
}
