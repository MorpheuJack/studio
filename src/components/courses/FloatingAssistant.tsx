'use client';

import React, { useState, useActionState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useFormStatus } from 'react-dom';
import { useParams } from 'next/navigation';
import { askAssistantAction } from '@/app/actions';
import type { Course } from '@/lib/courses';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Loader2, BrainCircuit, Volume2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAssistant } from '@/context/AssistantContext';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  audioUrl?: string;
};

const initialState = {
  success: false,
  newMessage: undefined,
  error: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending} className="absolute right-1 top-1 h-8 w-8">
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      <span className="sr-only">Enviar Mensagem</span>
    </Button>
  );
}

interface FloatingAssistantProps {
  course: Course;
}

export function FloatingAssistant({ course }: FloatingAssistantProps) {
  const { isAssistantOpen, setAssistantOpen } = useAssistant();
  const { user } = useAuth();
  const { toast } = useToast();
  const params = useParams<{ lessonId?: string }>();

  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: `Saudações, artesão(ã). Eu sou seu Guia Socrático. Não estou aqui para dar respostas, mas para fazer as perguntas que forjarão sua maestria. O que você está pronto para construir?` 
    }
  ]);
  const [state, formAction] = useActionState(askAssistantAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioSrc, setAudioSrc] = useState('');

  const currentModule = params.lessonId 
    ? course.modules.find(m => m.lessons.some(l => l.id === params.lessonId))
    : undefined;

  useEffect(() => {
    if (state?.success && state.newMessage) {
      setMessages((prev) => [...prev, state.newMessage!]);
      if (state.newMessage.audioUrl) {
        setAudioSrc(state.newMessage.audioUrl);
      }
    } else if (state?.error) {
      toast({
        title: "Erro do Assistente",
        description: state.error,
        variant: "destructive",
      });
      setMessages(prev => prev.slice(0, -1));
    }
  }, [state, toast]);

  useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
  }, [audioSrc]);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({ top: viewportRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleFormSubmit = (formData: FormData) => {
    const userMessage = formData.get('userMessage') as string;
    if (!userMessage.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);

    formData.append('chatHistory', JSON.stringify(newMessages));
    formAction(formData);
    formRef.current?.reset();
  };
  
  const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[names.length - 1]) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name.substring(0, 2);
  }

  const userName = user?.user_metadata?.full_name || user?.email || '';

  return (
    <Popover open={isAssistantOpen} onOpenChange={setAssistantOpen}>
      <PopoverTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg shadow-primary/30 animate-pulse p-0 overflow-hidden"
          style={{ animationDuration: '3s' }}
          size="icon"
          aria-label="Abrir Guia Socrático"
        >
          <Image 
            src="/img/RG-personagem.png"
            alt="Guia Socrático"
            fill
            className="object-cover"
            data-ai-hint="character mascot"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[26rem] h-[70vh] mr-4 flex flex-col p-0 rounded-xl" sideOffset={16}>
        <audio ref={audioRef} src={audioSrc} className="hidden" />
        <CardHeader>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-primary/50">
                <AvatarImage src="/img/RG-personagem.png" alt="Guia Socrático" className="object-cover" />
                <AvatarFallback className="bg-primary/20">
                    <BrainCircuit className="h-5 w-5 text-primary" />
                </AvatarFallback>
            </Avatar>
            <div>
                <CardTitle className="text-lg">Seu Guia Socrático</CardTitle>
                <CardDescription>Sua parceiro na forja do pensamento</CardDescription>
            </div>
          </div>
        </CardHeader>

        <ScrollArea className="flex-grow p-4" viewportRef={viewportRef}>
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? "justify-end" : "justify-start")}>
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 border-2 border-primary/50 flex-shrink-0">
                    <AvatarImage src="/img/RG-personagem.png" alt="Guia Socrático Avatar" className="object-cover" />
                    <AvatarFallback className="bg-primary/20">
                      <BrainCircuit className="h-4 w-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className={cn("max-w-xs md:max-w-md rounded-xl px-4 py-3 text-sm shadow",
                  message.role === 'assistant' ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground")}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                
                {message.role === 'assistant' && message.audioUrl && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground self-center flex-shrink-0"
                    onClick={() => setAudioSrc(message.audioUrl!)}
                  >
                    <Volume2 className="h-4 w-4" />
                    <span className="sr-only">Ouvir resposta</span>
                  </Button>
                )}

                 {user && message.role === 'user' && (
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 bg-muted/50 border-t">
            <form ref={formRef} action={handleFormSubmit} className="relative">
                <input type="hidden" name="courseTitle" value={course.title} />
                {currentModule && <input type="hidden" name="moduleTitle" value={currentModule.title} />}
                <Input
                    name="userMessage"
                    placeholder="Inicie o desafio..."
                    className="pr-12"
                    autoComplete="off"
                />
                <SubmitButton />
            </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
