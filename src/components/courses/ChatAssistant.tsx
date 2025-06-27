'use client';

import React, { useState, useActionState, useRef, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { askAssistantAction } from '@/app/actions';
import type { Course, Module, Lesson } from '@/lib/courses';
import { CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Loader2, BrainCircuit } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

interface ChatAssistantProps {
  course: Course;
  module: Module;
  lesson: Lesson;
}

const initialState = {
  success: false,
  newMessage: undefined,
  error: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending} className="absolute right-1 top-1 h-8 w-8">
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Send className="h-4 w-4" />
      )}
      <span className="sr-only">Enviar Mensagem</span>
    </Button>
  );
}

export function ChatAssistant({ course, module, lesson }: ChatAssistantProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Olá! Eu sou o Professor AI. Estou aqui para ajudar você com qualquer dúvida sobre o curso "${course.title}". Como posso ajudar?` }
  ]);
  const [state, formAction] = useActionState(askAssistantAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state?.success && state.newMessage) {
      setMessages((prev) => [...prev, state.newMessage!]);
    } else if (state?.error) {
      toast({
        title: "Erro do Assistente",
        description: state.error,
        variant: "destructive",
      });
      // Remove the last user message if the AI failed to respond
      setMessages(prev => prev.slice(0, -1));
    }
  }, [state, toast]);

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
    <CardContent className="flex flex-col flex-grow p-0">
        <ScrollArea className="flex-grow p-6" viewportRef={viewportRef}>
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div key={index} className={cn("flex items-start gap-4", message.role === 'user' ? "justify-end" : "justify-start")}>
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 border-2 border-primary/50">
                    <AvatarFallback className="bg-primary/20">
                      <BrainCircuit className="h-4 w-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={cn("max-w-md rounded-xl px-4 py-3 text-sm shadow",
                  message.role === 'assistant' ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground")}>
                  <p>{message.content}</p>
                </div>
                 {message.role === 'user' && user && (
                  <Avatar className="h-8 w-8">
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
                <input type="hidden" name="moduleTitle" value={module.title} />
                <Input
                    name="userMessage"
                    placeholder="Digite sua dúvida aqui..."
                    className="pr-12"
                    autoComplete="off"
                />
                <SubmitButton />
            </form>
        </div>
    </CardContent>
  );
}
