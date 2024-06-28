'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiFillYoutube,
  AiOutlineYoutube,
  AiFillInstagram,
  AiOutlineArrowRight
} from 'react-icons/ai';

import { FaInstagram, FaTiktok } from 'react-icons/fa';

const links = [
  {
    comp: <FaInstagram />,
    url: 'https://www.instagram.com/herotoall',
    htfUrl: 'https://www.instagram.com/herotofew'
  },
  {
    comp: <AiOutlineTwitter />,
    url: 'https://twitter.com/aherotoall',
    htfUrl: 'https://twitter.com/herotofew'
  },
  {
    comp: <FaTiktok />,
    url: 'https://www.tiktok.com/@herotoall',
    htfUrl: 'https://www.tiktok.com/@herotofew'
  },
  {
    comp: <AiFillYoutube />,
    url: 'https://www.youtube.com/@herotoall/featured',
    htfUrl: 'https://www.youtube.com/@herotofew/featured'
  }
];

export default function FooterLinks() {
  const pathname = usePathname();
  const htf = pathname.includes('herotofew');

  return (
    <div className="flex items-center space-x-4 pt-4">
      {links.map((info: any, x: number) => {
        return (
          <Link
            key={x}
            href={!htf ? info.url : info.htfUrl}
            target="_blank"
            className="hover:text-white"
          >
            {info.comp}
          </Link>
        );
      })}
    </div>
  );
}
