import React from 'react';
import { ProjectCard } from '@/components/community/ProjectCard';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';
import Link from 'next/link';

// Mock Data
const projects = [
  {
    id: 'p1',
    title: 'Assistente de Receitas com IA',
    author: 'Juliana Silva',
    authorAvatar: 'https://placehold.co/100x100.png',
    image: 'https://placehold.co/600x450.png',
    'data-ai-hint': 'cooking app interface',
    description: 'Um app que gera receitas personalizadas com base nos ingredientes que você tem em casa, usando a API do Gemini.',
    tags: ['Gemini', 'Next.js', 'IA'],
    projectUrl: '#',
  },
  {
    id: 'p2',
    title: 'Visualizador de Dados Climáticos',
    author: 'Carlos Andrade',
    authorAvatar: 'https://placehold.co/100x100.png',
    image: 'https://placehold.co/600x450.png',
    'data-ai-hint': 'weather data dashboard',
    description: 'Dashboard interativo que mostra dados históricos e previsões do tempo, construído com React e D3.js.',
    tags: ['React', 'D3.js', 'Data Viz'],
    projectUrl: '#',
  },
  {
    id: 'p3',
    title: 'Demoreel de Animação 3D',
    author: 'Beatriz Costa',
    authorAvatar: 'https://placehold.co/100x100.png',
    image: 'https://placehold.co/600x450.png',
    'data-ai-hint': '3d character animation',
    description: 'Uma compilação dos meus melhores trabalhos de animação de personagens e motion graphics feitos no Blender.',
    tags: ['Blender', 'Animação', 'Demoreel'],
    projectUrl: '#',
  },
    {
    id: 'p4',
    title: 'Gerador de Avatares com IA',
    author: 'Lucas Martins',
    authorAvatar: 'https://placehold.co/100x100.png',
    image: 'https://placehold.co/600x450.png',
    'data-ai-hint': 'ai generated avatars',
    description: 'Ferramenta que cria avatares estilizados a partir de fotos do usuário, utilizando Stable Diffusion.',
    tags: ['IA', 'Design', 'Stable Diffusion'],
    projectUrl: '#',
  },
   {
    id: 'p5',
    title: 'E-commerce de Moda Sustentável',
    author: 'Fernanda Oliveira',
    authorAvatar: 'https://placehold.co/100x100.png',
    image: 'https://placehold.co/600x450.png',
    'data-ai-hint': 'fashion website design',
    description: 'Design de interface para um e-commerce focado em moda sustentável, projetado no Figma.',
    tags: ['Figma', 'UI/UX', 'Design'],
    projectUrl: '#',
  },
   {
    id: 'p6',
    title: 'Analisador de Sentimento de Notícias',
    author: 'Rafael Souza',
    authorAvatar: 'https://placehold.co/100x100.png',
    image: 'https://placehold.co/600x450.png',
    'data-ai-hint': 'news analysis app',
    description: 'Plataforma que analisa o sentimento de artigos de notícias em tempo real, construída com Python e PNL.',
    tags: ['Python', 'PNL', 'IA'],
    projectUrl: '#',
  },
];

export default function CommunityPage() {
  return (
    <>
      <section className="relative bg-muted -mt-14 pt-14 flex items-center justify-center text-center overflow-hidden border-b">
         <div className="container relative z-10 mx-auto px-4 py-24 sm:py-32 lg:py-40 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              O Estúdio dos Pioneiros
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Isto não é uma galeria. É a prova. Explore os projetos e as criações nascidas neste movimento. Inspire-se. Conecte-se com outros pioneiros.
            </p>
             <div className="mt-10 flex items-center justify-center">
                <Button asChild size="lg">
                    <Link href="#"> {/* Placeholder for upload page */}
                        <UploadCloud className="mr-2 h-5 w-5" />
                        Mostre sua Criação
                    </Link>
                </Button>
            </div>
          </div>
        </div>
      </section>
      
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </>
  );
}
