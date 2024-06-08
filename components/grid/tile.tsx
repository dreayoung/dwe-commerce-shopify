import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    status: boolean;
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        'group flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg',
        {
          relative: label,
          'border-2 border-black': active,
          'border-neutral-200': !active
        }
      )}
    >
      {/* {!label ? (
          <span className="absolute inset-2 bg-zinc-900 text-zinc-400">Sold Out</span>
        ) : null} */}
      {props.src ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
        <Image
          className={clsx('h-full w-full object-cover', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
          })}
          {...props}
        />
      ) : null}
    </div>
  );
}
