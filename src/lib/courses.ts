
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
            ]
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
            ]
          },
          { 
            id: 'l2_2', 
            title: 'Construindo um Guia Socrático com Contexto', 
            type: 'article', 
            duration: 45, 
            content: 'Esta lição prática guia você na construção de um chatbot que não apenas lembra, mas desafia. Você aprenderá a gerenciar o histórico de diálogo para criar interações que forçam a profundidade e a consistência do pensamento. Usaremos os conceitos das lições anteriores para criar um chatbot que treina a equipe de vendas.',
            complementaryMaterials: [
              { type: 'tool', name: 'Genkit', url: '#', description: 'Toolkit de IA da Google.' },
            ]
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
`
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
          { id: 'l3_1', title: 'Princípios de UX para IA', type: 'article', duration: 20, content: 'Explore os princípios fundamentais para projetar boas experiências com IA, incluindo explicabilidade, controle do usuário e gerenciamento de expectativas. Entender esses princípios é essencial para criar produtos de IA que as pessoas confiem e gostem de usar.' },
          { id: 'l3_2', title: 'Prototipando um Chatbot no Figma', type: 'video', duration: 35, content: 'Uma introdução prática ao design e prototipagem de uma interface de chatbot no Figma. Abordaremos como projetar fluxos de conversa, estados de mensagem (enviando, recebido, erro) e como criar um protótipo interativo para testar a experiência do usuário antes do desenvolvimento.' },
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
            { id: 'l4_1', title: 'Criando Posts para Blog com IA', type: 'article', duration: 15, content: 'Esta lição mostra como usar geradores de texto de IA para criar rascunhos de posts para blogs. Aprenderemos a criar prompts eficazes para definir o tom, o público e as palavras-chave, e como refinar o conteúdo gerado para garantir qualidade e originalidade.' },
            { id: 'l4_2', title: 'Análise de Sentimento em Mídias Sociais', type: 'video', duration: 40, content: 'Aprenda a usar APIs de IA para analisar o sentimento em comentários de mídias sociais. Este vídeo aborda como coletar dados e usar a IA para classificar automaticamente os comentários como positivos, negativos ou neutros, fornecendo insights valiosos sobre a percepção da sua marca.' },
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
