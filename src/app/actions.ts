'use server';

import { summarizeLesson } from '@/ai/flows/summarize-lesson';
import { z } from 'zod';

const SummarizeSchema = z.object({
  lessonContent: z.string().min(1, { message: 'Lesson content cannot be empty.' }),
});

type State = {
  success: boolean;
  summary?: string;
  error?: string;
  message?: string;
};

export async function summarizeLessonAction(prevState: State | undefined, formData: FormData): Promise<State> {
  try {
    const validatedData = SummarizeSchema.parse({
      lessonContent: formData.get('lessonContent'),
    });

    const result = await summarizeLesson({
      lessonContent: validatedData.lessonContent,
    });

    if (result.summary) {
        return { success: true, summary: result.summary };
    } else {
        return { success: false, error: 'Could not generate a summary.' };
    }
    
  } catch (e) {
    if (e instanceof z.ZodError) {
        return { success: false, error: e.errors.map(err => err.message).join(', ') };
    }
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
