'use client';

import type { Lesson } from "@/lib/courses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Wrench, BookOpen, FileText, ExternalLink } from 'lucide-react';

interface RelatedMaterialsProps {
    lesson: Lesson;
}

const iconMap = {
    tool: <Wrench className="h-5 w-5 flex-shrink-0 text-primary/80" />,
    book: <BookOpen className="h-5 w-5 flex-shrink-0 text-primary/80" />,
    pdf: <FileText className="h-5 w-5 flex-shrink-0 text-primary/80" />,
};

export function RelatedVideos({ lesson }: RelatedMaterialsProps) {
    if (!lesson.complementaryMaterials || lesson.complementaryMaterials.length === 0) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Material Complementar</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {lesson.complementaryMaterials.map((material, index) => (
                        <Link 
                          key={index} 
                          href={material.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-start gap-4 group p-2 -m-2 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                            <div className="pt-1">
                                {iconMap[material.type]}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-sm text-foreground leading-tight group-hover:text-primary transition-colors">{material.name}</h4>
                                <p className="text-xs text-muted-foreground mt-1">{material.description}</p>
                            </div>
                             <div className="ml-auto pl-2 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
