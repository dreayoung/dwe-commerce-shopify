// import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
// import { Suspense } from 'react';

// import Footer from 'components/layout/footer';
import { Gallery } from 'components/product/gallery';
import { ProductDescription } from 'components/product/product-description';

import { getProduct } from 'actions/products';

// export const runtime = 'edge';

// export async function generateMetadata({
//   params
// }: {
//   params: { handle: string };
// }): Promise<Metadata> {
//   const product = await getProduct(params.handle);

//   if (!product) return notFound();

//   const { url, width, height, altText: alt } = product.imageUrls || {};
//   const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

//   return {
//     title: product.name,
//     description: product.description,
//     robots: {
//       index: indexable,
//       follow: indexable,
//       googleBot: {
//         index: indexable,
//         follow: indexable
//       }
//     },
//     openGraph: url
//       ? {
//           images: [
//             {
//               url,
//               width,
//               height,
//               alt
//             }
//           ]
//         }
//       : null
//   };
// }

export default async function CoreProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  return (
    <main className="mt-3 min-h-screen pt-20">
      <h1 className="mb-2 text-center font-hta text-5xl font-medium">{product.name}</h1>
      <p className="text-center uppercase text-neutral-700">Hero to all</p>
      <div className="m-4 flex-row gap-8 p-4 lg:flex lg:items-start lg:justify-around">
        <Gallery
          images={product.imageUrls.map((image: string) => ({
            src: image,
            altText: 'imgs'
          }))}
        />

        <div className="w-full md:w-2/3">
          <ProductDescription product={product} />
        </div>
      </div>
    </main>
  );
}
