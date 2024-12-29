'use client';

import clsx from 'clsx';
import { createUrl } from 'lib/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function CategoryFilter({ item }: { item: string }) {
  const searchParams = useSearchParams();
  const active = searchParams.get('sort') === item;
  const q = searchParams.get('sort');

  const DynamicTag = active ? 'p' : Link;

  const newParams = new URLSearchParams(searchParams.toString());
  newParams.delete('sort');

  return (
    <DynamicTag
      href={
        item === 'ALL' ? createUrl('core', newParams) : createUrl(`/core?sort=${item}`, newParams)
      }
      className={clsx('hover:text-off_white hover:underline hover:underline-offset-4', {
        'text-off_white underline underline-offset-4': active || (!q && item === 'ALL')
      })}
    >
      {item === 'CAPE' ? 'CAPES' : item === 'HOODIE' ? 'TOPS' : item}
    </DynamicTag>
  );
}
