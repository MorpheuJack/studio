import React from 'react';
import Image from 'next/image';
import { BootcampCard } from '@/components/bootcamps/BootcampCard';
import { ChallengeCard } from '@/components/bootcamps/ChallengeCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy } from 'lucide-react';
import Link from 'next/link';

// Mock Data
const bootcamps = [
  {
    id: 'b1',
    title: 'Forja Intensiva de IA com Gemini',
    description: 'Do zero ao deploy de uma aplicação de IA completa em 8 semanas. Construa um projeto real e adicione ao seu portfólio.',
    duration: '8 Semanas',
    tools: ['Gemini', 'Next.js', 'Genkit', 'Firebase'],
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'abstract neural network',
  },
  {
    id: 'b2',
    title: 'Mestres do Design de UI/UX para IA',
    description: 'Aprenda a forjar interfaces intuitivas e centradas no usuário para produtos de inteligência artificial complexos.',
    duration: '6 Semanas',
    tools: ['Figma', 'React', 'IA Principles'],
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'futuristic user interface',
  },
];

const challenges = [
  {
    id: 'ch1',
    title: 'Desafio: Otimizador de Rota com IA',
    description: 'Crie um algoritmo de IA que encontre a rota mais eficiente para uma frota de entrega, considerando tráfego em tempo real e janelas de entrega.',
    prize: 'R$ 5.000 + Vaga de Estágio',
    deadline: '31 de Agosto, 2024',
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'city map delivery',
  },
  {
    id: 'ch2',
    title: 'Desafio: Assistente de Escrita Criativa',
    description: 'Desenvolva um assistente de IA que ajude escritores a superar o bloqueio criativo, sugerindo continuações de histórias, diálogos e personagens.',
    prize: 'R$ 3.000 + Acesso Vitalício',
    deadline: '15 de Setembro, 2024',
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'robot writing book',
  },
];

export default function BootcampsPage() {
  return (
    <>
      <section className="relative bg-muted -mt-14 pt-14 flex items-center justify-center text-center overflow-hidden border-b">
         <div className="container relative z-10 mx-auto px-4 py-24 sm:py-32 lg:py-40 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Arenas de Domínio
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Aqui é onde o conhecimento se torna maestria. Mergulhe em forjas intensivas e prove seu domínio em desafios com recompensas reais.
            </p>
             <div className="mt-10 flex items-center justify-center">
                <Button asChild size="lg">
                    <Link href="#bootcamps">
                        Explorar Arenas
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
          </div>
        </div>
      </section>
      
      <main className="container mx-auto px-4 py-16 sm:py-24 lg:px-8 space-y-24">
        {/* Bootcamps Section */}
        <section id="bootcamps">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold sm:text-4xl">
              Jornadas Intensivas
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Forjas aceleradas para você dominar as tecnologias que definem o presente.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {bootcamps.map((bootcamp) => (
              <BootcampCard key={bootcamp.id} bootcamp={bootcamp} />
            ))}
          </div>
        </section>

        {/* Challenges Section */}
        <section id="challenges">
          <div className="mb-12 text-center">
             <div className="flex justify-center items-center gap-3 text-primary mb-2">
                 <Trophy className="h-8 w-8" />
             </div>
            <h2 className="font-headline text-3xl font-bold sm:text-4xl">
              Prove seu Domínio
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              A teoria acabou. Mostre seu talento, construa o real e seja recompensado.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
