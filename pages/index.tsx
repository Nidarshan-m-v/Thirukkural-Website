// pages/index.tsx
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import Link from "next/link";

export default function Home() {
  const { language } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="mt-30 mb-30 aspect-[12/11] lg:relative w-full lg:mt-0 lg:aspect-[16/7] overflow-hidden lg:mb-10">
      
      <div className="mt-30 lg:mt-0 sm:mt-0 absolute inset-0">
        {/* Background Image */}
      <div className="p-10 sm:mt-0 lg:mt-0 absolute inset-0 bg-black bg-opacity-30" />
        
        <Image
          src="/thiruvalluvar_kanyakumari_3.jpg"
          alt="Thiruvalluvar Statue at Kanyakumari"
          fill
          className="lg:mt-0 sm:mt-0  object-cover object-top opacity-55"
          priority
        />
        </div>

        {/* Dark overlay */}

        {/* Hero text */}
        <div
          className="mt-20 mb-20 lg:absolute lg:mt-0 sm:mt-0 inset-0 flex flex-col justify-center items-center px-4 text-center text-white"
          data-aos="fade-down"
        >
          <h1 className="text-4xl sm:text-2xl md:text-6xl font-bold drop-shadow-lg ">
            {translations.home_title[language]}
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl drop-shadow">
            {translations.home_subtitle[language]}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main
        className="max-w-5xl mx-auto p-6 font-serif text-gray-800 space-y-10 mb-10"
        data-aos="fade-up"
      >
        <section className="text-center">
          <Link
            href="/chapters"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-lg shadow-md transition"
          >
            {translations.browse_chapters[language]}
          </Link>
        </section>

        <section className="bg-yellow-50 rounded-xl p-6 shadow-md text-justify leading-relaxed text-lg whitespace-pre-line">
          <h2 className="text-2xl font-semibold text-red-700 mb-3">
            {language === "ta"
              ? "திருக்குறளின் அறிமுகம்"
              : "Introduction to Thirukkural"}
          </h2>
          {translations.intro_text[language]}
        </section>
      </main>
    </>
  );
}
