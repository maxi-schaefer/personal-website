"use client";

import React from 'react'
import AnimatedGridPattern from './ui/animated-grid-pattern'
import { cn } from '@/lib/utils'
import { CircleArrowDown, Zap } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <motion.section id="home"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
    >

        <div className="relative min-h-screen flex items-center justify-center px-6 pt-6 overflow-hidden">
            {/* Animted Grid Pattern as a nice Background */}
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.3}
                duration={3}
                className={cn(
                "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                "inset-x-0 h-full skew-y-12"
                )}
            />

            <div className="relative z-[1] text-center max-w-screen-md">
                {/* Badge TODO: Add animated Text */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                >
                    <Badge className='rounded-full bg-fuchsia-400'>
                        <Zap className='fill-current' />
                        Fullstack Web Developer
                    </Badge>
                </motion.div>

                {/* Headline */}
                <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
                    Building Scalable & Engaging Web Experience
                </h1>

                {/* Description */}
                <p className="mt-6 text-[17px] md:text-lg">
                Hey, I&apos;m Max — a fullstack developer passionate about building sleek, scalable web experiences. 
                From beautiful frontends to powerful backends, I turn ideas into reality with clean code and 
                smart design. Let&apos;s build something awesome! 🚀
                </p>

                {/* Down button */}
                <div className="mt-4 flex items-center justify-center gap-4">
                    <Link href="#projects">
                        <Button size="lg" className='rounded-full text-base'>
                            See what I do <CircleArrowDown className='ml-2 !h-5.5 !w-5.5' />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    </motion.section>
  )
}
