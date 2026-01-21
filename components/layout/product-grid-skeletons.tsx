'use client';

import Grid from 'components/grid';

export default function ProductGridSkeleton({ items = 12 }: { items?: number }) {
  return (
    <>
      {[...Array(items)].map((_, index) => (
        <Grid.Item key={index} className="animate-pulse">
          {/* aspect-square is the most important class here */}
          <div className="relative aspect-square h-full w-full overflow-hidden rounded-xl border border-white/5 bg-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

            {/* Bottom Label Placeholder */}
            <div className="absolute bottom-0 left-0 w-full p-2">
              <div className="h-10 w-full rounded-full border border-white/10 bg-black/20 backdrop-blur-md" />
            </div>
          </div>
        </Grid.Item>
      ))}
    </>
  );
}
