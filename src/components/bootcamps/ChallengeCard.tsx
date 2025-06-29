import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Trophy } from 'lucide-react';

interface Challenge {
    id: string;
    title: string;
    description: string;
    prize: string;
    deadline: string;
    image: string;
    'data-ai-hint'?: string;
}

interface ChallengeCardProps {
  challenge: Challenge;
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 bg-card border border-border hover:border-primary/50 hover:-translate-y-1 group">
        <CardHeader className="flex flex-row items-center gap-4 p-6">
            <div className="relative h-40 w-full rounded-md overflow-hidden">
                <Image
                src={challenge.image}
                alt={challenge.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={challenge['data-ai-hint']}
                />
            </div>
        </CardHeader>
        <CardContent className="flex-grow p-6 pt-0">
          <CardTitle className="font-headline text-xl leading-tight text-foreground">{challenge.title}</CardTitle>
          <CardDescription className="mt-2 text-muted-foreground line-clamp-3">{challenge.description}</CardDescription>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4 p-6 pt-0">
          <div className="w-full space-y-3 text-sm">
            <div className="flex items-center gap-3 text-primary font-semibold">
              <Trophy className="h-5 w-5" />
              <span>{challenge.prize}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Prazo: {challenge.deadline}</span>
            </div>
          </div>
          <Button asChild variant="outline" className="w-full">
            <Link href={`/challenges/${challenge.id}`}>
              Aceitar o Desafio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
    </Card>
  );
}
