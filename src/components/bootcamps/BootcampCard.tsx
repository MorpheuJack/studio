import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Wrench } from 'lucide-react';

interface Bootcamp {
    id: string;
    title: string;
    description: string;
    duration: string;
    tools: string[];
    image: string;
    'data-ai-hint'?: string;
}

interface BootcampCardProps {
  bootcamp: Bootcamp;
}

export function BootcampCard({ bootcamp }: BootcampCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 bg-card border border-border hover:border-primary/50 hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-56 w-full">
            <Image
              src={bootcamp.image}
              alt={bootcamp.title}
              fill
              className="object-cover"
              data-ai-hint={bootcamp['data-ai-hint']}
            />
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col p-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Clock className="h-4 w-4" />
              <span>{bootcamp.duration}</span>
            </div>
            <h3 className="font-headline text-2xl font-semibold leading-tight text-foreground">{bootcamp.title}</h3>
            <p className="mt-3 text-base text-muted-foreground">{bootcamp.description}</p>
             <div className="flex items-center gap-2 mt-4">
                <Wrench className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-wrap items-center gap-1.5">
                {bootcamp.tools.map((tool) => (
                    <Badge key={tool} variant="secondary">
                    {tool}
                    </Badge>
                ))}
                </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button asChild className="w-full">
            <Link href={`/bootcamps/${bootcamp.id}`}>
              Ver Detalhes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
  );
}
