"use client";
import React, { useState, useMemo } from 'react';
import { CourseCard } from '@/components/courses/CourseCard';
import { courses } from '@/lib/courses';
import type { Course } from '@/lib/courses';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(courses.map(c => c.category))], []);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesCategory = category === 'All' || course.category === category;
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, category]);
  
  const displayCategories = useMemo(() => {
    const translatedCategories: { [key: string]: string } = {
      'All': 'Todos',
      'Programming': 'Programação',
      'Design': 'Design',
      'Marketing': 'Marketing'
    };
    return categories.map(cat => ({
      value: cat,
      label: translatedCategories[cat] || cat
    }));
  }, [categories]);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Catálogo de Cursos</h1>
        <p className="mt-4 text-lg text-muted-foreground">Encontre sua próxima aventura de aprendizado. Pesquise e filtre nossos cursos para começar.</p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar cursos..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-[220px]">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {displayCategories.map(cat => (
              <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
