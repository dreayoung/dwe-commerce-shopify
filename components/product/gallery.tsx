'use client';

import Image from 'next/image';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  return (
    <>
      {images.length > 1 ? (
        <ul className="carousel no-scrollbar flex h-full w-full snap-x snap-mandatory space-x-4 overflow-x-auto rounded-2xl bg-neutral-800/25 lg:p-4">
          {images.map((image, index) => {
            return (
              <div
                /* Changed aspect-square to aspect-[4/5] and removed fixed h-[30rem] */
                className="relative box-content flex aspect-[4/5] w-72 flex-none snap-center md:w-96"
                key={index}
              >
                <Image
                  className="rounded-2xl object-cover"
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  alt={image.altText as string}
                  src={image.src as string}
                  priority={index < 2} // Optimized priority for first two images
                />
              </div>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}
