'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logo_inverted from '../public/Inverted_logo.png';
import logo from '../public/hero-logo.png';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  const path = usePathname();
  const htf = path.includes('htf');

  return (
    <Image
      src={htf ? logo : logo_inverted}
      alt="hero to all"
      className={clsx({
        'h-[45px] w-[45px]': !size,
        'h-6 w-7': size === 'sm',
        'h-10 w-10': size === 'sm' && htf
      })}
    />
  );
}
