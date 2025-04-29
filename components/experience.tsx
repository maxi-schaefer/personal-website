"use client";

import { Building2, Calendar, School2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { motion } from 'framer-motion';
import { experiences } from '../config.json'
import FloatingBubbles from "./ui/floatin-bubbles";

interface ExperienceItemProps {
    title: string;
    company: string;
    type?: string;
    period: string;
    description: string;
    technologies: string[];
}

const ExperienceItem = ({
    title,
    company,
    period,
    description,
    technologies,
    type
}: ExperienceItemProps ) => {
    return (
        <div className="relative pl-8 not-last:pb-12">
            {/* Timeline Line */}
            <div className="absolute left-0 top-2 5 h-full w-[2px] bg-fuchsia-400/20 group-first:h-[calc(100%-24px)] group-first:top-6">
                <div className="absolute h-3 w-3 -left-[5px] top-0 rounded-full border-2 border-fuchsia-400 bg-background" />
            </div>

            {/* Content */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 size-9 bg-accent rounded-full flex items-center justify-center">
                        {type === "school" ? (
                            <School2 className="size-5 text-muted-foreground" />
                        ) : (
                            <Building2 className="size-5 text-muted-foreground" />
                        )}
                    </div>
                    <span className="text-lg font-semibold">{company}</span>
                </div>
                <div>
                    <h3 className="text-xl font-medium">{title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                        <Calendar className="size-4" />
                        <span>{period}</span>
                    </div>
                </div>

                <p className="text-muted-foreground">{description}</p>

                <div className="flex flex-wrap gap-2">
                    {
                        technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="rounded-full">
                                {tech}
                            </Badge>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

const Experience = () => {
  
    return (
      <motion.section id="experience" className="relative py-20 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <FloatingBubbles />
        <div className="max-w-screen-md mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Experience
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Professional Journey
            </h2>
            <p className="text-muted-foreground mt-2 sm:mt-4 text-lg">
              A timeline of my professional growth and key achievements
            </p>
          </div>
  
          <div className="relative">
            {experiences.map((experience, index) => (
              <ExperienceItem key={index} {...experience} />
            ))}
          </div>
        </div>
      </motion.section>
    );
};
  
export default Experience;    