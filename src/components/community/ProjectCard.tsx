'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ProjectBase } from '@/lib/projects';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export type Project = ProjectBase & {
  author: string;
  authorAvatar: string;
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={project.projectUrl} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 bg-card border border-border hover:border-primary/50 hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              data-ai-hint={project['data-ai-hint']}
            />
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col p-6">
          <div className="flex-1">
            <h3 className="font-headline text-xl font-semibold leading-tight text-foreground">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
          </div>
          <div className="flex flex-wrap gap-2 pt-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-6 pt-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={project.authorAvatar} alt={project.author} />
              <AvatarFallback>{project.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium">{project.author}</p>
          </div>
          <div className="flex items-center text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Ver Projeto <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
