import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import axios from "axios";
import ChapterCard from "@/components/ChapterCard";

interface Chapter {
  c_id: number;
  chapter_tamil: string;
  chapter_english: string;
}

export default function ChapterList() {
  const { language } = useLanguage();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [filteredChapters, setFilteredChapters] = useState<Chapter[]>([]);
  const [chapterCounts, setChapterCounts] = useState<{ [key: number]: number }>({});
  const [chapterRange, setChapterRange] = useState<{ [key: number]: { start: number; end: number } }>({});

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chapters`);
        const chaptersData = res.data;
        setChapters(chaptersData);
        setFilteredChapters(chaptersData);

        const counts: { [key: number]: number } = {};
        const range: { [key: number]: { start: number; end: number } } = {};
        let currentStart = 1;

        for (const chapter of chaptersData) {
          const countRes = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/chapter/${chapter.c_id}/count`
          );
          const count = countRes.data.count;
          counts[chapter.c_id] = count;

          range[chapter.c_id] = {
            start: currentStart,
            end: currentStart + count - 1,
          };

          currentStart += count;
        }

        setChapterCounts(counts);
        setChapterRange(range);
      } catch (err) {
        console.error("Error fetching chapters or counts:", err);
      }
    };

    fetchChapters();
  }, []);

  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const results = chapters.filter((chapter) =>
      (language === "ta" ? chapter.chapter_tamil : chapter.chapter_english)
        .toLowerCase()
        .includes(lowerQuery)
    );
    setFilteredChapters(results);
  };

  return (
    <main className=" mt-15 max-w-5xl sm:mt-5 lg:mt-0 mx-auto px-4 py-10">
      <h1 className="text-2xl lg:text-3xl font-bold text-center text-red-800 mb-6">
        {translations.nav_chapters[language]}
      </h1>

      <div className="sticky top-0 z-10 bg-white py-4">
        <SearchBar
          onSearch={handleSearch}
          placeholder={translations.search_chapter[language]}
        />
      </div>

      <div className="h-[70vh] overflow-y-auto mt-4 space-y-4 pr-2">
        {filteredChapters.length > 0 ? (
          filteredChapters.map((chapter) => (
            <div key={chapter.c_id} className="flex items-start gap-4 w-full mb-5">
              <div className="min-w-[30px] text-lg font-bold text-red-600 pt-3">
                {chapter.c_id}.
              </div>
              <div className="flex-1">
                <ChapterCard
                  c_id={chapter.c_id}
                  title={
                    language === "ta"
                      ? chapter.chapter_tamil
                      : chapter.chapter_english
                  }
                  kuralCount={chapterCounts[chapter.c_id]}
                  startKural={chapterRange[chapter.c_id]?.start}
                  endKural={chapterRange[chapter.c_id]?.end}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No results found</p>
        )}
      </div>
    </main>
  );
}
