import Image from 'next/image';

export default function Hero() {
  const images = [
    'https://cdn.shopify.com/s/files/1/0709/7597/9831/files/1_c23f31f6-0a43-4e70-9d07-e191302025ad.jpg?v=1768606703',
    'https://cdn.shopify.com/s/files/1/0709/7597/9831/files/2_2fec54f5-3af9-4ee3-8f2a-89a3b2a9730d.jpg?v=1768606703',
    'https://cdn.shopify.com/s/files/1/0709/7597/9831/files/3_b6c07570-ef67-42a0-b051-7a269def882f.jpg?v=1768606704',
    'https://cdn.shopify.com/s/files/1/0709/7597/9831/files/4_a58ca763-fcb5-47c1-b227-17687bf6f619.jpg?v=1768606704',
    'https://cdn.shopify.com/s/files/1/0709/7597/9831/files/5_960f85a2-e451-42b9-aafd-ab28fd4ea851.jpg?v=1768606703'
  ];

  return (
    <div className="flex flex-col space-y-12 py-16 md:space-y-20 md:py-24">
      {/* Title Section (Restored & Responsive) */}
      <div className="relative flex h-32 items-center justify-center overflow-hidden text-center font-hta md:h-40">
        <h1 className="relative z-20 text-lg uppercase tracking-widest md:text-2xl">
          Are you who you want to be?
        </h1>
        <span className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap text-center uppercase text-neutral-800/40 md:block md:text-9xl lg:text-[10rem]">
          Herotoall.io
        </span>
        <span className="words pointer-events-none absolute top-1/2 block -translate-y-1/2 text-center text-8xl uppercase text-neutral-800/40 md:hidden">
          Herotoall.io
        </span>
      </div>

      {/* Carousel Section */}
      <div className="w-full">
        <div
          className="carousel no-scrollbar flex w-full snap-x snap-mandatory gap-4 overflow-x-auto px-6 md:gap-8 md:px-20"
          style={{ scrollPaddingLeft: '1.5rem' }}
        >
          {images.map((url, x) => {
            return (
              <div
                key={x}
                /* MOBILE: 80% width for the peek effect.
                   DESKTOP: max-width of 400px and max-height to keep it within view.
                */
                className="relative aspect-[4/5] w-[80vw] flex-none snap-start 
                           md:max-h-[500px] md:w-[400px] lg:max-h-[560px] lg:w-[450px]"
              >
                <Image
                  src={url}
                  alt={`szn picture ${x + 1}`}
                  fill
                  sizes="(max-width: 768px) 80vw, 450px"
                  className="rounded-2xl object-cover shadow-lg transition-transform duration-300"
                  priority={x < 2}
                />
              </div>
            );
          })}
          {/* Spacer for the end of scroll */}
          <div className="w-6 flex-none md:w-20" />
        </div>
      </div>
    </div>
  );
}
