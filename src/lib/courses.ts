
export type Lesson = {
  id: string;
  title: string;
  type: 'video' | 'article';
  duration: number; // in minutes
  content: string;
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
  instructor: {
    name: string;
    title: string;
    avatar: string;
  };
  image: string;
  category: string;
  modules: Module[];
  'data-ai-hint'?: string;
  backgroundVideo?: string;
};

export const courses: Course[] = [
  {
    id: 'c1',
    title: 'Engenharia de Prompt para Gemini',
    description: 'Aprenda a criar prompts eficazes para extrair o máximo dos modelos de IA generativa.',
    longDescription: 'Este curso mergulha na arte e ciência da engenharia de prompt. Você aprenderá a estruturar suas perguntas e instruções para obter respostas precisas, criativas e contextualmente relevantes dos modelos de linguagem mais avançados do Google, como o Gemini. Abordaremos desde técnicas básicas até estratégias avançadas para tarefas complexas.',
    instructor: {
      name: 'Dr. Evelyn Reed',
      title: 'Engenheira de IA Sênior',
      avatar: 'https://placehold.co/100x100.png',
    },
    image: '/gemini.jpeg',
    'data-ai-hint': 'glowing code',
    category: 'IA',
    backgroundVideo: '/video-t.mp4',
    modules: [
      {
        id: 'm1',
        title: 'Módulo 1: Fundamentos da IA Generativa',
        lessons: [
          { id: 'l1_1', title: 'O que são Prompts?', type: 'video', duration: 25, content: 'Esta lição introduz o conceito fundamental de prompts em modelos de IA generativa. Exploramos como os prompts guiam o modelo para gerar a saída desejada e por que a qualidade do prompt é crucial para a qualidade da resposta. Veremos exemplos práticos de prompts bons e ruins.' },
        ],
      },
      {
        id: 'm2',
        title: 'Módulo 2: Técnicas Avançadas',
        lessons: [
          { id: 'l2_1', title: 'Prompt Chaining e Few-Shot Learning', type: 'video', duration: 30, content: 'Aprenda técnicas avançadas como o encadeamento de prompts para resolver problemas complexos em etapas e o "few-shot learning" para ensinar o modelo a executar tarefas com poucos exemplos. Construiremos um mini-aplicativo que usa essas técnicas para criar um assistente de escrita criativa.' },
          { id: 'l2_2', title: 'Construindo um Chatbot com Contexto', type: 'article', duration: 45, content: 'Esta lição prática guia você na construção de um chatbot que mantém o contexto da conversa. Você aprenderá a gerenciar o histórico de diálogo para criar interações mais naturais e úteis. Usaremos os conceitos das lições anteriores para criar um chatbot de atendimento ao cliente.' },
        ],
      },
    ],
  },
  {
    id: 'c2',
    title: 'Design de Interfaces para Aplicações de IA',
    description: 'Aprenda a projetar interfaces intuitivas e eficazes para produtos baseados em IA.',
    longDescription: 'O design para IA apresenta desafios e oportunidades únicas. Este curso ensina como criar experiências de usuário que sejam transparentes, confiáveis e que comuniquem claramente as capacidades e limitações da IA. Usando o Figma, você projetará interfaces para chatbots, ferramentas de análise de dados e sistemas de recomendação, focando em como apresentar informações complexas de forma simples.',
    instructor: {
      name: 'Liam Chen',
      title: 'Designer de Produto Principal',
      avatar: 'https://placehold.co/100x100.png',
    },
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'futuristic interface',
    category: 'Design',
    backgroundVideo: 'https://videos.pexels.com/video-files/3194234/3194234-hd_1920_1080_25fps.mp4',
    modules: [
      {
        id: 'm3',
        title: 'Módulo 1: Fundamentos do Design para IA',
        lessons: [
          { id: 'l3_1', title: 'Princípios de UX para IA', type: 'article', duration: 20, content: 'Explore os princípios fundamentais para projetar boas experiências com IA, incluindo explicabilidade, controle do usuário e gerenciamento de expectativas. Entender esses princípios é essencial para criar produtos de IA que as pessoas confiem e gostem de usar.' },
          { id: 'l3_2', title: 'Prototipando um Chatbot no Figma', type: 'video', duration: 35, content: 'Uma introdução prática ao design e prototipagem de uma interface de chatbot no Figma. Abordaremos como projetar fluxos de conversa, estados de mensagem (enviando, recebido, erro) e como criar um protótipo interativo para testar a experiência do usuário antes do desenvolvimento.' },
        ],
      },
    ],
  },
  {
    id: 'c3',
    title: 'Marketing Digital Otimizado com IA',
    description: 'Use ferramentas de IA para automatizar e otimizar suas campanhas de marketing.',
    longDescription: 'Descubra como a Inteligência Artificial está revolucionando o marketing digital. Este curso ensina a usar ferramentas de IA para gerar copy para anúncios, analisar dados de mercado em larga escala, otimizar campanhas de SEO e personalizar a comunicação com o cliente. Você aprenderá a tomar decisões de marketing mais inteligentes e baseadas em dados com o poder da IA.',
    instructor: {
      name: 'Aisha Khan',
      title: 'Estrategista de Marketing Digital',
      avatar: 'https://placehold.co/100x100.png',
    },
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'data analytics',
    category: 'Marketing',
    modules: [
        {
          id: 'm4',
          title: 'Módulo 1: Geração de Conteúdo com IA',
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
