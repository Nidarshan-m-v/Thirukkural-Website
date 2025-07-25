import { useRouter } from 'next/router';

interface PaginationProps {
  total: number;
  current: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ total, current, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-3 mt-8">
      {/* First Page */}
      <button
        onClick={() => onPageChange(1)}
        className="px-3 py-2 text-xl hover:text-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={current === 1}
      >
        &laquo;
      </button>

      {/* Previous Page */}
      <button
        onClick={() => onPageChange(current - 1)}
        className="px-3 py-2 text-xl hover:text-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={current === 1}
      >
        &lsaquo;
      </button>

      {/* Page Indicator */}
      <span className="px-3 py-1 rounded text-gray-200 bg-black text-m font-medium">
        {current} of {total}
      </span>

      {/* Next Page */}
      <button
        onClick={() => onPageChange(current + 1)}
        className="px-3 py-2 text-xl hover:text-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={current === total}
      >
        &rsaquo;
      </button>

      {/* Last Page */}
      <button
        onClick={() => onPageChange(total)}
        className="px-3 py-2 text-xl hover:text-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={current === total}
      >
        &raquo;
      </button>
    </div>
  );
}
