'use server';
/**
 * @fileOverview A flow for generating speech from text.
 *
 * - generateSpeech - A function that handles the text-to-speech process.
 * - GenerateSpeechInput - The input type for the generateSpeech function.
 * - GenerateSpeechOutput - The return type for the generateSpeech function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const GenerateSpeechInputSchema = z.string();
export type GenerateSpeechInput = z.infer<typeof GenerateSpeechInputSchema>;

const GenerateSpeechOutputSchema = z.object({
  media: z.string().describe("The generated audio as a data URI."),
});
export type GenerateSpeechOutput = z.infer<typeof GenerateSpeechOutputSchema>;

export async function generateSpeech(input: GenerateSpeechInput): Promise<GenerateSpeechOutput> {
  return ttsFlow(input);
}

const ttsFlow = ai.defineFlow(
  {
    name: 'ttsFlow',
    inputSchema: GenerateSpeechInputSchema,
    outputSchema: GenerateSpeechOutputSchema,
  },
  async (query) => {
    if (!query) {
      return { media: '' };
    }
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: query,
    });
    if (!media) {
      throw new Error('No media returned from TTS model');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const wavDataUri = 'data:audio/wav;base64,' + (await toWav(audioBuffer));
    return {
      media: wavDataUri,
    };
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: Buffer[] = [];
    writer.on('error', reject);
    writer.on('data', (d) => {
      bufs.push(d);
    });
    writer.on('end', () => {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
