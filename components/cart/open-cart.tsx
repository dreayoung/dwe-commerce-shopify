import clsx from 'clsx';
import { FaShoppingBag } from 'react-icons/fa';

export default function OpenCart({ className }: { className?: string }) {
  return (
    <div className="relative flex items-center justify-center transition-colors">
      <FaShoppingBag
        className={clsx('h-6 transition-all ease-in-out hover:scale-110 ', className)}
      />
    </div>
  );
}
