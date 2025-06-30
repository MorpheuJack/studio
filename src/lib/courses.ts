
export type ComplementaryMaterial = {
  type: 'tool' | 'book' | 'pdf';
  name: string;
  url: string;
  description: string;
};

export type Lesson = {
  id: string;
  title: string;
  type: 'video' | 'article' | 'code';
  duration: number; // in minutes
  content: string;
  starterCode?: string;
  complementaryMaterials?: ComplementaryMaterial[];
  audioUrl?: string;
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tools: string[];
  image: string;
  mobileImage?: string;
  category: string;
  modules: Module[];
  'data-ai-hint'?: string;
  backgroundVideo?: string;
  highlights: string[];
  previewVideoUrl?: string;
};

export const courses: Course[] = [
  {
    id: 'c1',
    title: 'Engenharia de Prompt para Gemini',
    description: 'Esqueça as respostas prontas. Aprenda a fazer as perguntas que forjam o entendimento profundo e comande a inteligência.',
    longDescription: 'Nesta forja, você não vai decorar truques de prompt. Você vai construir o modelo mental de como a IA pensa. Através de desafios socráticos, você aprenderá a construir diálogos que testam, contradizem e aprofundam seu domínio sobre os modelos de linguagem, transformando-os em verdadeiros parceiros intelectuais.',
    tools: ['Gemini', 'Google AI Studio', 'Next.js', 'TypeScript'],
    image: '/img/p-curso-destaque.jpg',
    mobileImage: '/img/pr-curso-vertical.jpg',
    'data-ai-hint': 'glowing code',
    category: 'IA',
    highlights: ['Técnicas de Prompt Chaining', 'Construção de Chatbots', 'Aprendizado Few-Shot', 'Otimização de Respostas'],
    previewVideoUrl: 'https://www.youtube.com/embed/cFIlta1GkiE',
    modules: [
      {
        id: 'm1',
        title: 'Módulo 1: Fundamentos da Forja de Prompts',
        lessons: [
          { 
            id: 'l1_1', 
            title: 'Desafiando a Inteligência', 
            type: 'video', 
            duration: 25, 
            content: 'Esta lição destrói a ideia de que prompts são apenas perguntas. Exploramos como construir instruções que forçam a IA a raciocinar, justificar e criar, em vez de apenas regurgitar informação. É o primeiro passo para transformar a IA de um oráculo para um parceiro de forja.',
            complementaryMaterials: [
                { type: 'tool', name: 'Google AI Studio', url: '#', description: 'A arena para seus primeiros desafios de prompt.' },
                { type: 'book', name: 'The Socratic Method for AI', url: '#', description: 'Um guia sobre como questionar a máquina.' }
            ],
            audioUrl: '/audio/c1-l1_1.wav',
          },
          {
            id: 'l1_challenge',
            title: 'Desafio Prático: O Construtor de Prompts',
            type: 'code',
            duration: 30,
            content: "Sua missão é forjar uma ferramenta para construir prompts eficazes. No editor, crie uma interface HTML com campos de texto para 'Persona da IA', 'Tarefa a ser executada' e 'Contexto'. Usando JavaScript, faça com que um botão 'Gerar Prompt' combine os valores desses campos em um único prompt estruturado e o exiba na tela.",
            starterCode: `// HTML - Crie sua estrutura aqui.
<div id="app" style="color: #eee; font-family: sans-serif;">
  <h2>Construtor de Prompts</h2>
  <label for="persona">Persona da IA:</label>
  <textarea id="persona" rows="2" placeholder="Ex: Você é um historiador especialista..."></textarea>
  <label for="tarefa">Tarefa a ser executada:</label>
  <textarea id="tarefa" rows="3" placeholder="Ex: Explique as causas da Revolução Francesa..."></textarea>
  <label for="contexto">Contexto Adicional:</label>
  <textarea id="contexto" rows="2" placeholder="Ex: Foque nos aspectos econômicos..."></textarea>
  <button id="gerarBtn">Gerar Prompt</button>
  <h3>Prompt Gerado:</h3>
  <pre id="resultado"></pre>
</div>

// CSS - Estilize sua ferramenta.
#app { padding: 1rem; }
textarea, input, label { display: block; width: 95%; background: #27272a; border: 1px solid #3f3f46; color: #eee; padding: 8px; margin-bottom: 10px; border-radius: 4px; }
label { margin-bottom: 4px; font-weight: bold; border: none; background: transparent; padding: 0;}
button { background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; font-weight: bold; }
#resultado { margin-top: 1rem; background: #27272a; padding: 1rem; border-radius: 4px; white-space: pre-wrap; min-height: 100px; border: 1px solid #3f3f46;}

// JAVASCRIPT - Implemente a lógica.
const personaInput = document.getElementById('persona');
const tarefaInput = document.getElementById('tarefa');
const contextoInput = document.getElementById('contexto');
const gerarBtn = document.getElementById('gerarBtn');
const resultadoPre = document.getElementById('resultado');

gerarBtn.addEventListener('click', () => {
  const promptFinal = \`
Persona: \${personaInput.value}

Tarefa: \${tarefaInput.value}

Contexto: \${contextoInput.value}
  \`;
  resultadoPre.textContent = promptFinal.trim();
});
`,
          },
        ],
      },
      {
        id: 'm2',
        title: 'Módulo 2: Dominando a Arte do Diálogo Socrático',
        lessons: [
          { 
            id: 'l2_1', 
            title: 'Forjando Lógica com Chaining e Few-Shot', 
            type: 'video', 
            duration: 30, 
            content: 'Aprenda a construir raciocínios complexos encadeando desafios e a ensinar a IA a executar tarefas com poucos exemplos, forçando-a a generalizar. Construiremos um mini-aplicativo que usa essas técnicas para criar um assistente de escrita criativa que desafia o escritor.',
            complementaryMaterials: [
                { type: 'tool', name: 'LangChain', url: '#', description: 'Framework para desenvolvimento de aplicações com LLMs.' },
                { type: 'pdf', name: 'Artigo sobre Few-Shot Learning', url: '#', description: 'Paper acadêmico sobre a técnica.' }
            ],
            audioUrl: '/audio/c1-l2_1.wav',
          },
          { 
            id: 'l2_2', 
            title: 'Construindo um Guia Socrático com Contexto', 
            type: 'article', 
            duration: 45, 
            content: 'Esta lição prática guia você na construção de um chatbot que não apenas lembra, mas desafia. Você aprenderá a gerenciar o histórico de diálogo para criar interações que forçam a profundidade e a consistência do pensamento. Usaremos os conceitos das lições anteriores para criar um chatbot que treina a equipe de vendas.',
            complementaryMaterials: [
              { type: 'tool', name: 'Genkit', url: '#', description: 'Toolkit de IA da Google.' },
            ],
            audioUrl: '/audio/c1-l2_2.wav',
          },
          { 
            id: 'l2_3', 
            title: 'Desafio Prático: Componente Interativo', 
            type: 'code', 
            duration: 60, 
            content: 'Teoria sem prática é conhecimento frágil. Use o estúdio abaixo para construir um componente de contador simples em HTML e JavaScript. Veja o resultado do seu código ser renderizado em tempo real. Este é o primeiro passo para forjar aplicações reais.',
            starterCode: `// HTML - Adicione seu HTML na div com id="app"
<div id="app">
  <h1>Contador</h1>
  <p>Cliques: <span id="count">0</span></p>
  <button id="incrementBtn" class="btn">Incrementar</button>
  <button id="decrementBtn" class="btn">Decrementar</button>
</div>

// CSS - Estilize seu componente
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #27272a;
  color: #fafafa;
}
#app {
  text-align: center;
  padding: 2rem;
  border-radius: 12px;
  background-color: #18181b;
  border: 1px solid #3f3f46;
}
.btn {
  margin: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  color: #18181b;
  background-color: #5eead4;
  font-weight: 600;
}

// JAVASCRIPT - Adicione a lógica
const countEl = document.getElementById('count');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');

let count = 0;

function updateCounter() {
  countEl.textContent = count;
}

incrementBtn.addEventListener('click', () => {
  count++;
  updateCounter();
});

decrementBtn.addEventListener('click', () => {
  count--;
  updateCounter();
});
`,
            audioUrl: '/audio/c1-l2_3.wav',
          },
          {
            id: 'l2_challenge',
            title: "Desafio Final: Simulador de Diálogo Socrático",
            type: 'code',
            duration: 45,
            content: "Prove seu domínio sobre fluxos de conversa. Usando o array de diálogos fornecido no JavaScript, crie uma interface de chat que exibe uma pergunta do 'Guia' de cada vez. Um botão 'Próximo' deve avançar a conversa, mostrando a próxima fala do Guia, simulando um diálogo socrático.",
            starterCode: `// HTML - Crie a interface do chat.
<div id="app" style="color: #eee; font-family: sans-serif;">
  <h2>Simulador Socrático</h2>
  <div id="chatbox"></div>
  <button id="nextBtn">Próxima Fala</button>
</div>

// CSS - Estilize o chat.
#chatbox { height: 300px; overflow-y: auto; border: 1px solid #3f3f46; padding: 10px; margin-bottom: 10px; border-radius: 8px; background: #27272a;}
.guia-message { text-align: left; background: #3f3f46; padding: 8px 12px; border-radius: 8px; margin-bottom: 8px; max-width: 80%; }
button { margin-top: 10px; background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; font-weight: bold; }

// JAVASCRIPT - Implemente a lógica do diálogo.
const dialogo = [
  "Guia: Se você tem um martelo, tudo parece um prego. Como essa ideia se aplica ao aprender uma nova tecnologia?",
  "Guia: Exato. Agora, qual o perigo de ver apenas 'pregos' ao tentar resolver um problema complexo com essa nova tecnologia?",
  "Guia: E como você pode se forçar a ver além do 'martelo' para encontrar a solução verdadeiramente elegante?",
  "Guia: Parabéns. Você forjou um novo modelo mental."
];
let passoAtual = 0;
const chatbox = document.getElementById('chatbox');
const nextBtn = document.getElementById('nextBtn');

function mostrarMensagem() {
  if (passoAtual < dialogo.length) {
    const p = document.createElement('p');
    p.className = 'guia-message';
    p.textContent = dialogo[passoAtual];
    chatbox.appendChild(p);
    chatbox.scrollTop = chatbox.scrollHeight;
  }
  if (passoAtual >= dialogo.length -1) {
    nextBtn.disabled = true;
    nextBtn.textContent = "Fim do Diálogo";
  }
}

nextBtn.addEventListener('click', () => {
  passoAtual++;
  mostrarMensagem();
});

// Mostra a primeira mensagem
mostrarMensagem();
`,
          },
        ],
      },
    ],
  },
  {
    id: 'c2',
    title: 'Design de Interfaces para IA',
    description: 'Modele a ponte entre a mente humana e a inteligência artificial. Crie experiências que traduzem o complexo em intuição.',
    longDescription: 'Design para IA não é sobre desenhar telas, é sobre esculpir a confiança. Nesta jornada, você construirá o modelo mental para criar produtos de IA que se sentem como uma extensão da mente do usuário. Aprenda a comunicar os poderes e os limites da inteligência, transformando o complexo em algo magicamente intuitivo.',
    tools: ['Figma', 'Miro', 'React', 'Component-Driven Design'],
    image: '/img/des-curso-destaque.jpg',
    mobileImage: '/img/des-curso-vertical.jpg',
    'data-ai-hint': 'futuristic interface',
    category: 'Design',
    highlights: ['Princípios de UX para IA', 'Prototipagem Interativa', 'Design de Chatbots', 'Visualização de Dados'],
    previewVideoUrl: 'https://www.youtube.com/embed/cFIlta1GkiE',
    modules: [
      {
        id: 'm3',
        title: 'Módulo 1: Forjando a Confiança do Usuário',
        lessons: [
          { id: 'l3_1', title: 'Princípios de UX para IA', type: 'article', duration: 20, content: 'Explore os princípios fundamentais para projetar boas experiências com IA, incluindo explicabilidade, controle do usuário e gerenciamento de expectativas. Entender esses princípios é essencial para criar produtos de IA que as pessoas confiem e gostem de usar.', audioUrl: '/audio/c2-l3_1.wav' },
          { id: 'l3_2', title: 'Prototipando um Chatbot no Figma', type: 'video', duration: 35, content: 'Uma introdução prática ao design e prototipagem de uma interface de chatbot no Figma. Abordaremos como projetar fluxos de conversa, estados de mensagem (enviando, recebido, erro) e como criar um protótipo interativo para testar a experiência do usuário antes do desenvolvimento.', audioUrl: '/audio/c2-l3_2.wav' },
          {
            id: 'l3_challenge',
            title: "Desafio Prático: Design da Confiança",
            type: 'code',
            duration: 35,
            content: "Sua tarefa é projetar e construir (com HTML e CSS) um componente de UI que exiba uma resposta gerada por IA, mas que também comunique visualmente o nível de confiança da IA naquela resposta. Pense em como usar cores, ícones ou barras para transmitir se a confiança é 'Alta', 'Média' ou 'Baixa'.",
            starterCode: `// HTML - Construa os componentes de UI aqui.
<div id="app" style="color: #eee; font-family: sans-serif;">
  <h2>Respostas da IA</h2>
  
  <div class="resposta confianca-alta">
    <div class="header"><strong>Confiança Alta</strong></div>
    <p>A capital da França é Paris.</p>
  </div>
  
  <div class="resposta confianca-media">
    <div class="header"><strong>Confiança Média</strong></div>
    <p>É provável que o evento aconteça na próxima semana.</p>
  </div>

  <div class="resposta confianca-baixa">
    <div class="header"><strong>Confiança Baixa</strong></div>
    <p>A previsão sugere chuva, mas o tempo está instável.</p>
  </div>
</div>

// CSS - Estilize os diferentes estados de confiança.
.resposta { 
  border-left: 5px solid; 
  padding: 1rem; 
  margin: 1rem 0; 
  background: #27272a; 
  border-radius: 4px;
}
.resposta .header {
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  opacity: 0.8;
}
.confianca-alta { 
  border-color: #22c55e; /* Verde */ 
  color: #dcfce7;
}
.confianca-alta .header { color: #22c55e; }

.confianca-media { 
  border-color: #facc15; /* Amarelo */ 
  color: #fef9c3;
}
.confianca-media .header { color: #facc15; }

.confianca-baixa {
  border-color: #ef4444; /* Vermelho */
  color: #fee2e2;
}
.confianca-baixa .header { color: #ef4444; }


// JAVASCRIPT - Não é necessário para este desafio de design.
// Foco em HTML e CSS.
`,
          },
        ],
      },
    ],
  },
  {
    id: 'c3',
    title: 'Marketing com um Guia de IA',
    description: 'Construa o modelo mental do seu cliente. Use a IA não para automatizar, mas para entender o comportamento humano em uma escala sem precedentes.',
    longDescription: 'Marketing de sucesso é um reflexo de um profundo modelo mental sobre o comportamento humano. Nesta forja, você usará a IA não como uma ferramenta de automação, mas como um microscópio para a psicologia do consumidor. Lute com os dados, construa hipóteses e forje uma intuição sobre o mercado que nenhuma análise superficial pode oferecer.',
    tools: ['Google Analytics', 'HubSpot', 'ChatGPT', 'Midjourney'],
    image: '/img/programador-curso-destaque.jpg',
    mobileImage: '/img/programador-curso-vertical.jpg',
    'data-ai-hint': 'data analytics',
    category: 'Marketing',
    highlights: ['Geração de Conteúdo com IA', 'Análise de Sentimento', 'Otimização de SEO', 'Automação de Campanhas'],
    previewVideoUrl: 'https://www.youtube.com/embed/cFIlta1GkiE',
    modules: [
        {
          id: 'm4',
          title: 'Módulo 1: Forjando Conteúdo com IA',
          lessons: [
            { id: 'l4_1', title: 'Criando Posts para Blog com IA', type: 'article', duration: 15, content: 'Esta lição mostra como usar geradores de texto de IA para criar rascunhos de posts para blogs. Aprenderemos a criar prompts eficazes para definir o tom, o público e as palavras-chave, e como refinar o conteúdo gerado para garantir qualidade e originalidade.', audioUrl: '/audio/c3-l4_1.wav' },
            { id: 'l4_2', title: 'Análise de Sentimento em Mídias Sociais', type: 'video', duration: 40, content: 'Aprenda a usar APIs de IA para analisar o sentimento em comentários de mídias sociais. Este vídeo aborda como coletar dados e usar a IA para classificar automaticamente os comentários como positivos, negativos ou neutros, fornecendo insights valiosos sobre a percepção da sua marca.', audioUrl: '/audio/c3-l4_2.wav' },
            {
              id: 'l4_challenge',
              title: "Desafio Final: O Painel de Insights do Cliente",
              type: 'code',
              duration: 40,
              content: "Você recebeu um conjunto de dados de reviews de clientes. Sua missão é usar JavaScript para processar esses dados e exibir um resumo de marketing no painel de resultados. Calcule e exiba: 1) A nota média de avaliação. 2) O número total de reviews. 3) A porcentagem de reviews positivos (nota 4 ou 5).",
              starterCode: `// HTML - Crie a estrutura para exibir os resultados.
<div id="app" style="color: #eee; font-family: sans-serif;">
  <h2>Painel de Marketing</h2>
  <div id="resultados"></div>
</div>

// CSS - Estilize seu painel.
#app { padding: 1rem; }
#resultados { font-size: 1.1em; line-height: 1.8; background: #27272a; padding: 1rem; border-radius: 8px; border: 1px solid #3f3f46; }
#resultados p { margin: 0.5rem 0; }
#resultados strong { color: hsl(var(--primary)); }

// JAVASCRIPT - Processe os dados e exiba os resultados.
const reviews = [
  { id: 1, nota: 5, comentario: "Excelente produto!" },
  { id: 2, nota: 4, comentario: "Muito bom, atendeu às expectativas." },
  { id: 3, nota: 2, comentario: "Decepcionante, quebrou na primeira semana." },
  { id: 4, nota: 5, comentario: "Recomendo a todos!" },
  { id: 5, nota: 3, comentario: "É ok, mas poderia ser melhor." },
  { id: 6, nota: 1, comentario: "Não comprem, péssima qualidade." },
  { id: 7, nota: 4, comentario: "Bom custo-benefício." }
];

const resultadosDiv = document.getElementById('resultados');

// 1. Calcular o total de reviews
const totalReviews = reviews.length;

// 2. Calcular a nota média
const somaDasNotas = reviews.reduce((acc, review) => acc + review.nota, 0);
const mediaNotas = somaDasNotas / totalReviews;

// 3. Calcular a porcentagem de reviews positivos (nota >= 4)
const reviewsPositivos = reviews.filter(review => review.nota >= 4).length;
const percPositivos = (reviewsPositivos / totalReviews) * 100;

// Exiba os resultados no HTML
resultadosDiv.innerHTML = \`
  <p>Total de Reviews: <strong>\${totalReviews}</strong></p>
  <p>Nota Média: <strong>\${mediaNotas.toFixed(1)} de 5</strong></p>
  <p>Reviews Positivos: <strong>\${percPositivos.toFixed(0)}%</strong></p>
\`;
`,
            },
          ],
        },
    ]
  },
];

export const getCoursesByCategory = (category: string, limit: number = 2) => {
    return courses.filter(course => course.category === category).slice(0, limit);
};

export const getCourseById = (id: string) => {
    return courses.find(course => course.id === id);
}

export const getLessonByIds = (courseId: string, lessonId: string) => {
    const course = getCourseById(courseId);
    if (!course) return null;
    for (const module of course.modules) {
        const lesson = module.lessons.find(lesson => lesson.id === lessonId);
        if (lesson) return { course, module, lesson };
    }
    return null;
}
