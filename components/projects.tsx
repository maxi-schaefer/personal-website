"use client";

import React from 'react'
import { Badge } from './ui/badge';
import { projects } from '../config.json';
import { ExternalLink, Github, } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';
import { motion } from 'framer-motion'
import FloatingBubbles from './ui/floatin-bubbles';

interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
}

function ProjectCard({ title, description, image, technologies, liveUrl, githubUrl }: ProjectCardProps) {
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-xl border border-accent transisiton-all hover:border-fuchsia-400/50">
            {/* Project Image */}
            <div className="relative h-64 overflow-hidden bg-accent">
                <Image
                    src={image}
                    alt={title}
                    className='object-cover transition-transform duration-300 group-hover:scale-105'                
                    fill
                />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col p-6">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground mb-4">{description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className='rounded-full'>
                            {tech}
                        </Badge>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-auto">
                {liveUrl && (
                    <Button variant="default" className="rounded-full bg-fuchsia-400 hover:bg-fuchsia-500" asChild>
                    <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1 h-4 w-4" />
                        Live Demo
                    </a>
                    </Button>
                )}
                {githubUrl && (
                    <Button
                    variant="outline"
                    className="rounded-full shadow-none"
                    asChild
                    >
                    <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-1 h-4 w-4" />
                        View Code
                    </a>
                    </Button>
                )}
                </div>
            </div>
        </div>
    )
}

export default function Projects() {
    return(
        <motion.section id="projects" className='relative py-20 px-6'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
        >
            <FloatingBubbles />
            <div className="max-w-screen-xl mx-auto">
                <div className="text-center mb-12">
                    <Badge variant={'secondary'} className='mb-4'>
                        Projects
                    </Badge>
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                        Featured Work
                    </h2>
                    <p className="text-muted-foreground mt-2 sm:mt-4 text-lg">
                        Showcasing some of my best projects and technical achievments
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {projects.map((project, index) => (
                        <ProjectCard key={index}  {...project}/>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}