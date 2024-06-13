import Link from 'next/link';

export default function CollectiblesPage() {
  return (
    <div className="grid place-items-center gap-10 pb-10 pt-32 text-center font-vcr text-xl uppercase md:grid-cols-3">
      <Link href="/collectibles/frontpage" className="hover:text-neutral-500">
        Hero to all <br /> collectibles
      </Link>
      <hr className="w-60 border-[1px] border-neutral-800 md:rotate-90" />
      <Link
        href="/collectibles/htf-collectibles"
        className="text-htf_green hover:text-htf_green/60"
      >
        Hero to few <br /> collectibles
      </Link>
    </div>
  );
}
