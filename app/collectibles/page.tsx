import Link from 'next/link';

export default function CollectiblesPage() {
  return (
    <div className="grid place-items-center gap-10 text-center font-vcr text-xl uppercase md:grid-cols-3">
      <Link href="/collectibles/herotoall" className="w-52 hover:text-neutral-500 lg:w-72">
        Hero to all collectibles
      </Link>
      <hr className="w-60 border-[1px] border-neutral-800 md:rotate-90" />
      <Link
        href="/collectibles/herotofew"
        className="h-full w-52 text-htf_green hover:text-htf_green/60 lg:w-72"
      >
        Hero to few collectibles
      </Link>
    </div>
  );
}
