"use client";

import React, { RefObject } from "react";
import ProjectCard from "../ui/project-card";
import { projects } from '@/config.json'

export default function ProjectsSection({
  sectionsRef,
}: {
  sectionsRef: RefObject<(HTMLElement | null)[]>;
}) {
  return (
    <section
      id="work"
      ref={(el) => {
        sectionsRef.current[1] = el;
      }}
      className="min-h-screen py-20 sm:py-32 opacity-1 sm:opacity-0 mx-auto"
    >
      <div className="space-y-12">
        <h2 className="text-3xl sm:text-4xl font-light">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              description={project.description}
              image={project.image}
              technologies={project.tags}
              title={project.title}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
