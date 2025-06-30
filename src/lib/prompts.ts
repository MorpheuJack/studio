export type Prompt = {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  tags: string[];
};

export const prompts: Prompt[] = [
  {
    id: 'p1',
    title: 'Analisador de Sentimento Socrático',
    description: 'Um prompt que força a IA a analisar o sentimento de um texto e justificar sua resposta com evidências, em vez de apenas dar uma etiqueta.',
    prompt: `Analise o seguinte texto e determine o sentimento (Positivo, Negativo, Neutro).

Sua tarefa não é apenas classificar, mas justificar sua resposta. Siga estes passos:
1.  **Classificação Inicial:** Forneça a etiqueta de sentimento.
2.  **Evidência Direta:** Cite as palavras ou frases específicas do texto que te levaram a essa conclusão.
3.  **Raciocínio:** Explique *por que* essas palavras/frases indicam o sentimento escolhido, considerando o contexto.
4.  **Contra-argumento:** Existe alguma ambiguidade? Alguma frase poderia ser interpretada de outra forma? Explore isso.

Texto para análise:
"O novo sistema foi implementado e, embora a equipe esteja se adaptando, a velocidade inicial de processamento parece um pouco mais lenta do que o esperado. No entanto, a interface é incrivelmente intuitiva e já recebemos feedback positivo sobre a facilidade de uso."`,
    category: 'Análise de Dados',
    tags: ['Sentimento', 'Raciocínio', 'Texto'],
  },
  {
    id: 'p2',
    title: 'Gerador de Ideias para UI/UX',
    description: 'Um prompt para brainstorming de soluções de interface, forçando a IA a pensar em termos de problemas do usuário e primeiros princípios.',
    prompt: `Você é um especialista em Design de Experiência do Usuário (UX). Sua tarefa é gerar 3 abordagens de design distintas para a seguinte funcionalidade, baseando-se em primeiros princípios.

**Funcionalidade:** Um sistema de agendamento de reuniões dentro de um aplicativo de chat.

Para cada uma das 3 abordagens, descreva:
1.  **O Princípio Central:** Qual é a principal filosofia de design por trás desta abordagem (ex: "Menor Carga Cognitiva", "Flexibilidade Total", "Integração Perfeita com o Fluxo de Conversa").
2.  **Fluxo do Usuário:** Descreva passo a passo como o usuário interagiria com a interface para agendar uma reunião.
3.  **Componentes Chave da UI:** Quais elementos de interface seriam necessários (ex: seletor de data, visualização de calendário, botões de confirmação, etc.)?
4.  **Prós e Contras:** Quais são as vantagens e desvantagens dessa abordagem em termos de usabilidade e complexidade de desenvolvimento?`,
    category: 'Design',
    tags: ['UI/UX', 'Brainstorming', 'Figma'],
  },
  {
    id: 'p3',
    title: 'Refatoração de Código com Testes',
    description: 'Um prompt que guia a IA para refatorar um trecho de código, exigindo que ela explique as melhorias e sugira testes unitários.',
    prompt: `Atue como um Engenheiro de Software Sênior especializado em código limpo. Sua tarefa é refatorar o seguinte trecho de código em JavaScript.

**Código para Refatorar:**
\`\`\`javascript
function processData(data) {
  var result = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].type == 'A' && data[i].value > 10) {
      result.push({id: data[i].id, val: data[i].value * 1.2});
    }
  }
  return result;
}
\`\`\`

**Sua Resposta Deve Incluir:**
1.  **Código Refatorado:** Apresente a versão melhorada do código, utilizando práticas modernas de JavaScript (ES6+), como nomes de variáveis claros, métodos de array e imutabilidade.
2.  **Justificativa das Mudanças:** Explique as principais melhorias que você fez e por que elas tornam o código mais legível, eficiente e manutenível.
3.  **Sugestão de Testes Unitários:** Escreva pelo menos 2 casos de teste (usando um framework como Jest) para verificar se a função refatorada se comporta como esperado, incluindo um caso de sucesso e um caso de borda (ex: array vazio).`,
    category: 'Programação',
    tags: ['Refatoração', 'JavaScript', 'Testes'],
  },
    {
    id: 'p4',
    title: 'Criador de Personas de Marketing',
    description: 'Gere personas de marketing detalhadas com base em dados demográficos e psicográficos para guiar a estratégia de conteúdo.',
    prompt: `Crie uma persona de marketing detalhada para um novo produto.

**Produto:** Um aplicativo de meditação guiada para iniciantes que sofrem de ansiedade.

**A Persona Deve Incluir as Seguintes Seções:**
1.  **Informações Demográficas:** Nome, idade, profissão, renda, localização.
2.  **História e Background:** Um breve parágrafo descrevendo sua rotina diária e desafios.
3.  **Objetivos:** O que essa persona deseja alcançar (relacionado ao produto e à vida).
4.  **Frustrações (Dores):** Quais são os principais obstáculos e fontes de estresse que ela enfrenta?
5.  **Motivações:** O que a impulsiona? O que a faria buscar uma solução como o nosso aplicativo?
6.  **Citação:** Uma frase curta que resuma sua mentalidade.
7.  **Canais de Comunicação:** Onde podemos encontrar e nos comunicar com essa persona (redes sociais, blogs, fóruns, etc.)?`,
    category: 'Marketing',
    tags: ['Persona', 'Estratégia', 'Público-alvo'],
  },
];

export const getAllPrompts = () => {
  return prompts;
};
