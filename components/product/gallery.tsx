'use client';

import Image from 'next/image';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  return (
    <>
      {images.length > 1 ? (
        <ul className="carousel flex h-full w-full space-x-4 rounded-2xl bg-neutral-800/25 lg:p-4">
          {images.map((image, index) => {
            return (
              <div
                className="relative box-content flex aspect-square h-[30rem] w-72 flex-none snap-center md:w-96"
                key={index}
              >
                <Image
                  className="rounded-2xl object-cover"
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  alt={image.altText as string}
                  src={image.src as string}
                  priority={true}
                />
              </div>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}
