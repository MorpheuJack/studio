import React from 'react';
import { getAllPosts } from '@/lib/blog';
import { PostCard } from '@/components/blog/PostCard';
import { BlogFilters } from '@/components/blog/BlogFilters';
import { BlogHero } from '@/components/blog/BlogHero';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { NewsletterCta } from '@/components/blog/NewsletterCta';

export default function BlogPage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    category?: string;
  };
}) {
  const allPosts = getAllPosts();
  const searchTerm = searchParams?.q || '';
  const category = searchParams?.category || 'All';

  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = category === 'All' || post.category === category;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
           post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const categories = ['All', ...new Set(allPosts.map(p => p.category))];
  
  const displayCategories = categories.map(cat => {
    return {
      value: cat,
      label: cat === 'All' ? 'Todas' : cat
    };
  });
  
  return (
    <>
      <BlogHero />
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold text-foreground sm:text-4xl">
              {category === 'All' ? 'O Manifesto' : `Ideias sobre ${category}`}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Nossas ideias, visões e a crônica da revolução do conhecimento.
            </p>
        </div>
        
        <BlogFilters 
          categories={displayCategories}
          initialCategory={category}
          initialSearch={searchTerm}
        />

        {filteredPosts.length > 0 ? (
           <Carousel
              opts={{
                align: "start",
                loop: filteredPosts.length > 3,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {filteredPosts.map((post) => (
                  <CarouselItem key={post.slug} className="pl-4 basis-4/5 md:basis-1/2 lg:basis-1/3">
                    <PostCard post={post} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Nenhuma ideia encontrada com seus critérios.</p>
          </div>
        )}
      </div>
      <NewsletterCta />
    </>
  );
}
