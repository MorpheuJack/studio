
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEnrollment } from '@/context/EnrollmentContext';
import { getProjectsForCourses } from '@/lib/projects';
import { ProjectCard, type Project } from '@/components/community/ProjectCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2, Flame, BookOpen, Wrench, ArrowRight } from 'lucide-react';
import { CourseCard } from '@/components/courses/CourseCard';
import { Separator } from '@/components/ui/separator';
import { courses as allCourses } from '@/lib/courses';
import { Progress } from '@/components/ui/progress';

const StatCard = ({ icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) => {
  const Icon = icon;
  return (
    <div className="bg-card/50 border border-white/10 rounded-xl p-6 flex items-center gap-4">
      <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
      </div>
      <div>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
};


export default function MyCoursesPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const { enrolledCourses } = useEnrollment();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, loading, router]);
  
  const enrolledCourseData = allCourses.filter(course => enrolledCourses.has(course.id));
  const projects = getProjectsForCourses(enrolledCourses);

  // Enrich project data with author info to match ProjectCard's expected props
  const userProjects: Project[] = projects.map(project => ({
    ...project,
    author: user?.user_metadata?.full_name || 'MorpheuJack',
    authorAvatar: user?.user_metadata?.avatar_url || 'https://placehold.co/100x100.png',
  }));
  
  const totalSkills = enrolledCourseData.reduce((acc, course) => acc + course.tools.length, 0);

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
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">Sua central de comando na Revolução Cognitiva. Acompanhe sua jornada, forje suas criações e domine novas habilidades.</p>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <StatCard icon={BookOpen} label="Jornadas Ativas" value={enrolledCourses.size} />
          <StatCard icon={Flame} label="Criações na Forja" value={userProjects.length} />
          <StatCard icon={Wrench} label="Habilidades Adquiridas" value={totalSkills} />
      </div>


      {enrolledCourseData.length > 0 ? (
        <div className="space-y-16">
          {/* Active Journeys */}
          <section>
             <h2 className="font-headline text-3xl font-bold text-foreground mb-8">Jornadas Ativas</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {enrolledCourseData.map(course => (
                  <div key={course.id} className="bg-card border border-border rounded-lg p-4 flex flex-col gap-4">
                     <CourseCard course={course} />
                     <div className="px-2">
                        <Progress value={33} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-2">33% completo</p>
                     </div>
                  </div>
                ))}
             </div>
          </section>

          {/* Mastered Proofs */}
          {userProjects.length > 0 && (
             <section>
                <Separator className="my-12" />
                <h2 className="font-headline text-3xl font-bold text-foreground mb-8">Prova de Maestria</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {userProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </section>
          )}

        </div>
      ) : (
        <div className="text-center rounded-lg border-2 border-dashed border-border p-12 flex flex-col items-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6">
              <Flame className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-headline font-bold text-foreground">Sua Forja Aguarda a Primeira Faísca</h3>
            <p className="mt-2 text-muted-foreground max-w-lg">A maestria é uma jornada de construção. Cada curso é uma nova ferramenta, cada projeto uma nova criação. Escolha sua primeira jornada e comece a forjar seu legado.</p>
            <Button asChild className="mt-8" size="lg">
              <Link href="/courses/all">
                Explorar Todas as Jornadas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
        </div>
      )}
    </div>
  );
}
