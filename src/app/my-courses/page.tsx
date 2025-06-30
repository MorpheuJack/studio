"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEnrollment } from '@/context/EnrollmentContext';
import { getProjectsForCourses } from '@/lib/projects';
import { ProjectCard, type Project } from '@/components/community/ProjectCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function MyCoursesPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const { enrolledCourses } = useEnrollment();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, loading, router]);
  
  const baseProjects = getProjectsForCourses(enrolledCourses);

  // Enrich project data with author info to match ProjectCard's expected props
  const userProjects: Project[] = baseProjects.map(project => ({
    ...project,
    author: 'MorpheuJack',
    // Using a placeholder for avatar image
    authorAvatar: 'https://placehold.co/100x100.png',
  }));

  if (loading || !isAuthenticated) {
    return (
      <div className="container mx-auto flex justify-center items-center min-h-[calc(100vh-12rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-8 pt-22 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Meu Estúdio</h1>
        <p className="mt-4 text-lg text-muted-foreground">Sua galeria de criações. A prova do seu domínio. Mostre ao mundo o que você forjou.</p>
      </div>

      {userProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {userProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center rounded-lg border border-white/10 bg-card/50 backdrop-blur-lg p-12">
            <h3 className="text-lg font-medium text-foreground">Sua Forja está Vazia</h3>
          <p className="mt-2 text-muted-foreground">A maestria começa com a primeira faísca. Inicie uma jornada e comece a construir.</p>
          <Button asChild className="mt-6">
            <Link href="/courses">
              Explorar Jornadas
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
