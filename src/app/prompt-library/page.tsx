import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Flame, 
  Code, 
  MessageCircle, 
  User, 
  Clock, 
  Pencil,
  TrendingUp,
  ArrowRight,
  Home,
  Newspaper,
  Mic,
  BookOpen,
  Trophy,
  MessagesSquare,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';


// Mock data based on the image
const communityPosts = [
  {
    id: 1,
    icon: Flame,
    title: 'Nova Breakthrough em LLMs: GPT-5 Vazamento?',
    description: 'Discussão sobre os últimos rumores e vazamentos sobre o GPT-5. O que esperar da próxima geração de modelos de linguagem?',
    author: 'DrAI_Expert',
    replies: 47,
    time: '2h atrás',
    color: 'text-orange-400',
  },
  {
    id: 2,
    icon: Code,
    title: 'Compartilhando meu projeto de Computer Vision',
    description: 'Criei um sistema de reconhecimento facial em tempo real usando YOLOv8. Código disponível no GitHub!',
    author: 'VisionDev',
    replies: 23,
    time: '4h atrás',
    color: 'text-blue-400',
  },
  {
    id: 3,
    icon: MessageCircle,
    title: 'Dúvida sobre Backpropagation em Neural Networks',
    description: 'Alguém pode me explicar melhor como funciona o gradient descent no treinamento de redes neurais?',
    author: 'StudentAI',
    replies: 15,
    time: '6h atrás',
    color: 'text-yellow-400',
  },
];

const liveSession = {
  title: 'Introdução ao Transformers',
  presenter: 'Prof. Dr. Silva',
  viewers: '1,247',
};

const trendingTopics = [
  {
    name: '#ChatGPT',
    posts: '2,431 posts',
  },
  {
    name: '#MachineLearning',
    posts: '1,879 posts',
  },
  {
    name: '#PyTorch',
    posts: '1,234 posts',
  },
];

const sidebarNav = [
    { 
        title: 'Principal', 
        links: [
            { label: 'Dashboard', icon: Home, active: true },
            { label: 'Feed da Comunidade', icon: Newspaper },
            { label: 'Lives & Eventos', icon: Mic },
        ]
    },
    { 
        title: 'Aprendizado', 
        links: [
            { label: 'Cursos Online', icon: BookOpen },
            { label: 'Certificações', icon: Trophy },
        ]
    },
    { 
        title: 'Comunidade', 
        links: [
            { label: 'Fóruns', icon: MessagesSquare },
            { label: 'Networking', icon: Users },
        ]
    },
];

const CommunitySidebar = () => (
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

const CommunityPostCard = ({ post }: { post: (typeof communityPosts)[0] }) => {
  const Icon = post.icon;
  return (
    <Card className="bg-card/50 hover:bg-card/70 transition-colors border-border/20 cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Icon className={cn('h-5 w-5 mt-1 flex-shrink-0', post.color)} />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{post.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{post.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-3 w-3" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-3 w-3" />
                <span>{post.replies} respostas</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                <span>{post.time}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const LiveSessionCard = () => (
  <Card className="bg-card/50 border-border/20">
    <CardHeader>
      <div className="flex items-center gap-2">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </div>
        <CardTitle className="text-base font-semibold text-foreground">Ao Vivo Agora</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="flex flex-col gap-4">
      <div className="p-4 rounded-lg bg-black/20">
        <h4 className="font-semibold text-foreground">{liveSession.title}</h4>
        <p className="text-sm text-muted-foreground">{liveSession.presenter}</p>
        <div className="flex items-center gap-2 mt-2">
            <div className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </div>
            <p className="text-sm text-muted-foreground">{liveSession.viewers} assistindo</p>
        </div>
      </div>
      <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-opacity">Assistir Live</Button>
    </CardContent>
  </Card>
);

const TrendingTopicsCard = () => (
   <Card className="bg-card/50 border-border/20">
    <CardHeader>
        <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle className="text-base font-semibold text-foreground">Trending Topics</CardTitle>
        </div>
    </CardHeader>
    <CardContent>
        <div className="flex flex-col gap-4">
            {trendingTopics.map(topic => (
                <div key={topic.name} className="flex justify-between items-center group cursor-pointer">
                    <div>
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{topic.name}</p>
                        <p className="text-xs text-muted-foreground">{topic.posts}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            ))}
        </div>
    </CardContent>
  </Card>
);


export default function CommunityPage() {
  return (
    <>
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
             <CommunitySidebar />
          </div>
        </div>

        {/* Main Content */}
        <main className="lg:col-span-2">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-foreground">Feed da Comunidade</h1>
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </div>
                12 pessoas online
            </div>
          </header>
          <div className="space-y-6">
            {communityPosts.map(post => <CommunityPostCard key={post.id} post={post} />)}
          </div>
        </main>
        
        {/* Right Widgets */}
        <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-8">
              <LiveSessionCard />
              <TrendingTopicsCard />
            </div>
        </aside>
      </div>

    </div>
    {/* Floating Action Button */}
    <Button size="icon" className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white z-20">
        <Pencil className="h-6 w-6" />
        <span className="sr-only">Nova Postagem</span>
    </Button>
    </>
  );
}
