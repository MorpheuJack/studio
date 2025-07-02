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
    let audioUrl = '';

    try {
      // 1. Generate text directly, expecting a simple text response.
      const response = await ai.generate({
        prompt: `Responda à seguinte pergunta de forma concisa e amigável: ${question}`,
      });
      
      const textResponse = response.text;

      if (textResponse) {
        aiResponse = textResponse;
        
        // 2. Generate speech only if text generation was successful
        try {
            const speech = await generateSpeech(aiResponse);
            audioUrl = speech.media;
        } catch (e) {
            console.error("Error generating speech in askAndSpeakFlow:", e);
            // Non-blocking: return text even if audio fails
        }
      } else {
        console.error("AI returned an empty text response.");
      }
    } catch (e) {
      console.error("Error generating text in askAndSpeakFlow:", e);
      // If text generation fails entirely, the default error message is used.
    }
    
    return {
      aiResponse: aiResponse,
      audioUrl: audioUrl,
    };
  }
);