import { useRouter } from 'next/router';
import { start } from 'repl';

interface PaginationProps {
  total: number;
  current: number;
  onPageChange: (page: number) => void;
  endKuralNumber: number; // Optional prop for end kural number
  startKuralNumber: number; // Optional prop for start kural number
}

export default function Pagination({ total, current, onPageChange ,endKuralNumber,startKuralNumber}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-3 mt-8">
      {/* First Page */}
      <button
        onClick={() => onPageChange(startKuralNumber)}
        className="px-3 py-2 text-xl hover:text-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={current === startKuralNumber}
      >
        &laquo;
      </button>

      {/* Previous Page */}
      <button
        onClick={() => onPageChange(current - 1)}
        className="px-3 py-2 text-xl hover:text-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={current === startKuralNumber}
      >
        &lsaquo;
      </button>

      {/* Page Indicator */}
      <span className="px-3 py-1 rounded text-gray-200 bg-black text-m font-medium">
        {current} of {endKuralNumber}
      </span>

      {/* Next Page */}
      <button
        onClick={() => onPageChange(current + 1)}
        className="px-3 py-2 text-xl hover:text-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={current === endKuralNumber}
      >
        &rsaquo;
      </button>

      {/* Last Page */}
      <button
        onClick={() => onPageChange(endKuralNumber)}
        className="px-3 py-2 text-xl hover:text-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={current === endKuralNumber}
      >
        &raquo;
      </button>
    </div>
  );
}
