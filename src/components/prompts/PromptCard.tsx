'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { Prompt } from '@/lib/prompts';
import { Check, Copy } from 'lucide-react';

interface PromptCardProps {
  prompt: Prompt;
}

export function PromptCard({ prompt }: PromptCardProps) {
  const { toast } = useToast();
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setHasCopied(true);
    toast({
      title: 'Prompt Copiado!',
      description: 'O prompt foi copiado para a sua área de transferência.',
      variant: 'success',
    });
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="font-headline text-xl">{prompt.title}</CardTitle>
          <Badge variant="secondary">{prompt.category}</Badge>
        </div>
        <CardDescription>{prompt.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="relative h-full">
          <pre className="text-sm p-4 h-40 overflow-y-auto rounded-md bg-muted text-muted-foreground whitespace-pre-wrap font-sans">
            {prompt.prompt}
          </pre>
          <div className="absolute top-0 right-0 bottom-0 w-full bg-gradient-to-t from-muted via-muted to-transparent pointer-events-none" />
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex flex-wrap gap-2">
            {prompt.tags.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
        </div>
        <Button variant="ghost" size="icon" onClick={copyToClipboard}>
          {hasCopied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
          <span className="sr-only">Copiar prompt</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
