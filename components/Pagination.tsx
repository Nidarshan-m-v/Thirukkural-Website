// components/Pagination.tsx
import { useRouter } from 'next/router';
interface PaginationProps {
  total: number;
  current: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ total, current, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(1)}
        className="px-2 py-1 text-gray-600 hover:text-black disabled:opacity-50"
        disabled={current === 1}
      >
        &laquo;
      </button>

      <button
        onClick={() => onPageChange(current - 1)}
        className="px-2 py-1 text-gray-600 hover:text-black disabled:opacity-50"
        disabled={current === 1}
      >
        &lsaquo;
      </button>

      <span className="px-3 py-1 rounded bg-gray-200 text-sm font-medium">
        {current} of {total}
      </span>

      <button
        onClick={() => onPageChange(current + 1)}
        className="px-2 py-1 text-gray-600 hover:text-black disabled:opacity-50"
        disabled={current === total}
      >
        &rsaquo;
      </button>

      <button
        onClick={() => onPageChange(total)}
        className="px-2 py-1 text-gray-600 hover:text-black disabled:opacity-50"
        disabled={current === total}
      >
        &raquo;
      </button>
    </div>
  );
}
