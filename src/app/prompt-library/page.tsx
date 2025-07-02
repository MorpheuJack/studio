
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  BrainCircuit,
  FileText,
  BookOpen,
  Code,
  Flame,
  Copy,
  Check,
  Camera,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

// Expanded resource data for a richer visual
const resources = [
  // Central Hub
  {
    id: 'hub',
    type: 'hub',
    title: 'A Forja',
    description: 'O núcleo da Revolução Cognitiva. Todos os caminhos começam e terminam aqui.',
    position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    Icon: BrainCircuit,
    size: 'large',
  },
  // Prompt Branch
  {
    id: 'prompt-hub',
    type: 'category',
    title: 'Prompts',
    description: 'Comandos para forjar o pensamento.',
    position: { top: '35%', left: '25%' },
    Icon: Flame,
    size: 'medium',
    color: 'text-orange-400',
  },
  {
    id: 'p1',
    type: 'resource',
    category: 'Prompt',
    title: 'Analisador Socrático',
    description: 'Força a IA a justificar suas respostas.',
    content: 'Analise o seguinte texto e determine o sentimento...',
    position: { top: '20%', left: '15%' },
    Icon: FileText,
    connectsTo: 'prompt-hub',
  },
  {
    id: 'p2',
    type: 'resource',
    category: 'Prompt',
    title: 'Gerador de UI/UX',
    description: 'Brainstorming de interfaces com base em princípios.',
    content: 'Você é um especialista em Design de Experiência do Usuário (UX)...',
    position: { top: '50%', left: '10%' },
    Icon: FileText,
    connectsTo: 'prompt-hub',
  },
  // Book Branch
  {
    id: 'book-hub',
    type: 'category',
    title: 'Livros',
    description: 'Conhecimento consolidado para aprofundar.',
    position: { top: '75%', left: '35%' },
    Icon: BookOpen,
    size: 'medium',
    color: 'text-blue-400',
  },
  {
    id: 'b1',
    type: 'resource',
    category: 'Livro',
    title: 'Clean Code',
    description: 'Um clássico indispensável para desenvolvedores.',
    content: 'Autor: Robert C. Martin. Um guia para produzir código legível, resiliente e reaproveitável.',
    position: { top: '90%', left: '20%' },
    Icon: BookOpen,
    connectsTo: 'book-hub',
  },
  // Code Branch
  {
    id: 'code-hub',
    type: 'category',
    title: 'Código',
    description: 'Trechos e padrões para acelerar a criação.',
    position: { top: '70%', left: '70%' },
    Icon: Code,
    size: 'medium',
    color: 'text-green-400',
  },
  {
    id: 'c1',
    type: 'resource',
    category: 'Código',
    title: 'Hook de Autenticação',
    description: 'Padrão React para gerenciar estado de autenticação.',
    content: "import React, { useState, useEffect } from 'react';",
    position: { top: '80%', left: '85%' },
    Icon: Code,
    connectsTo: 'code-hub',
  },
  {
    id: 'c2',
    type: 'resource',
    category: 'Código',
    title: 'Debounce em TypeScript',
    description: 'Função utilitária para otimizar performance.',
    content: 'export function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) { ... }',
    position: { top: '55%', left: '88%' },
    Icon: Code,
    connectsTo: 'code-hub',
  },
  {
    id: 'doc1',
    type: 'resource',
    category: 'Documentação',
    title: 'React Docs',
    description: 'A fonte oficial para a biblioteca React.',
    content: 'Acesse a documentação oficial em react.dev',
    position: { top: '25%', left: '75%' },
    Icon: FileText,
    connectsTo: 'hub',
  }
];

