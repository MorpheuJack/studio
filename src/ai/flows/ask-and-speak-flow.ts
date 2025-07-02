'use server';

/**
 * @fileOverview A flow that answers a question and generates speech for the answer.
 * - askAndSpeak - A function that handles the text generation and TTS process.
 * - AskAndSpeakInput - The input type for the askAndSpeak function.
 * - AskAndSpeakOutput - The return type for the askAndSpeak function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { generateSpeech } from './tts-flow';

const AskAndSpeakInputSchema = z.string().describe("The user's question.");
export type AskAndSpeakInput = z.infer<typeof AskAndSpeakInputSchema>;

const AskAndSpeakOutputSchema = z.object({
  aiResponse: z.string().describe("The AI's text response to the question."),
  audioUrl: z.string().describe("The data URI for the AI's spoken response."),
});
export type AskAndSpeakOutput = z.infer<typeof AskAndSpeakOutputSchema>;

export async function askAndSpeak(input: AskAndSpeakInput): Promise<AskAndSpeakOutput> {
  return askAndSpeakFlow(input);
}

const askAndSpeakFlow = ai.defineFlow(
  {
    name: 'askAndSpeakFlow',
    inputSchema: AskAndSpeakInputSchema,
    outputSchema: AskAndSpeakOutputSchema,
  },
  async (question) => {
    let aiResponse = "Não consegui pensar em uma resposta. Tente novamente.";
    
    // 1. Generate a text response
    try {
      const { text } = await ai.generate({
        prompt: `Responda à seguinte pergunta de forma concisa e direta, como se estivesse falando com alguém. Seja breve e amigável. Pergunta: "${question}"`,
      });
      if (text) {
        aiResponse = text;
      }
    } catch (e) {
      console.error("Error generating text in askAndSpeakFlow:", e);
      // Use the default error message if text generation fails.
    }

    // 2. Generate speech from the text response
    let audioUrl = '';
    try {
      if (aiResponse) {
          const speech = await generateSpeech(aiResponse);
          audioUrl = speech.media;
      }
    } catch (e) {
        console.error("Error generating speech in askAndSpeakFlow:", e);
        // Do not block the response if TTS fails. The client can handle the missing audioUrl.
    }
    
    return {
      aiResponse: aiResponse,
      audioUrl: audioUrl,
    };
  }
);
