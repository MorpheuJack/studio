import React from 'react';
import { getAllPrompts } from '@/lib/prompts';
import { PromptCard } from '@/components/prompts/PromptCard';
import { PromptFilters } from '@/components/prompts/PromptFilters';

export default function PromptLibraryPage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    category?: string;
  };
}) {
  const allPrompts = getAllPrompts();
  const searchTerm = searchParams?.q || '';
  const category = searchParams?.category || 'All';

  const filteredPrompts = allPrompts.filter(prompt => {
    const matchesCategory = category === 'All' || prompt.category === category;
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
           prompt.prompt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const categories = ['All', ...new Set(allPrompts.map(p => p.category))];
  
  const displayCategories = categories.map(cat => {
    return {
      value: cat,
      label: cat === 'All' ? 'Todas as Categorias' : cat
    };
  });
  
  return (
    <div className="container mx-auto px-4 pb-8 pt-22 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Biblioteca de Prompts
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          O arsenal para o artesão do pensamento. Prompts testados em batalha para forçar, desafiar e comandar a IA.
        </p>
      </div>
      
      <PromptFilters 
        categories={displayCategories}
        initialCategory={category}
        initialSearch={searchTerm}
      />

      {filteredPrompts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">Nenhum prompt encontrado com seus critérios de busca.</p>
        </div>
      )}
    </div>
  );
}