const imagePrompts = [
  {
    id: 'imgp1',
    title: 'Plano Detalhe Extremo (Super Close-Up)',
    prompt:
      'Fotografia super close-up do olho de um réptil, revelando detalhes intrincados das escamas e da íris. Iluminação dramática, profundidade de campo rasa, lente macro. --ar 16:9',
    imageUrl: 'https://placehold.co/400x225.png',
    imageHint: 'reptile eye',
  },
  {
    id: 'imgp2',
    title: 'Plano de Contra-plongée (Low Angle Shot)',
    prompt:
      'Fotografia em contra-plongée de um arranha-céu monolítico de concreto, com o céu tempestuoso ao fundo. A perspectiva faz o prédio parecer imponente e opressor. Estilo brutalista, lente grande angular. --ar 9:16',
    imageUrl: 'https://placehold.co/400x225.png',
    imageHint: 'skyscraper low-angle',
  },
  {
    id: 'imgp3',
    title: 'Plano Holandês (Dutch Angle)',
    prompt:
      'Fotografia em plano holandês de um corredor de neon em uma cidade cyberpunk à noite. O ângulo inclinado cria uma sensação de desorientação e tensão. Reflexos no chão molhado, atmosfera cinematográfica. --ar 16:9',
    imageUrl: 'https://placehold.co/400x225.png',
    imageHint: 'cyberpunk hallway',
  },
  {
    id: 'imgp4',
    title: 'Plano Geral (Wide Shot)',
    prompt:
      'Vasto plano geral de um vale montanhoso ao amanhecer. Névoa pairando sobre um rio sinuoso no fundo. Luz dourada suave, composição épica, alta resolução. --ar 16:9',
    imageUrl: 'https://placehold.co/400x225.png',
    imageHint: 'mountain valley',
  },
];


type Resource = (typeof resources)[0] & {
    content?: string;
};


const ResourceNode = ({ resource, onNodeClick }: { resource: Resource; onNodeClick: (resource: Resource) => void }) => {
  const { Icon, title, description, position, size, color } = resource;

  const sizeClasses = {
    large: 'w-48 h-48 p-6 z-20',
    medium: 'w-36 h-36 p-4 z-10',
    small: 'w-28 h-28 p-3',
  };
  const iconSizeClasses = {
    large: 'w-10 h-10',
    medium: 'w-8 h-8',
    small: 'w-6 h-6',
  };
  const titleSizeClasses = {
    large: 'text-xl',
    medium: 'text-lg',
    small: 'text-base',
  };
  const descSizeClasses = {
    large: 'text-sm',
    medium: 'text-xs',
    small: 'text-xs opacity-0 group-hover:opacity-100',
  };

  const currentSize = resource.size || 'small';

  return (
    <div
      className={cn(
        'group absolute flex cursor-pointer flex-col items-center justify-center rounded-full border text-center transition-all duration-300 ease-in-out',
        'bg-card/30 backdrop-blur-sm shadow-lg hover:shadow-2xl',
        size === 'large' ? 'border-primary/50 hover:border-primary' : 'border-border hover:border-accent-foreground',
        size === 'large' ? 'hover:scale-105' : 'hover:scale-110 hover:z-30',
        sizeClasses[currentSize]
      )}
      style={{ ...position }}
      onClick={() => onNodeClick(resource)}
    >
      {Icon && <Icon className={cn('mb-2 transition-colors', iconSizeClasses[currentSize], color)} />}
      <h3 className={cn('font-headline font-bold text-foreground transition-colors', titleSizeClasses[currentSize])}>
        {title}
      </h3>
      <p className={cn('text-muted-foreground transition-opacity duration-300', descSizeClasses[currentSize])}>
        {description}
      </p>
    </div>
  );
};

const ConnectionLine = ({ from, to }: { from: Resource; to: Resource }) => {
  if (!from.position || !to.position) return null;
  const x1 = parseFloat(from.position.left);
  const y1 = parseFloat(from.position.top);
  const x2 = parseFloat(to.position.left);
  const y2 = parseFloat(to.position.top);

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
      <line
        x1={`${x1}%`}
        y1={`${y1}%`}
        x2={`${x2}%`}
        y2={`${y2}%`}
        className="stroke-border/20 group-hover:stroke-border/50 transition-all duration-300"
      />
    </svg>
  );
};

