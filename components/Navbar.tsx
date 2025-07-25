// components/NavBar.tsx
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import '@/styles/ToggleSwitch.css';

export default function Navbar() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-amber-200 via-orange-100 to-yellow-200 shadow-md py-4 z-50 sm:h-hug">
      <div className="max-w-8xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <Link href="/" className="text-3xl font-bold text-red-800 drop-shadow sm:text-xl md:text-2xl ">
          {translations.home_title[language]}
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/chapters" className="text-center  text-red-700 lg:text-2xl hover:underline sm:text-xl md:text-xl">
            {translations.nav_chapters[language]}
          </Link>
          <Link href="/search" className="text-center  text-red-700 lg:text-2xl hover:underline sm:text-xl md:text-xl">
            {translations.nav_search[language]}
          </Link>
          <div className="flex text-white p-3 rounded-lg bg-red-950 items-center space-x-2 text-sm font-medium">
            <span>தமிழ்</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={language === 'en'}
                onChange={toggleLanguage}
                className="input"
                placeholder='na'
              />
              <span className="slider round"></span>
            </label>
            <span>English</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
