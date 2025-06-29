import Image from 'next/image';
import Link from 'next/link';
import type { Course } from '@/lib/courses';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 bg-card/60 backdrop-blur-lg border border-white/10 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
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
          <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
            Acessar <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
