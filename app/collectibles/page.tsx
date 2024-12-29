import Link from 'next/link';

export default function CollectiblesPage() {
  return (
    <div className="flex min-h-[80dvh] flex-col items-center justify-center gap-2 space-y-6 text-center font-hta text-2xl uppercase md:flex-row md:space-x-6 md:space-y-0 lg:text-3xl">
      <Link href="/collectibles/herotoall" className="hover:text-neutral-600">
        Hero to all <br /> collectibles
      </Link>
      <hr className="w-52 border-[1px] border-neutral-800 md:rotate-90" />
      <Link href="/collectibles/herotofew" className="text-htf_green hover:text-htf_bg">
        Hero to few <br /> collectibles
      </Link>
    </div>
  );
}
