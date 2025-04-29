import About from '@/components/about'
import Experience from '@/components/experience'
import Hero from '@/components/hero'
import Projects from '@/components/projects'
import AnimatedTitle from '@/components/ui/animated-title'
import React from 'react'

export default function page() {
  return (
    <div className="space-y-10 sm:space-y-16">
      {/* Title */}
      <AnimatedTitle text='Vibing • Maxi Schäfer • ' time={1000} />

      {/* Hero */}
      <Hero />

      {/* About */}
      <About />

      {/* Experience */}
      <Experience />

      {/* Projects */}
      <Projects />

    </div>
  )
}
