import { readFileSync } from 'fs';
import { ImageResponse } from 'next/og';
import { join } from 'path';
import LogoIcon from './icons/logo';

export type Props = {
  title?: string;
};

export default async function OpengraphImage(props?: Props): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: process.env.SITE_NAME
    },
    ...props
  };

  // 1. Read the font file directly from the filesystem
  // This avoids the Bun 'fetch not implemented' error
  const fontPath = join(process.cwd(), '/fonts/Inter-Bold.ttf');
  const fontData = readFileSync(fontPath);

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col items-center justify-center bg-black">
        <div tw="flex flex-none items-center justify-center border border-neutral-700 h-[160px] w-[160px] rounded-3xl">
          <LogoIcon width="64" height="58" />
        </div>
        <p tw="mt-12 text-6xl font-bold text-white">{title}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontData, // Use the buffer directly
          style: 'normal',
          weight: 700
        }
      ]
    }
  );
}
