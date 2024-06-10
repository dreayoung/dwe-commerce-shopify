import Image from 'next/image';

export default function Hero() {
  const images = [
    'https://cdn.shopify.com/s/files/1/0709/7597/9831/files/1.jpg?v=1717608175',
    'https://cdn.shopify.com/s/files/1/0709/7597/9831/files/2.jpg?v=1717608214',
    'https://cdn.shopify.com/s/files/1/0709/7597/9831/files/3.jpg?v=1717608214',
    'https://cdn.shopify.com/s/files/1/0709/7597/9831/files/4.jpg?v=1717608214',
    'https://cdn.shopify.com/s/files/1/0709/7597/9831/files/5.jpg?v=1717608175',
    'https://cdn.shopify.com/s/files/1/0709/7597/9831/files/6.jpg?v=1717608175',
    'https://cdn.shopify.com/s/files/1/0709/7597/9831/files/7.jpg?v=1717608175',
    'https://cdn.shopify.com/s/files/1/0709/7597/9831/files/8.jpg?v=1717608175',
    'https://cdn.shopify.com/s/files/1/0709/7597/9831/files/9.jpg?v=1717608175',
    'https://cdn.shopify.com/s/files/1/0709/7597/9831/files/10.jpg?v=1717608175'
  ];

  return (
    <div className="flex flex-col space-y-20 py-24">
      <div className="relative flex h-40 items-center justify-center overflow-x-hidden text-center">
        <h1 className="relative z-20">Are you who you want to be?</h1>
        <span className="absolute left-1/2 top-auto hidden -translate-x-1/2 transform whitespace-nowrap text-center font-vcr text-5xl uppercase text-neutral-800/25 md:block md:text-8xl lg:text-[7rem]">
          Herotoall.io
        </span>
        <span className="words absolute top-auto block text-center font-vcr text-8xl uppercase text-neutral-800/25 md:hidden">
          Herotoall.io
        </span>
      </div>
      <div className="px-4 md:px-20">
        <div className="carousel mx-auto flex w-full space-x-4 rounded-2xl bg-neutral-800/25 p-4">
          {images.map((url, x) => {
            return (
              <div
                className="relative box-content flex aspect-square h-[30rem] w-72 flex-none snap-center md:w-96"
                key={x}
              >
                <Image
                  src={url}
                  fill
                  sizes="(min-width: 768px) 25vw, 100vw"
                  alt="szn pictures"
                  className="rounded-2xl object-cover"
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
