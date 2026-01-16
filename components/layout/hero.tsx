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
    <div className="flex flex-col space-y-20 py-24">
      <div className="relative flex h-40 items-center justify-center overflow-hidden text-center font-hta">
        <h1 className="relative z-20">Are you who you want to be?</h1>
        <span className="absolute left-1/2 top-auto hidden -translate-x-1/2 transform whitespace-nowrap text-center uppercase text-neutral-800/40 md:block md:text-9xl lg:text-[10rem]">
          Herotoall.io
        </span>
        <span className="words absolute top-auto block text-center text-[12rem] uppercase text-neutral-800/40 md:hidden">
          Herotoall.io
        </span>
      </div>
      <div className="px-4 md:px-20">
        <div className="carousel mx-auto flex w-full space-x-4 rounded-2xl bg-neutral-800/25 p-4">
          {images.map((url, x) => {
            return (
              <div
                className="relative box-content flex aspect-square h-[35rem] w-96 flex-none snap-center"
                key={x}
              >
                <Image
                  src={url}
                  fill
                  sizes="(min-width: 768px) 25vw, 100vw"
                  alt="szn pictures"
                  className="rounded-2xl object-fill"
                  priority={x > 3 ? false : true}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
