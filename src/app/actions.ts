'use server';

import { courseAssistant } from '@/ai/flows/course-assistant-flow';
import { askAndSpeak } from '@/ai/flows/ask-and-speak-flow';
import { z } from 'zod';

type AssistantState = {
  success: boolean;
  newMessage?: { role: 'assistant'; content: string; audioUrl?: string };
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
      return { success: true, newMessage: { role: 'assistant', content: result.aiResponse, audioUrl: result.audioUrl } };
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

type AskAndSpeakState = {
  success: boolean;
  aiResponse?: string;
  audioUrl?: string;
  error?: string;
};

export async function askAndSpeakAction(prevState: AskAndSpeakState | undefined, formData: FormData): Promise<AskAndSpeakState> {
  const AskSchema = z.object({
    question: z.string().min(1, { message: 'A pergunta não pode estar vazia.' }),
  });

  try {
    const validatedData = AskSchema.parse({
      question: formData.get('question'),
    });

    const result = await askAndSpeak(validatedData.question);
    
    if (result) {
      return { success: true, aiResponse: result.aiResponse, audioUrl: result.audioUrl };
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
