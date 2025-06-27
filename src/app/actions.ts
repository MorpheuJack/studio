'use server';

import { courseAssistant } from '@/ai/flows/course-assistant-flow';
import { z } from 'zod';

type AssistantState = {
  success: boolean;
  newMessage?: { role: 'assistant'; content: string };
  error?: string;
};

export async function askAssistantAction(prevState: AssistantState | undefined, formData: FormData): Promise<AssistantState> {
  const AssistantSchema = z.object({
    userMessage: z.string().min(1, { message: 'A mensagem não pode estar vazia.' }),
    chatHistory: z.string(), // a stringified JSON array
    courseTitle: z.string(),
    moduleTitle: z.preprocess(
      (val) => (val === null ? undefined : val),
      z.string().optional()
    ),
  });

  try {
    const validatedData = AssistantSchema.parse({
      userMessage: formData.get('userMessage'),
      chatHistory: formData.get('chatHistory'),
      courseTitle: formData.get('courseTitle'),
      moduleTitle: formData.get('moduleTitle'),
    });
    
    // The history from the form already includes the latest user message.
    const chatHistory = JSON.parse(validatedData.chatHistory);

    const result = await courseAssistant({
      userMessage: validatedData.userMessage,
      // We pass the history *without* the last user message to the flow,
      // because the user message is a separate parameter.
      chatHistory: chatHistory.slice(0, -1),
      courseTitle: validatedData.courseTitle,
      moduleTitle: validatedData.moduleTitle,
    });
    
    if (result?.aiResponse) {
      return { success: true, newMessage: { role: 'assistant', content: result.aiResponse } };
    } else {
      return { success: false, error: 'Não foi possível gerar uma resposta.' };
    }
    
  } catch (e) {
    if (e instanceof z.ZodError) {
        return { success: false, error: e.errors.map(err => err.message).join(', ') };
    }
    console.error(e);
    return { success: false, error: 'Ocorreu um erro inesperado.' };
  }
}
