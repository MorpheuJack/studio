
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { courses } from '@/lib/courses';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export function MegaMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const categories = [...new Set(courses.map(course => course.category))];
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const coursesByCategory = courses.reduce((acc, course) => {
    if (!acc[course.category]) {
      acc[course.category] = [];
    }
    acc[course.category].push(course);
    return acc;
  }, {} as Record<string, typeof courses>);
  
  const activeCourses = coursesByCategory[activeCategory] || [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "gap-1 transition-colors hover:text-primary",
            pathname.startsWith('/courses') ? "text-primary font-semibold" : "text-muted-foreground"
          )}
        >
          Cursos
          <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-screen max-w-4xl mt-2 p-8 border-border/20 bg-card/95 backdrop-blur-md"
        align="center"
        sideOffset={10}
        onMouseLeave={() => setActiveCategory(categories[0])}
      >
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column: CTA */}
          <div className="col-span-4 pr-8">
            <h2 className="font-headline text-3xl font-bold text-foreground leading-tight">
              Sua jornada para a maestria começa aqui
            </h2>
            <p className="mt-2 text-muted-foreground">
              Explore cursos desenhados não para informar, mas para forjar o seu pensamento.
            </p>
            <Button asChild size="lg" className="mt-6" onClick={() => setOpen(false)}>
              <Link href="/courses/all">
                Ver todas as jornadas
              </Link>
            </Button>
          </div>

          {/* Middle Column: Categories */}
          <div className="col-span-3 border-l border-r border-border/10 px-8">
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/courses/all?category=${encodeURIComponent(category)}`}
                    onMouseEnter={() => setActiveCategory(category)}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex w-full items-center justify-between text-left p-2 -mx-2 rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/50",
                      activeCategory === category && "font-semibold text-primary"
                    )}
                  >
                    <span>{category}</span>
                    <ArrowRight className={cn("h-4 w-4 transition-opacity", activeCategory === category ? 'opacity-100' : 'opacity-0')} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Courses */}
          <div className="col-span-5">
            <div className="h-full flex flex-col">
              <ul className="space-y-4 flex-grow">
                {activeCourses.slice(0, 4).map(course => (
                   <li key={course.id} className="list-none">
                     <Link 
                       href={`/courses/${course.id}`} 
                       onClick={() => setOpen(false)}
                       className="block p-2 -m-2 rounded-md transition-colors hover:bg-muted/50 group"
                     >
                       <p className="font-medium text-foreground group-hover:text-primary transition-colors">{course.title}</p>
                       <p className="text-sm text-muted-foreground line-clamp-1">{course.description}</p>
                     </Link>
                   </li>
                ))}
              </ul>
              {activeCourses.length > 4 && (
                 <Link
                    href={`/courses/all?category=${encodeURIComponent(activeCategory)}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center text-sm font-semibold text-primary rounded-lg transition-colors hover:underline mt-4 group"
                  >
                    Ver mais de {activeCategory}
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
              )}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
