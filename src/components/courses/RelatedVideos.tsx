'use client';

import type { Course } from "@/lib/courses";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface RelatedVideosProps {
    course: Course;
    currentLessonId: string;
}

export function RelatedVideos({ course, currentLessonId }: RelatedVideosProps) {
    const allLessons = course.modules.flatMap(m => m.lessons.map(l => ({...l, courseId: course.id})));
    const relatedLessons = allLessons.filter(l => l.id !== currentLessonId).slice(0, 3);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Related Videos</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {relatedLessons.map(lesson => (
                        <Link key={lesson.id} href={`/courses/${lesson.courseId}/lessons/${lesson.id}`} className="flex items-center gap-4 group">
                             <div className="relative h-16 w-28 flex-shrink-0 overflow-hidden rounded-md">
                                <Image
                                    src={course.image}
                                    alt={lesson.title}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                    data-ai-hint={course['data-ai-hint']}
                                />
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm text-foreground leading-tight group-hover:text-primary">{lesson.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1">Revolução Cognitiva</p>
                                <p className="text-xs text-muted-foreground">{lesson.duration} min</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </CardContent>
             <CardFooter>
                <Button variant="outline" className="w-full">
                    See All related videos ({allLessons.length - 1})
                </Button>
            </CardFooter>
        </Card>
    )
}
