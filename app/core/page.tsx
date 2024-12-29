import { getAllProducts } from 'actions/products';

import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { Metadata } from 'next';
import CategoryFilter from 'components/layout/search/category-filter';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Core',
    description: 'Core Products'
  };
}

const categoriesTags = ['ALL', 'CAPS', 'HOODIE', 'BOTTOMS', 'CAPE'];

export const revalidate = 0;

export default async function CorePage({
  searchParams
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const { sort: searchValue } = searchParams as { [key: string]: string };

  const products = await getAllProducts();
  const filteredProducts = searchValue
    ? products?.filter((product: any) => product.name.includes(searchValue))
    : products;

  return (
    <section>
      <div className="mx-4 mb-32 md:mx-24">
        <div className="flex flex-col items-center justify-center p-14">
          <h1 className="text-center font-hta text-6xl uppercase text-neutral-800 lg:text-7xl">
            core
          </h1>
          <p>Essentials. Basics.</p>
        </div>
        <div className="relative mr-4 mt-8 flex w-full items-center justify-end gap-4 text-xs md:text-sm">
          <span className="absolute left-0 top-0 uppercase">tags</span>
          {categoriesTags.map((cat: any, x: number) => {
            return <CategoryFilter key={`${cat}-${x}`} item={cat} />;
          })}
        </div>
        {!filteredProducts || filteredProducts.length <= 0 ? (
          <div className="grid h-[70dvh] place-items-center">
            <p className="text-center font-hta text-xl lg:text-3xl">{`all out of ${searchValue}.`}</p>
          </div>
        ) : (
          <Grid className="">
            <ProductGridItems collection="core" products={filteredProducts} />
          </Grid>
        )}
      </div>
    </section>
  );
}
