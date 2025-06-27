import { courses } from '@/lib/courses';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Code, Bot, Paintbrush, Megaphone, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categoryIcons: { [key: string]: React.ReactNode } = {
  'IA': <Bot className="h-8 w-8 text-primary" />,
  'Programação': <Code className="h-8 w-8 text-primary" />,
  'Design': <Paintbrush className="h-8 w-8 text-primary" />,
  'Marketing': <Megaphone className="h-8 w-8 text-primary" />,
};

const categoryDescriptions: { [key: string]: string } = {
    'IA': 'Explore o futuro com cursos sobre machine learning, engenharia de prompt e mais.',
    'Programação': 'Desenvolva suas habilidades em codificação com projetos práticos e tecnologias de ponta.',
    'Design': 'Crie interfaces intuitivas e experiências de usuário memoráveis para aplicações de IA.',
    'Marketing': 'Aprenda a usar a IA para otimizar campanhas e estratégias de marketing digital.',
};

export default function CoursesCategoriesPage() {
  const categories = [...new Set(courses.map(c => c.category))];

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Explore Nossas Categorias</h1>
        <p className="mt-4 text-lg text-muted-foreground">Escolha uma área de interesse para começar sua jornada de aprendizado.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
        {categories.map((category) => (
          <Link key={category} href={`/courses/all?category=${encodeURIComponent(category)}`} className="group block">
            <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  {categoryIcons[category] || <Bot className="h-8 w-8 text-primary" />}
                  <div>
                    <CardTitle className="font-headline text-2xl">{category}</CardTitle>
                    <CardDescription className="mt-1">{categoryDescriptions[category] || `Cursos na categoria de ${category}`}</CardDescription>
                  </div>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-muted-foreground mb-4">Ou veja todos os nossos cursos de uma vez.</p>
        <Button asChild size="lg">
          <Link href="/courses/all">
            Ver Todos os Cursos
            <BookOpen className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
