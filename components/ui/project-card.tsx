import Image from "next/image";
import { Badge } from "./badge";
import { Button } from "./button";
import { ExternalLink, Github, MoreHorizontal } from "lucide-react";
import { MagicCard } from "../magicui/magic-card";
import { useTheme } from "next-themes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { Tilt } from "./tilt";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  url?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  technologies,
  url,
}: ProjectCardProps) {
  const { theme } = useTheme();

  return (
    <Tilt rotationFactor={6}>
      <Link href={url ? url : "#"}>
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          key={title}
          gradientSize={200}
          className="group relative flex flex-col overflow-hidden rounded-xl h-full"
        >
          {/* Project Image */}
          <div className="relative h-64 overflow-hidden bg-accent/20">
            <Image
              src={image}
              alt={title}
              className="object-cover rounded-xl transition-transform duration-300 scale-90 group-hover:scale-95"
              fill
            />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-6">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground mb-4">{description}</p>

            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="rounded-full">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </MagicCard>
      </Link>
    </Tilt>
  );
}
