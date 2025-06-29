'use server';

/**
 * @fileOverview Um copiloto de IA conversacional para jornadas de aprendizado.
 *
 * - courseAssistant - Uma função que lida com a lógica de conversação do copiloto.
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
  courseTitle: z.string().describe('O título da jornada que o aluno está fazendo.'),
  moduleTitle: z.string().optional().describe('O título do capítulo atual, se aplicável.'),
  chatHistory: z.array(ChatHistoryItemSchema).describe('O histórico da conversa até agora.'),
  userMessage: z.string().describe('A última mensagem do aluno.'),
});
export type CourseAssistantInput = z.infer<typeof CourseAssistantInputSchema>;

const CourseAssistantOutputSchema = z.object({
  aiResponse: z.string().describe("A resposta do copiloto de IA para o aluno."),
});
export type CourseAssistantOutput = z.infer<typeof CourseAssistantOutputSchema>;

export async function courseAssistant(input: CourseAssistantInput): Promise<CourseAssistantOutput> {
  return courseAssistantFlow(input);
}

const courseAssistantFlow = ai.defineFlow(
  {
    name: 'courseAssistantFlow',
    inputSchema: CourseAssistantInputSchema,
    outputSchema: CourseAssistantOutputSchema,
  },
  async (input) => {
    const systemPrompt = `Você é o Copiloto de IA, a ponte entre o conhecimento e a mente do aluno no movimento Revolução Cognitiva. Sua identidade é a de um mestre sábio, provocador e infinitamente paciente. Sua missão não é dar respostas, mas provocar a conversa que leva ao despertar do conhecimento. Você é a personificação da nossa filosofia: aprender é um diálogo. Seu tom é confiante, visionário e claro.

A conversa atual acontece dentro da jornada: "${input.courseTitle}".
${input.moduleTitle ? `O foco está no capítulo: "${input.moduleTitle}".` : ''}

Seu papel é:
- Fazer perguntas que provoquem o raciocínio, em vez de apenas entregar fatos.
- Usar analogias poderosas para iluminar conceitos complexos.
- Celebrar a curiosidade do aluno. Cada pergunta é um passo na revolução pessoal dele.
- Manter um tom que inspira confiança e curiosidade.
- Se uma pergunta sair do escopo da jornada, guie-a de volta com elegância, dizendo algo como: "Essa é uma galáxia fascinante, mas nossa expedição atual está focada em ${input.courseTitle}. Vamos primeiro dominar este universo. O que mais sobre este tópico desperta sua curiosidade?"`;

    const history = input.chatHistory.map((h) => ({
      role: h.role === 'assistant' ? ('model' as const) : ('user' as const),
      content: [{ text: h.content }],
    }));

    try {
      const { output } = await ai.generate({
        history: history,
        prompt: input.userMessage,
        system: systemPrompt,
        output: {
          schema: CourseAssistantOutputSchema,
        },
      });

      if (output) {
        return output;
      }
    } catch (e) {
      console.error("Error generating AI response:", e);
    }
    
    return { aiResponse: "Minha centelha de IA piscou por um momento. Poderia reformular a pergunta para reacendermos esta conversa?" };
  }
);
