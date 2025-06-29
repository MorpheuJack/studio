'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface BlogFiltersProps {
  categories: { value: string; label: string }[];
  initialSearch: string;
  initialCategory: string;
}

export function BlogFilters({ categories, initialSearch, initialCategory }: BlogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    const handler = setTimeout(() => {
        const params = new URLSearchParams();
        if (searchTerm) {
            params.set('q', searchTerm);
        }
        if (category && category !== 'All') {
            params.set('category', category);
        } else {
            params.delete('category');
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, category, pathname, router]);

  return (
    <div className="mb-12 flex flex-col gap-4 sm:flex-row max-w-3xl mx-auto">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar ideias..."
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
          {categories.map(cat => (
            <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
