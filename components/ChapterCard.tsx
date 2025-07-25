// components/ChapterCard.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface ChapterCardProps {
  c_id: number;
  title: string;
  kuralCount?: number;
  startKural?: number;
  endKural?: number;
}

export default function ChapterCard({
  c_id,
  title,
  kuralCount,
  startKural,
  endKural,
}: ChapterCardProps) {
  const router = useRouter();
  const [firstKural, setFirstKural] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/chapter/${c_id}/start`)
      .then((res) => {
        setFirstKural(res.data.first_kural_number);
      })
      .catch((err) => {
        console.error("Error fetching first kural number:", err);
        setFirstKural(startKural ?? 1); // fallback
      });
  }, [c_id, startKural]);

  const handleClick = () => {
    if (firstKural) {
      router.push(`/chapters/${c_id}/${firstKural}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden w-full cursor-pointer"
    >
      <div className="bg-yellow-100 px-6 py-4">
        <h2 className="text-xl font-bold text-red-700">{title}</h2>
      </div>
      <div className="px-6 py-4 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span>
            {kuralCount !== undefined
              ? `${kuralCount} Kurals`
              : "Kurals loading..."}
          </span>
          {startKural !== undefined && endKural !== undefined && (
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
              {startKural} - {endKural}
            </span>
          )}
        </div>
        <button className="bg-gray-900 text-white px-4 py-1 rounded-lg text-sm hover:bg-gray-700 transition">
          View
        </button>
      </div>
    </div>
  );
}
