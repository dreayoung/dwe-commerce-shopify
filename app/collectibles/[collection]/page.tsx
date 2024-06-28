import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params
}: {
  params: { collection: string };
}): Promise<Metadata> {
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`
  };
}

export default async function Page({ params }: { params: { collection: string } }) {
  const products = await getCollectionProducts({ collection: params.collection });
  const collection = await getCollection(params.collection);

  if (!products) return notFound();

  return (
    <section>
      {products.length === 0 ? (
        <p className="px-20 pt-32 text-center font-hta text-3xl lg:text-6xl">{`No collectibles right now`}</p>
      ) : (
        <div className="mx-4">
          <div className="flex flex-col items-center justify-center space-y-2 py-12 text-center uppercase">
            <p className="text-center font-hta text-6xl uppercase text-white/10 lg:text-8xl">
              {collection?.description}
            </p>
            {/* <h1 className="text-neutral-800">{collection?.title}</h1> */}
          </div>
          <Grid className="my-8">
            <ProductGridItems
              collection={`collectibles/${params.collection}`}
              products={products}
            />
          </Grid>
        </div>
      )}
    </section>
  );
}
