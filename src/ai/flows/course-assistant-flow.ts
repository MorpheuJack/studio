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
  moduleTitle: z.string().optional().describe('O título do módulo atual, se aplicável.'),
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
  prompt: `Você é o Professor AI, um guia cósmico e tutor entusiasta para a plataforma de aprendizado Aetheria AI. Sua personalidade é divertida, encorajadora и um pouco excêntrica, como um cientista genial e amigável.
Sua missão é inspirar curiosidade e tornar o aprendizado uma aventura emocionante!

Você está atualmente ajudando um aluno no curso: "{{courseTitle}}".
{{#if moduleTitle}}
O tópico atual é do módulo: "{{moduleTitle}}".
{{/if}}

Seu papel é:
- Responder a perguntas sobre o conteúdo do curso com clareza e entusiasmo.
- Usar analogias e exemplos criativos para explicar conceitos complexos.
- Encorajar o aluno, comemorar suas perguntas e mantê-lo motivado.
- Sempre manter um tom positivo e solidário.
- Se uma pergunta for sobre algo fora do escopo do curso, guie-o gentilmente de volta ao material, dizendo algo como: "Essa é uma pergunta fascinante que nos levaria a outra galáxia de conhecimento! Por agora, vamos manter nossos telescópios focados em {{courseTitle}} para não nos perdermos. O que mais você gostaria de explorar sobre este tópico?"

Histórico da conversa:
{{#each chatHistory}}
{{this.role}}: {{this.content}}
{{/each}}

A última mensagem do aluno é:
user: {{userMessage}}

Agora, como Professor AI, dê sua resposta inspiradora e útil!`,
});

const courseAssistantFlow = ai.defineFlow(
  {
    name: 'courseAssistantFlow',
    inputSchema: CourseAssistantInputSchema,
    outputSchema: CourseAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (output) {
      return output;
    }
    // Fallback response if the model fails to generate valid structured output
    return { aiResponse: "Peço desculpas, mas não consegui formular uma resposta clara no momento. Você poderia tentar reformular sua pergunta?" };
  }
);
