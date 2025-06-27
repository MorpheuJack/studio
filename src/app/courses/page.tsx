import React from 'react';
import { CourseCard } from '@/components/courses/CourseCard';
import { courses } from '@/lib/courses';
import type { Course } from '@/lib/courses';
import { CourseFilters } from '@/components/courses/CourseFilters';

export default function CoursesPage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    category?: string;
  };
}) {
  const searchTerm = searchParams?.q || '';
  const category = searchParams?.category || 'All';

  const filteredCourses = courses.filter(course => {
    const matchesCategory = category === 'All' || course.category === category;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const categories = ['All', ...new Set(courses.map(c => c.category))];
  
  const displayCategories = categories.map(cat => {
    const translatedCategories: { [key: string]: string } = {
      'All': 'Todos',
      'Programming': 'Programação',
      'Design': 'Design',
      'Marketing': 'Marketing'
    };
    return {
      value: cat,
      label: translatedCategories[cat] || cat
    };
  });

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Explore a Galáxia do Conhecimento</h1>
        <p className="mt-4 text-lg text-muted-foreground">Navegue por nossas constelações de cursos para encontrar sua próxima jornada de aprendizado.</p>
      </div>

      <CourseFilters 
        categories={displayCategories}
        initialCategory={category}
        initialSearch={searchTerm}
      />

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <p className="text-muted-foreground">Nenhum curso encontrado com seus critérios. Tente ajustar sua busca ou filtros.</p>
        </div>
      )}
    </div>
  );
}
