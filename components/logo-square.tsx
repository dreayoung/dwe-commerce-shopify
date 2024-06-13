'use client';

import clsx from 'clsx';
import Image from 'next/image';
import LogoIcon from './icons/logo';
import logo_inverted from '../public/inverted_logo.png';
import logo from '../public/hero-logo.png';
import { usePathname } from 'next/navigation';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  const path = usePathname();
  const htf = path.includes('htf');

  return (
    <Image
      src={htf ? logo : logo_inverted}
      alt="hero to all"
      className={clsx({
        'h-[45px] w-[45px]': !size,
        'h-6 w-6': size === 'sm',
        'h-10 w-10': size === 'sm' && htf
      })}
    />
  );
}
