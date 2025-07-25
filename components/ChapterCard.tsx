// components/ChapterCard.tsx
import Link from 'next/link';

interface ChapterCardProps {
  c_id: number;
  title: string;
  kuralCount?: number;
}

export default function ChapterCard({ c_id, title, kuralCount }: ChapterCardProps) {
  return (
    <Link href={`/chapters/${c_id}/1`}>
      <div className="w-full bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
        <div className="bg-yellow-100 px-6 py-4">
          <h2 className="text-xl font-bold text-red-700">{title}</h2>
        </div>
        <div className="px-6 py-4 flex items-center justify-between text-sm text-gray-600">
          <span>{kuralCount !== undefined ? `${kuralCount} Kurals` : 'Kurals loading...'}</span>
          <button className="bg-gray-900 text-white px-4 py-1 rounded-lg text-sm hover:bg-gray-700 transition">
            View
          </button>
        </div>
      </div>
    </Link>
  );
}
