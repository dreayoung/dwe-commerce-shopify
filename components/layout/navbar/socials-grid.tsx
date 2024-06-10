'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillInstagram, AiFillYoutube, AiOutlineTwitter } from 'react-icons/ai';
import { FaTiktok } from 'react-icons/fa';
const { SITE_NAME, INSTAGRAM_URL, TIKTOK_URL, YOUTUBE_URL } = process.env;

export default function Socials() {
  const pathname = usePathname();

  const links = [
    {
      comp: <AiFillInstagram />,
      url: INSTAGRAM_URL,
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

  return (
    <div className="hidden grid-cols-2 gap-2 text-sm md:grid md:text-lg">
      {links.map((social, x) => {
        const { comp, url, htfUrl } = social;
        const pageUrl = pathname == '/collectibles/herotofew' ? htfUrl : url;
        return (
          <Link href={pageUrl || ''} target="_blank" key={x}>
            {comp}
          </Link>
        );
      })}
    </div>
  );
}
