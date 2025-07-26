
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDown, ArrowRight, BookOpen, PenTool, BarChart, BrainCircuit } from 'lucide-react';
import { courses } from '@/lib/courses';
import { getAllPosts } from '@/lib/blog';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Separator } from '../ui/separator';
import Image from 'next/image';

const categoryIcons: { [key: string]: React.ElementType } = {
  'IA': BrainCircuit,
  'Design': PenTool,
  'Marketing': BarChart,
  'Programação': BookOpen, // Default/fallback
};

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
  
  const featuredPosts = getAllPosts().slice(0, 2);

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
        className="w-screen max-w-5xl p-0 mt-2 border-border/20 bg-card/80 backdrop-blur-md"
        align="center"
        sideOffset={10}
        onMouseLeave={() => setActiveCategory(categories[0])}
      >
        <div className="grid grid-cols-4">
          {/* Left Column: Categories */}
          <div className="col-span-1 p-6 pr-4 border-r border-border/10">
            <h3 className="font-headline text-lg font-semibold text-foreground mb-4">Categorias</h3>
            <ul className="space-y-1">
              {categories.map((category) => {
                const Icon = categoryIcons[category] || BookOpen;
                return (
                  <li key={category}>
                    <button
                      onMouseEnter={() => setActiveCategory(category)}
                      className={cn(
                        "w-full text-left p-3 -mx-3 rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/50 flex items-center gap-3",
                        activeCategory === category && "text-primary font-medium bg-primary/10"
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span>{category}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Middle/Right Columns: Courses */}
          <div className="p-6 md:col-span-3">
             <div className="flex justify-between items-center mb-4">
                 <h3 className="font-headline text-lg font-semibold text-foreground">Jornadas em <span className="text-primary">{activeCategory}</span></h3>
                 <Link
                    href={`/courses/all?category=${encodeURIComponent(activeCategory)}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center text-sm font-semibold text-primary rounded-lg transition-colors hover:underline group"
                  >
                    Ver todos
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
             </div>
             <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {(coursesByCategory[activeCategory] || []).slice(0, 4).map(course => (
                   <li key={course.id} className="list-none">
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
             </div>
          </div>
        </div>
        
        {/* Footer section with featured posts */}
        <div className="bg-muted/30 p-6 border-t border-border/10">
            <div className="grid grid-cols-4 gap-6 items-center">
                <div className="col-span-1">
                    <h4 className="font-semibold text-foreground">Ideias da Forja</h4>
                    <p className="text-sm text-muted-foreground">Artigos e manifestos para expandir seu pensamento.</p>
                </div>
                <div className="col-span-3 grid grid-cols-2 gap-6">
                    {featuredPosts.map(post => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} onClick={() => setOpen(false)} className="group flex items-center gap-4 p-3 -m-3 rounded-lg transition-colors hover:bg-muted/80">
                           <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-border">
                               <Image
                                  src={post.image}
                                  alt={post.title}
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                                  data-ai-hint={post['data-ai-hint']}
                                />
                            </div>
                           <div>
                                <h5 className="font-semibold text-foreground text-sm line-clamp-2 transition-colors group-hover:text-primary">{post.title}</h5>
                                <p className="text-xs text-muted-foreground">{post.author}</p>
                           </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
