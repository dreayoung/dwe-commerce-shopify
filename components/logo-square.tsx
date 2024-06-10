import clsx from 'clsx';
import Image from 'next/image';
import LogoIcon from './icons/logo';
import logo from '../public/inverted_logo.png';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <Image
      src={logo}
      alt="hero to all"
      className={clsx({
        'h-[45px] w-[45px]': !size,
        'h-6 w-6': size === 'sm'
      })}
    />
  );
}
