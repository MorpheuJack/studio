import React from 'react';
import { getAllPosts } from '@/lib/blog';
import { PostCard } from '@/components/blog/PostCard';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { BlogHero } from '@/components/blog/BlogHero';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function BlogPage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
  };
}) {
  const allPosts = getAllPosts();
  const searchTerm = searchParams?.q || '';

  const filteredPosts = allPosts.filter(post => {
    return post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
           post.content.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <BlogHero />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold text-foreground sm:text-4xl">
              Todos os Artigos
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Explore nossos insights mais recentes sobre IA, design, marketing e muito mais.
            </p>
        </div>
        
        <BlogSearch initialSearch={searchTerm} />

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
            <p className="text-muted-foreground">Nenhum artigo encontrado com seus critérios de busca.</p>
          </div>
        )}
      </div>
    </>
  );
}
