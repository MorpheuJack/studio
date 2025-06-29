import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';

export interface Project {
    id: string;
    title: string;
    author: string;
    authorAvatar: string;
    image: string;
    'data-ai-hint'?: string;
    description: string;
    tags: string[];
    projectUrl: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 bg-card border border-border hover:border-primary/50 hover:-translate-y-1 group">
      <CardHeader className="p-0">
        <Link href={project.projectUrl} className="block relative h-56 w-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={project['data-ai-hint']}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-3 right-3 flex items-center gap-2 rounded-full bg-background/70 px-2 py-1 text-xs font-semibold text-foreground backdrop-blur-sm opacity-0 transition-all duration-300 group-hover:opacity-100">
              Ver projeto
              <ArrowUpRight className="h-3 w-3" />
            </div>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-6">
        <h3 className="font-headline text-xl font-semibold leading-tight text-foreground">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground flex-1">{project.description}</p>
      </CardContent>
      <CardFooter className="flex items-start justify-between p-6 pt-0">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={project.authorAvatar} alt={project.author} />
            <AvatarFallback>{project.author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{project.author}</p>
            <p className="text-xs text-muted-foreground">Aluno(a)</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 max-w-[50%] justify-end">
            {project.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary">
                {tag}
                </Badge>
            ))}
        </div>
      </CardFooter>
    </Card>
  );
}
