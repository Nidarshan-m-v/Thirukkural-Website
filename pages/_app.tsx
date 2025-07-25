// pages/_app.tsx
import "../styles/global.css";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);
  return (
    <LanguageProvider>
      <Navbar />
      {/* add pt-[navbar-height] to push content below fixed navbar */}
      <div className="pt-20">
        <Component {...pageProps} />
      </div>
    </LanguageProvider>
  );
}
