import clsx from 'clsx';

function Grid(props: React.ComponentProps<'ul'>) {
  return (
    <ul
      {...props}
      className="mt-8 grid grid-flow-dense grid-cols-2 place-items-center gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4"
    >
      {props.children}
    </ul>
  );
}

function GridItem(props: React.ComponentProps<'li'>) {
  return (
    <li {...props} className={clsx('transition-opacity', props.className)}>
      {props.children}
    </li>
  );
}

Grid.Item = GridItem;

export default Grid;
