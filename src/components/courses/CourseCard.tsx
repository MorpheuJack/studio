import Image from 'next/image';
import Link from 'next/link';
import type { Course } from '@/lib/courses';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-[0_10px_25px_-5px_hsl(var(--primary)/0.2),0_8px_10px_-6px_hsl(var(--primary)/0.2)] hover:-translate-y-1 border-border hover:border-primary/30">
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
            <Avatar className="h-8 w-8">
              <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
              <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-sm font-medium">{course.instructor.name}</p>
                <p className="text-xs text-muted-foreground">{course.instructor.title}</p>
            </div>
          </div>
          <div className="flex items-center text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            View <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