const ResourceDetailDialog = ({
  resource,
  isOpen,
  setIsOpen,
}: {
  resource: Resource | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { toast } = useToast();
  const [hasCopied, setHasCopied] = useState(false);

  if (!resource || resource.type === 'hub' || resource.type === 'category') {
    return null;
  }

  const copyToClipboard = () => {
    if (!resource.content) return;
    navigator.clipboard.writeText(resource.content);
    setHasCopied(true);
    toast({
      title: 'Copiado para a área de transferência!',
      variant: 'success',
    });
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-4">
            {resource.Icon && <resource.Icon className={cn('h-8 w-8', resource.color)} />}
            <div>
              <DialogTitle className="font-headline text-2xl">{resource.title}</DialogTitle>
              {resource.category && <Badge variant="outline" className="mt-1">{resource.category}</Badge>}
            </div>
          </div>
          <DialogDescription className="pt-4 text-base">{resource.description}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="relative rounded-lg bg-muted p-4 max-h-60 overflow-auto">
            <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">
              {resource.content}
            </pre>
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={copyToClipboard}>
              {hasCopied ? <Check className="mr-2" /> : <Copy className="mr-2" />}
              {hasCopied ? 'Copiado!' : 'Copiar Conteúdo'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};


export default function PromptLibraryPage() {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleNodeClick = (resource: Resource) => {
    if (resource.type === 'resource') {
      setSelectedResource(resource);
      setIsDialogOpen(true);
    }
  };

  const copyImagePrompt = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    toast({
      title: 'Prompt Copiado!',
      description: 'O prompt de imagem foi copiado para a sua área de transferência.',
      variant: 'success',
    });
    setTimeout(() => {
      setCopiedPromptId(null);
    }, 2000);
  };
  
  const connections = resources
    .filter((r): r is Resource & { connectsTo: string } => 'connectsTo' in r && !!r.connectsTo)
    .map((r) => ({
      from: r,
      to: resources.find((p) => p.id === r.connectsTo)!,
    }));

  return (
    <>
      <div className="relative w-full h-screen min-h-[800px] overflow-hidden bg-background">
        
        {/* Particle Background */}
        <div className="absolute inset-0 z-0 bg-transparent">
          <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_500px_at_50%_200px,hsl(var(--primary)/0.1),transparent)]" />
        </div>

        {/* Lines - For Desktop Only */}
        <div className="hidden lg:block">
          {connections.map((conn, i) => (
            conn.from && conn.to && <ConnectionLine key={i} from={conn.from} to={conn.to} />
          ))}
        </div>

        {/* Header */}
        <div className="relative z-30 pt-16 text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              A Constelação de Ideias
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore o universo de conhecimento da Revolução Cognitiva.
            </p>
        </div>
        
        {/* Desktop Constellation */}
        <div className="hidden lg:block relative w-full h-full">
            {resources.map((resource) => (
              <ResourceNode key={resource.id} resource={resource} onNodeClick={handleNodeClick} />
            ))}
        </div>

        {/* Mobile Fallback - Simple Grid */}
        <div className="lg:hidden relative z-20 container mx-auto px-4 py-12 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {resources.filter(r => r.type !== 'hub').map((resource) => (
                <div key={resource.id} onClick={() => handleNodeClick(resource)} className="group flex flex-col items-center justify-center text-center p-4 rounded-lg bg-card/50 border border-border aspect-square cursor-pointer transition-all hover:bg-card/80 hover:border-primary/50">
                    {resource.Icon && <resource.Icon className={cn('w-8 h-8 mb-2 transition-colors', resource.color)} />}
                    <h3 className="font-bold text-foreground text-sm">{resource.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{resource.description}</p>
                </div>
              ))}
            </div>
        </div>
      </div>
      
      {/* Image Prompts Section */}
      <section className="bg-background py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
                    <Camera className="h-5 w-5" />
                    <h2 className="font-semibold">Fotografia & IA</h2>
                </div>
                <h3 className="mt-4 font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Galeria de Comandos Visuais
                </h3>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                  Explore prompts de imagem testados para diferentes ângulos e takes. Copie, cole e crie.
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {imagePrompts.map((prompt) => (
                    <Card key={prompt.id} className="overflow-hidden">
                        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <div className="relative aspect-video rounded-md overflow-hidden group">
                                <Image
                                    src={prompt.imageUrl}
                                    alt={prompt.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint={prompt.imageHint}
                                />
                            </div>
                            <div className="flex flex-col h-full space-y-3">
                                <h4 className="font-headline font-bold text-lg text-foreground">{prompt.title}</h4>
                                <div className="relative flex-grow">
                                    <pre className="text-sm p-3 h-32 overflow-y-auto rounded-md bg-muted text-muted-foreground whitespace-pre-wrap font-sans">
                                        {prompt.prompt}
                                    </pre>
                                    <div className="absolute bottom-0 h-10 w-full bg-gradient-to-t from-muted to-transparent pointer-events-none" />
                                </div>
                                <Button
                                    onClick={() => copyImagePrompt(prompt.prompt, prompt.id)}
                                    size="sm"
                                    className="w-full"
                                >
                                    {copiedPromptId === prompt.id ? <Check className="mr-2" /> : <Copy className="mr-2" />}
                                    {copiedPromptId === prompt.id ? 'Copiado!' : 'Copiar Prompt'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </section>

      <ResourceDetailDialog
        resource={selectedResource}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
    </>
  );
}

