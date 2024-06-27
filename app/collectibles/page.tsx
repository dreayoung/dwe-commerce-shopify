import Link from 'next/link';

export default function CollectiblesPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 space-y-6 pt-40 text-center font-hta text-3xl uppercase md:flex-row md:space-x-6 md:space-y-0">
      <Link href="/collectibles/frontpage" className="hover:text-neutral-600">
        Hero to all <br /> collectibles
      </Link>
      <hr className="w-52 border-[1px] border-neutral-800 md:rotate-90" />
      <Link
        href="/collectibles/htf-collectibles"
        className="text-htf_green hover:text-htf_green/60"
      >
        Hero to few <br /> collectibles
      </Link>
    </div>
  );
}
