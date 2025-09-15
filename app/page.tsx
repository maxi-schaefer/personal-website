"use client";

import { ScrollProgress } from "@/components/magicui/scroll-progress";
import ContactSection from "@/components/sections/connect";
import Footer from "@/components/sections/footer";
import HeroSection from "@/components/sections/hero";
import WorkSection from "@/components/sections/work";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("");
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section)
        
        if (section.getBoundingClientRect().top < window.innerHeight) {
          section.classList.add("animate-fade-in-up")
        }
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <ScrollProgress />
      <div className="min-h-screen bg-background text-foreground relative">
        <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
          <div className="flex flex-col gap-4">
            {
              ["hero", "work", "connect"].map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className={`w-1 h-8 rounded-xs transition-all duration-500 cursor-pointer ${
                    activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                  aria-label={`Navigate to ${section}`}
                >

                </button>
              ))
            }
          </div>
        </nav>
          
        <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16">
          <HeroSection sectionsRef={sectionsRef} />
          <WorkSection sectionsRef={sectionsRef} />
          <ContactSection sectionsRef={sectionsRef} />

          <Footer />
        </main>

        <div className="fixed bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
      </div>
    </>
  );
}
