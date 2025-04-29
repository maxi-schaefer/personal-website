'use client';

import { cn } from '@/lib/utils';
import React, { HTMLAttributes, useEffect, useState } from 'react'
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Download, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import FloatingBubbles from './ui/floatin-bubbles';
import Link from 'next/link';
import { fetchGithubData } from '@/lib/githubApi';
import { githubId } from '../config.json'

export default function About() {
    const [githubData, setGithubData] = useState();

    useEffect(() => {
        const data = fetchGithubData(githubId);
        data.then((d) => setGithubData(d));
    }, []);

    const ProfileImage = ({
        className,
        ...props
      }: HTMLAttributes<HTMLDivElement>) => (
        <div className={cn("mt-10 w-48 h-48 md:w-64 md:h-64", className)} {...props}>
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-accent">
            <img src={githubData?.avatar_url } alt="" className="object-cover" />
          </div>
        </div>
    );

    return (
        <motion.section id="about" className='relative py-20 px-6' 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
        >
        <FloatingBubbles />
            <div className="max-w-screen-md mx-auto">
                
                <div className="flex flex-col md:flex-row-reverse gap-12">
                    {/* Github Profile */}
                    <ProfileImage className='hidden md:block' />

                    {/* Content */}
                    <div className="flex-1 md:text-left">
                        <Badge variant="secondary" className='mb-4'>
                            About Me
                        </Badge>

                        <ProfileImage className='mt-3 mb-8 block md:hidden' />
                        <h2 className="text-4xl font-bold mb-4 tracking-tight">
                            Passionate about creating impactful web-experiences
                        </h2>

                        <p className="text-muted-foreground mb-6 text-justify">
                            With over 4 years of experience in full-stack development, I
                            specialize in building scalable web applications using modern
                            technologies. My expertise includes React, Node.js, and Docker.
                            I&apos;m passionate about creating elegant solutions to complex
                            problems and sharing knowledge with the developer community.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-start">
                            <Link href="https://github.com/maxi-schaefer" target='_blank'>
                                <Button className="rounded-full">
                                    <Github />
                                    View Github
                                </Button>
                            </Link>
                            
                            {/* TODO: add CV */}
                            {/* <Button variant="outline" className="rounded-full">
                                <Download />
                                Download CV
                            </Button> */}
                        </div>
                    </div>
                </div>
            </div>

        </motion.section>
    )
}