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
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold text-center text-red-800">
        {translations.nav_chapters[language]}
      </h1>

      <SearchBar
        onSearch={handleSearch}
        placeholder={translations.search_chapter[language]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredChapters.length > 0 ? (
          filteredChapters.map((chapter) => (
            <ChapterCard
              key={chapter.c_id}
              c_id={chapter.c_id}
              title={language === 'ta' ? chapter.chapter_tamil : chapter.chapter_english}
              kuralCount={chapterCounts[chapter.c_id]}
            />
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            {translations.no_results[language] || 'No results found'}
          </p>
        )}
      </div>
    </main>
  );
}
