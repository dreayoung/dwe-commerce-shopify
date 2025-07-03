import Image from 'next/image';
import img1 from 'public/images/1.png';
import img2 from 'public/images/2.png';
import img3 from 'public/images/3.png';

export default function Hero() {
  return (
    <div className="flex min-h-screen flex-col space-y-20 py-24">
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
          {[img1, img2, img3].map((img, x) => {
            return (
              <div
                className="relative box-content flex aspect-square h-[30rem] w-80 flex-none snap-center md:h-[38rem] md:w-[28rem]"
                key={x}
              >
                <Image
                  src={img}
                  alt="szn pictures"
                  className="h-full w-full rounded-2xl object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
