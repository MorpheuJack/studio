'use client';

import React, { useActionState, useRef, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { askAndSpeakAction } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bot, Send, Loader2, Volume2, Mic } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';

const initialState = {
  success: false,
  aiResponse: undefined,
  audioUrl: undefined,
  error: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
      <span className="sr-only">Perguntar</span>
    </Button>
  );
}

export function AskAndSpeakWidget() {
  const [state, formAction] = useActionState(askAndSpeakAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentResponse, setCurrentResponse] = React.useState<{text: string, audioUrl?: string} | null>(null);

  useEffect(() => {
    if (state.success && state.aiResponse) {
      setCurrentResponse({ text: state.aiResponse, audioUrl: state.audioUrl });
      formRef.current?.reset();
    } else if (state.error) {
      toast({
        title: "Erro de IA",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  useEffect(() => {
    if (currentResponse?.audioUrl && audioRef.current) {
        audioRef.current.src = currentResponse.audioUrl;
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  }, [currentResponse]);

  return (
    <Card className="bg-card/50 border-border/20">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Mic className="h-5 w-5 text-primary" />
            <CardTitle className="text-base font-semibold text-foreground">Pergunte à IA</CardTitle>
        </div>
        <CardDescription className="text-xs">Digite sua pergunta e ouça a resposta.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentResponse && (
            <div className="p-4 rounded-lg bg-black/20 animate-in fade-in duration-500">
                <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 border-2 border-primary/50 flex-shrink-0">
                        <AvatarImage src="/img/RG-personagem.png" alt="Guia Socrático Avatar" className="object-cover" />
                        <AvatarFallback className="bg-primary/20">
                            <Bot className="h-4 w-4 text-primary" />
                        </AvatarFallback>
                    </Avatar>
                    <div className='w-full'>
                        <ScrollArea className="h-24">
                           <p className="text-sm text-muted-foreground">{currentResponse.text}</p>
                        </ScrollArea>
                        {currentResponse.audioUrl && (
                             <Button 
                                variant="ghost" 
                                size="sm" 
                                className="mt-2 text-xs"
                                onClick={() => audioRef.current?.play()}
                              >
                                <Volume2 className="mr-2 h-4 w-4" />
                                Ouvir novamente
                              </Button>
                        )}
                    </div>
                </div>
            </div>
        )}
        <form ref={formRef} action={formAction} className="flex w-full items-center space-x-2">
          <Input name="question" placeholder="Qual a sua dúvida?" autoComplete="off" />
          <SubmitButton />
        </form>
        {currentResponse?.audioUrl && <audio ref={audioRef} className="hidden" />}
      </CardContent>
    </Card>
  );
}
