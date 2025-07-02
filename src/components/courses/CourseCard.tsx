import Image from 'next/image';
import Link from 'next/link';
import type { Course } from '@/lib/courses';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Wrench } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden rounded-lg transition-all duration-300 bg-card border border-border hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              data-ai-hint={course['data-ai-hint']}
            />
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col p-6">
          <div className="flex-1">
            <Badge variant="secondary" className="mb-2">{course.category}</Badge>
            <h3 className="font-headline text-xl font-semibold leading-tight text-foreground">{course.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{course.description}</p>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-6 pt-0">
           <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap items-center gap-1.5">
              {course.tools.slice(0, 2).map((tool) => (
                <Badge key={tool} variant="secondary">
                  {tool}
                </Badge>
              ))}
              {course.tools.length > 2 && (
                <Badge variant="secondary">
                  +{course.tools.length - 2} mais
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Acessar <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
