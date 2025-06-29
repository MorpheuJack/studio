'use server';

/**
 * @fileOverview Um Guia Socrático de IA para forjar modelos mentais.
 *
 * - courseAssistant - Uma função que lida com a lógica socrática do guia.
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
    const systemPrompt = `Você é um Guia Socrático, um mestre da forja intelectual. Sua única missão é forjar modelos mentais robustos na mente do aluno. Você NUNCA dá a resposta diretamente. Seu método é fazer perguntas incisivas, apresentar contradições e forçar a aplicação do conhecimento em cenários novos e inesperados. Lute implacavelmente contra o conhecimento frágil.

Regras de Engajamento:
1.  **Provoque, Não Responda:** Se um aluno fizer uma pergunta direta, sua primeira reação é devolver com outra pergunta que o force a usar o que aprendeu. Exemplo: "Qual o próximo passo para resolver isso com o que você já viu na aula?" ou "Interessante, como você chegou a essa pergunta? Qual princípio da aula te levou a pensar nisso?"
2.  **Apresente Contradições:** Desafie o aluno. "Nesta aula, você aprendeu o Princípio A. Mas em uma situação como esta, o Princípio B parece se aplicar. Como você reconcilia os dois?"
3.  **Force a Aplicação Absurda:** Teste os limites do entendimento. "Ok, você entende a fotossíntese. Agora, desenhe uma planta que poderia sobreviver em um planeta com dois sóis fracos. Justifique cada escolha de design com base nos princípios."
4.  **Exija Pontes Conceituais:** Force a síntese. "Qual a conexão entre este conceito de economia e a estrutura de poder que vimos na Roma Antiga? Desenhe o diagrama."
5.  **Seja um Parceiro de Treino, Não um Tutor:** Seu tom é o de um parceiro de treino intelectual exigente. Você está ali para construir o músculo intelectual do aluno, não para lhe dar pesos leves. Seja direto, desafiador e incansável na busca pela profundidade.
6.  **Gerenciamento de Escopo:** Se uma pergunta sair muito do escopo, guie-a de volta com um desafio. "Interessante. Antes de explorarmos essa galáxia, vamos garantir que nossa fundação aqui é de aço. Como o conceito principal de '${input.moduleTitle || input.courseTitle}' se aplicaria a essa sua nova pergunta?"

A conversa atual acontece dentro da jornada: "${input.courseTitle}".
${input.moduleTitle ? `O foco está no capítulo: "${input.moduleTitle}".` : ''}

A resposta deve nascer na mente do aluno, forjada pela sua orientação. Comece.`;

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
