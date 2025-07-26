
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
        className="w-screen max-w-6xl mt-2 p-8 border-border/20 bg-card/95 backdrop-blur-md"
        align="center"
        sideOffset={10}
        onMouseLeave={() => setActiveCategory(categories[0])}
      >
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column: CTA */}
          <div className="col-span-4 pr-8">
            <h2 className="font-headline text-4xl font-bold text-foreground leading-tight">
              A evolução da sua carreira começa agora: cursos com início imediato
            </h2>
            <Button asChild size="lg" className="mt-8" onClick={() => setOpen(false)}>
              <Link href="/courses/all">
                Ver todos os cursos
              </Link>
            </Button>
          </div>

          {/* Middle Column: Categories */}
          <div className="col-span-3 border-l border-r border-border/10 px-8">
            <Link
              href="/courses/all"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-foreground font-semibold mb-4 transition-colors hover:text-primary"
            >
              Todos os cursos <ArrowRight className="h-4 w-4" />
            </Link>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onMouseEnter={() => setActiveCategory(category)}
                    className={cn(
                      "w-full text-left p-2 -mx-2 rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/50",
                      activeCategory === category && "font-semibold text-primary"
                    )}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Courses */}
          <div className="col-span-5">
            <div className="h-full flex flex-col">
              <ul className="space-y-4 flex-grow">
                {activeCourses.slice(0, 5).map(course => (
                   <li key={course.id} className="list-none">
                     <Link 
                       href={`/courses/${course.id}`} 
                       onClick={() => setOpen(false)}
                       className="block p-2 -m-2 rounded-md transition-colors hover:bg-muted/50 group"
                     >
                       <p className="font-medium text-foreground group-hover:text-primary transition-colors">{course.title}</p>
                     </Link>
                   </li>
                ))}
              </ul>
              {activeCourses.length > 5 && (
                 <Link
                    href={`/courses/all?category=${encodeURIComponent(activeCategory)}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center text-sm font-semibold text-primary rounded-lg transition-colors hover:underline mt-4 group"
                  >
                    Ver mais cursos de {activeCategory}
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
