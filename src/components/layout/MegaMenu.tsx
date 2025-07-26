
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { courses } from '@/lib/courses';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Separator } from '../ui/separator';

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
        className="w-screen max-w-4xl p-0 mt-2"
        align="center"
        sideOffset={10}
        onMouseLeave={() => setActiveCategory(categories[0])}
      >
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Left Column: Categories */}
          <div className="p-6 pr-4 border-r border-border/10">
            <Link
              href="/courses/all"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between p-3 -m-3 mb-2 font-semibold text-foreground rounded-lg transition-colors hover:bg-muted/50 group"
            >
              Todos os cursos
              <ArrowRight className="h-4 w-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
            <ul className="space-y-1">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onMouseEnter={() => setActiveCategory(category)}
                    className={cn(
                      "w-full text-left p-3 -mx-3 rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/50",
                      activeCategory === category && "text-foreground font-medium bg-muted/50"
                    )}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Courses */}
          <div className="p-6 md:col-span-2">
            <h3 className="font-headline text-lg font-semibold text-foreground mb-4">{activeCategory}</h3>
             <ul className="space-y-4">
                {(coursesByCategory[activeCategory] || []).slice(0, 5).map(course => (
                   <li key={course.id}>
                     <Link 
                       href={`/courses/${course.id}`} 
                       onClick={() => setOpen(false)}
                       className="block p-3 -m-3 rounded-lg transition-colors hover:bg-muted/50 group"
                     >
                       <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{course.title}</p>
                       <p className="text-sm text-muted-foreground line-clamp-1">{course.description}</p>
                     </Link>
                   </li>
                ))}
             </ul>
             {(coursesByCategory[activeCategory] || []).length > 5 && (
                <>
                  <Separator className="my-4" />
                  <Link
                    href={`/courses/all?category=${encodeURIComponent(activeCategory)}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between p-3 -m-3 font-semibold text-primary rounded-lg transition-colors hover:bg-muted/50 group"
                  >
                    Ver todos em {activeCategory}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </>
             )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
