import clsx from 'clsx';
import Image from 'next/image';
import LogoIcon from './icons/logo';
import logo from '../public/hero-logo.png';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <Image
      src={logo}
      alt="hero to all"
      className={clsx({
        'h-[55px] w-[55px]': !size,
        'h-[35px] w-[35px]': size === 'sm'
      })}
    />
  );
}
