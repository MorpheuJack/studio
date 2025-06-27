'use server';

/**
 * @fileOverview Um assistente de IA conversacional para cursos.
 *
 * - courseAssistant - Uma função que lida com a lógica de conversação do assistente.
 * - CourseAssistantInput - O tipo de entrada para a função courseAssistant.
 * - CourseAssistantOutput - O tipo de retorno para a função courseAssistant.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatHistoryItemSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

const CourseAssistantInputSchema = z.object({
  courseTitle: z.string().describe('O título do curso que o aluno está fazendo.'),
  moduleTitle: z.string().describe('O título do módulo atual.'),
  chatHistory: z.array(ChatHistoryItemSchema).describe('O histórico da conversa até agora.'),
  userMessage: z.string().describe('A última mensagem do aluno.'),
});
export type CourseAssistantInput = z.infer<typeof CourseAssistantInputSchema>;

const CourseAssistantOutputSchema = z.object({
  aiResponse: z.string().describe("A resposta do assistente de IA para o aluno."),
});
export type CourseAssistantOutput = z.infer<typeof CourseAssistantOutputSchema>;

export async function courseAssistant(input: CourseAssistantInput): Promise<CourseAssistantOutput> {
  return courseAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'courseAssistantPrompt',
  input: {schema: CourseAssistantInputSchema},
  output: {schema: CourseAssistantOutputSchema},
  prompt: `Você é o Professor AI, um assistente de ensino prestativo e amigável para a plataforma de cursos online Aetheria AI.
Você está auxiliando um aluno no curso intitulado "{{courseTitle}}", especificamente no módulo "{{moduleTitle}}".

Seu papel é responder às perguntas dos alunos sobre o conteúdo do curso, esclarecer conceitos e fornecer exemplos úteis. Seja encorajador e solidário.
Mantenha suas respostas concisas e fáceis de entender.
Se uma pergunta estiver fora do escopo do curso, recuse educadamente a resposta e guie o aluno de volta ao material do curso.

Aqui está o histórico da conversa até agora:
{{#each chatHistory}}
{{this.role}}: {{this.content}}
{{/each}}

Aqui está a última mensagem do aluno:
user: {{userMessage}}

Forneça sua resposta como o assistente.`,
});

const courseAssistantFlow = ai.defineFlow(
  {
    name: 'courseAssistantFlow',
    inputSchema: CourseAssistantInputSchema,
    outputSchema: CourseAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
