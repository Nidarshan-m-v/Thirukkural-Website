import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import { translations } from '@/lib/translations';
import { useLanguage } from '@/context/LanguageContext';

interface KuralData {
  kural_number: number;
  kural_tamil: string[];
  kural_english: string[];
  meaning_tamil: string;
  meaning_english: string;
}

interface ChapterData {
  chapter_tamil: string;
  chapter_english: string;
}

export default function KuralDetailPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const { id, kuralNumber } = router.query;

  const [kuralData, setKuralData] = useState<KuralData | null>(null);
  const [chapterData, setChapterData] = useState<ChapterData | null>(null);
  const [totalKurals, setTotalKurals] = useState<number>(0);

  const currentKural = Number(kuralNumber);

  const handlePageChange = (newKuralNum: number) => {
    router.push(`/chapters/${id}/${newKuralNum}`);
  };

  // Fetch current Kural
  useEffect(() => {
    if (id && kuralNumber) {
      axios
        .get(`http://localhost:8000/chapter/${id}/kural/${kuralNumber}`)
        .then((res) => setKuralData(res.data))
        .catch((err) => console.error(err));
    }
  }, [id, kuralNumber]);

  // Fetch total kurals in chapter
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/chapter/${id}/count`)
        .then((res) => setTotalKurals(res.data.count))
        .catch((err) => console.error("Error fetching count:", err));
    }
  }, [id]);

  // Fetch chapter name
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/chapters/${id}`)
        .then((res) => setChapterData(res.data))
        .catch((err) => console.error("Error fetching chapter:", err));
    }
  }, [id]);

  if (!kuralData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header: Back button + Chapter title centered */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Back Button */}
        <Link href="/chapters">
          <button className="text-m font-bold bg-white hover:bg-blue-950 hover:text-white px-4 py-2 rounded-lg border text-gray-700 shadow-sm">
            ← {translations.back_button[language]}
          </button>
        </Link>

        {/* Chapter Title */}
        {chapterData && (
          <div className="flex-1 text-center">
            <h1 className="text-2xl sm:text-3xl text-red-800 font-bold">
              {chapterData.chapter_tamil}
            </h1>
            <p className="text-base text-gray-600 mt-1">
              ({chapterData.chapter_english})
            </p>
          </div>
        )}

        {/* Placeholder for alignment */}
        <div className="w-[130px] hidden sm:block" />
      </div>

      {/* Pagination */}
      <Pagination
        total={totalKurals}
        current={currentKural}
        onPageChange={handlePageChange}
      />

      {/* Tamil Card */}
      <div className="bg-red-900 p-9 rounded-2xl shadow-md border">
        <h2 className="text-4xl font-semibold mb-4 text-yellow-300">தமிழ்</h2>
        <p className="text-2xl text-white">{kuralData.kural_tamil[0]}</p>
        <p className="text-2xl text-white mb-5">{kuralData.kural_tamil[1]}</p>
        <p className="text-gray-200 italic">{kuralData.meaning_tamil}</p>
      </div>

      {/* English Card */}
      <div className="bg-blue-900 p-9 rounded-2xl shadow-md border">
        <h2 className="text-4xl font-semibold mb-4 text-gray-800">English</h2>
        <p className="text-2xl text-white">{kuralData.kural_english[0]}</p>
        <p className="text-2xl text-white mb-5">{kuralData.kural_english[1]}</p>
        <p className="text-gray-200 italic">{kuralData.meaning_english}</p>
      </div>
    </div>
  );
}
