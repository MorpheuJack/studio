
'use client';

import { useState } from 'react';
import { courses } from '@/lib/courses';
import type { Course } from '@/lib/courses';
import Link from 'next/link';
import { CourseCard } from '@/components/courses/CourseCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpenCheck, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CoursesPage() {
  const coursesByCategory = courses.reduce((acc, course) => {
    const { category } = course;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  const uniqueCategories = Object.keys(coursesByCategory);
  const displayCategories = ['Todos', ...uniqueCategories];
  
  const [activeCategory, setActiveCategory] = useState(displayCategories[0]);

  const activeCourses = activeCategory === 'Todos' 
    ? courses 
    : coursesByCategory[activeCategory] || [];

  return (
    <>
      <section className="relative bg-muted -mt-14 h-[500px] flex items-center justify-center text-center overflow-hidden border-b">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://placehold.co/1920x1080.png"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/video/video-t.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Ecossistema de Aprendizado do Futuro
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Navegue por nossas trilhas de conhecimento imersivas. Cada curso é um portal para dominar as tecnologias que moldarão o amanhã.
            </p>
          </div>
        </div>
      </section>
      
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Category Sidebar/Tabs */}
          <aside className="lg:w-1/4">
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center gap-3 mb-6">
                <SlidersHorizontal className="h-6 w-6 text-primary"/>
                <h2 className="font-headline text-2xl font-bold">Categorias</h2>
              </div>
              
              {/* Mobile: Horizontal scrollable tabs */}
              <div className="lg:hidden">
                <div className="flex flex-row gap-3 overflow-x-auto pb-4 hide-scrollbar">
                  {displayCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={cn(
                        'group shrink-0 whitespace-nowrap rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors duration-300',
                        activeCategory === category
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-transparent text-muted-foreground hover:bg-muted'
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop: Vertical list */}
              <nav className="hidden lg:flex lg:flex-col lg:gap-2">
                {displayCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      'group flex items-center gap-3 rounded-lg p-4 text-left text-lg font-semibold transition-all duration-300',
                      'border-l-4',
                      activeCategory === category
                        ? 'border-primary bg-primary/10 text-foreground shadow-inner'
                        : 'border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    )}
                  >
                    <span>{category}</span>
                    <ArrowRight className={cn(
                      "ml-auto h-5 w-5 transition-transform",
                      activeCategory === category ? "translate-x-0" : "-translate-x-1 group-hover:translate-x-0"
                    )}/>
                  </button>
                ))}
              </nav>

              <Button asChild variant="outline" className="mt-8 w-full hidden lg:flex">
                <Link href="/courses/all">
                  Ver Todos os Cursos
                </Link>
              </Button>
            </div>
          </aside>

          {/* Courses Grid */}
          <div className="flex-1 lg:w-3/4">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <BookOpenCheck className="h-8 w-8 text-primary"/>
                    <div>
                        <h2 className="font-headline text-3xl font-bold">{activeCategory === 'Todos' ? 'Todos os Cursos' : activeCategory}</h2>
                        <p className="text-muted-foreground">
                            {activeCourses.length} {activeCourses.length === 1 ? 'curso disponível' : 'cursos disponíveis'}
                        </p>
                    </div>
                </div>
                <Button asChild variant="link" className="hidden sm:inline-flex">
                  <Link href={activeCategory === 'Todos' ? '/courses/all' : `/courses/all?category=${encodeURIComponent(activeCategory)}`}>
                    {activeCategory === 'Todos' ? 'Explorar Todos' : 'Explorar Categoria'}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {activeCourses.map((course, index) => (
                <div key={course.id} style={{animationDelay: `${index * 100}ms`}} className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
