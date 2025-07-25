// pages/chapters/index.tsx
import { useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import axios from 'axios';
import ChapterCard from '@/components/ChapterCard';

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

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chapters`)
      .then(res => {
        setChapters(res.data);
        setFilteredChapters(res.data);

        // Fetch kural count for each chapter
        res.data.forEach((chapter: Chapter) => {
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chapter/${chapter.c_id}/count`)
            .then(res => {
              setChapterCounts(prev => ({ ...prev, [chapter.c_id]: res.data.count }));
            });
        });
      })
      .catch(err => console.error('Error fetching chapters:', err));
  }, []);

  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const results = chapters.filter((chapter) =>
      (language === 'ta' ? chapter.chapter_tamil : chapter.chapter_english)
        .toLowerCase()
        .includes(lowerQuery)
    );
    setFilteredChapters(results);
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-red-800 mb-6">
        {translations.nav_chapters[language]}
      </h1>

      <div className="sticky top-0 z-10 bg-white py-4">
        <SearchBar
          onSearch={handleSearch}
          placeholder={translations.search_chapter[language]}
        />
      </div>

      {/* Scrollable section */}
      <div className="h-[70vh] overflow-y-auto mt-4 space-y-4 pr-2">
        {filteredChapters.length > 0 ? (
          filteredChapters.map((chapter) => (
            <div key={chapter.c_id} className="flex items-start gap-4 w-full">
              {/* Chapter Number */}
              <div className="min-w-[30px] text-lg font-bold text-red-600 pt-3">
                {chapter.c_id}.
              </div>
              {/* Chapter Card */}
              <div className="flex-1">
                <ChapterCard
                  c_id={chapter.c_id}
                  title={language === 'ta' ? chapter.chapter_tamil : chapter.chapter_english}
                  kuralCount={chapterCounts[chapter.c_id]}
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
