import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Flame, 
  Code,
  User, 
  Clock, 
  Pencil,
  ArrowRight,
  Home,
  Newspaper,
  BookOpen,
  FileText,
  FileCode,
  Download,
  Star,
  Tags
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { AskAndSpeakWidget } from '@/components/prompts/AskAndSpeakWidget';


// Mock data for the resource library
const resources = [
  {
    id: 1,
    icon: Flame,
    type: 'Prompt',
    title: 'Analisador de Sentimento Socrático',
    description: 'Um prompt que força a IA a analisar o sentimento de um texto e justificar sua resposta com evidências, em vez de apenas dar uma etiqueta.',
    author: 'MorpheuJack',
    downloads: '1.2k',
    lastUpdated: '2d atrás',
    color: 'text-orange-400',
    url: '#'
  },
  {
    id: 2,
    icon: BookOpen,
    type: 'Livro',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    description: 'Um clássico indispensável para qualquer desenvolvedor que busca escrever código legível, manutenível e robusto.',
    author: 'Robert C. Martin',
    downloads: '5.8k',
    lastUpdated: '1 semana atrás',
    color: 'text-blue-400',
    url: '#'
  },
  {
    id: 3,
    icon: FileText,
    type: 'Documentação',
    title: 'Documentação Oficial do React',
    description: 'A fonte definitiva de verdade para aprender e consultar tudo sobre a biblioteca React.',
    author: 'Meta',
    downloads: '10k+',
    lastUpdated: '1 dia atrás',
    color: 'text-sky-400',
    url: '#'
  },
    {
    id: 4,
    icon: FileCode,
    type: 'PDF',
    title: 'Attention Is All You Need (Paper)',
    description: 'O paper seminal que introduziu a arquitetura Transformer, a base para modelos como o GPT.',
    author: 'Vaswani et al.',
    downloads: '8.9k',
    lastUpdated: '3 semanas atrás',
    color: 'text-green-400',
    url: '#'
  },
];

const featuredResource = {
  icon: Flame,
  type: 'Prompt',
  title: 'Analisador de Sentimento Socrático',
  description: 'Um prompt que força a IA a analisar o sentimento de um texto...',
  color: 'text-orange-400',
  url: '#'
};

const popularTags = [
  { name: 'Gemini', resources: '231 recursos' },
  { name: 'UI/UX', resources: '189 recursos' },
  { name: 'JavaScript', resources: '154 recursos' },
  { name: 'Marketing', resources: '98 recursos' },
];

const sidebarNav = [
    { 
        title: 'Categorias', 
        links: [
            { label: 'Todos os Recursos', icon: Home, active: true },
            { label: 'Prompts', icon: Flame },
            { label: 'Livros', icon: BookOpen },
            { label: 'Documentação', icon: Newspaper },
            { label: 'PDFs & Artigos', icon: FileText },
            { label: 'Trechos de Código', icon: Code },
        ]
    },
    { 
        title: 'Contribuir', 
        links: [
            { label: 'Enviar Recurso', icon: Pencil },
            { label: 'Minhas Contribuições', icon: User },
        ]
    },
];

const ResourceLibrarySidebar = () => (
    <aside className="hidden lg:flex flex-col space-y-6">
        {sidebarNav.map(section => (
            <nav key={section.title} className="flex flex-col gap-1">
                <h3 className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{section.title}</h3>
                {section.links.map(link => {
                    const LinkIcon = link.icon;
                    return (
                        <Button 
                            key={link.label} 
                            variant={link.active ? "secondary" : "ghost"} 
                            className="justify-start text-sm h-9"
                        >
                            <LinkIcon className="mr-3 h-4 w-4" />
                            {link.label}
                        </Button>
                    );
                })}
            </nav>
        ))}
    </aside>
);

const ResourceCard = ({ resource }: { resource: (typeof resources)[0] }) => {
  const Icon = resource.icon;
  return (
    <Card className="bg-card/50 hover:bg-card/70 transition-colors border-border/20">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Icon className={cn('h-5 w-5 mt-1 flex-shrink-0', resource.color)} />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-foreground">{resource.title}</h3>
                <Badge variant="outline" className={cn("mt-1", resource.color, "border-current/50 bg-transparent")}>{resource.type}</Badge>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Baixar</span>
                </a>
              </Button>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{resource.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-3 w-3" />
                <span>por {resource.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-3 w-3" />
                <span>{resource.downloads} downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                <span>Atualizado {resource.lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FeaturedResourceCard = () => (
  <Card className="bg-card/50 border-border/20">
    <CardHeader>
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 text-yellow-400" />
        <CardTitle className="text-base font-semibold text-foreground">Recurso em Destaque</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="flex flex-col gap-4">
      <div className="p-4 rounded-lg bg-black/20">
        <div className="flex items-start gap-3">
            <featuredResource.icon className={cn("h-5 w-5 flex-shrink-0 mt-1", featuredResource.color)} />
            <div>
                <h4 className="font-semibold text-foreground">{featuredResource.title}</h4>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{featuredResource.description}</p>
            </div>
        </div>
      </div>
      <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-opacity">
        <a href={featuredResource.url}>Ver Recurso</a>
      </Button>
    </CardContent>
  </Card>
);

const PopularTagsCard = () => (
   <Card className="bg-card/50 border-border/20">
    <CardHeader>
        <div className="flex items-center gap-2">
            <Tags className="h-5 w-5 text-primary" />
            <CardTitle className="text-base font-semibold text-foreground">Tags Populares</CardTitle>
        </div>
    </CardHeader>
    <CardContent>
        <div className="flex flex-col gap-4">
            {popularTags.map(tag => (
                <div key={tag.name} className="flex justify-between items-center group cursor-pointer">
                    <div>
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">#{tag.name}</p>
                        <p className="text-xs text-muted-foreground">{tag.resources}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            ))}
        </div>
    </CardContent>
  </Card>
);


export default function PromptLibraryPage() {
  return (
    <>
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
             <ResourceLibrarySidebar />
          </div>
        </div>

        {/* Main Content */}
        <main className="lg:col-span-2">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-foreground">Biblioteca de Recursos</h1>
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <p>1,247 Recursos</p>
            </div>
          </header>
          <div className="space-y-6">
            {resources.map(resource => <ResourceCard key={resource.id} resource={resource} />)}
          </div>
        </main>
        
        {/* Right Widgets */}
        <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-8">
              <AskAndSpeakWidget />
              <FeaturedResourceCard />
              <PopularTagsCard />
            </div>
        </aside>
      </div>

    </div>
    {/* Floating Action Button */}
    <Button size="icon" className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white z-20">
        <Pencil className="h-6 w-6" />
        <span className="sr-only">Enviar Recurso</span>
    </Button>
    </>
  );
}
