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
};

export const courses: Course[] = [
  {
    id: 'c1',
    title: 'JavaScript Avançado & IA',
    description: 'Domine JavaScript moderno e integre IA para aplicações web poderosas.',
    longDescription: 'Este curso mergulha em conceitos avançados de JavaScript, incluindo padrões assíncronos, otimização de performance e sintaxe moderna. Você também aprenderá a alavancar o poder das APIs de IA para construir funcionalidades inteligentes como chatbots, sumarizadores de conteúdo e motores de recomendação diretamente em seus projetos web.',
    instructor: {
      name: 'Dr. Evelyn Reed',
      title: 'Engenheira de IA Sênior',
      avatar: 'https://placehold.co/100x100.png',
    },
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'glowing code',
    category: 'Programação',
    modules: [
      {
        id: 'm1',
        title: 'Módulo 1: JavaScript Assíncrono',
        lessons: [
          { id: 'l1_1', title: 'Promises e Async/Await', type: 'video', duration: 25, content: 'Esta lição aborda os fundamentos da programação assíncrona em JavaScript. Exploramos como as Promises funcionam e como a sintaxe async/await fornece uma maneira mais limpa de lidar com operações assíncronas. Veremos exemplos práticos de busca de dados de uma API e gerenciamento de fluxo de controle assíncrono. O conteúdo é crucial para a construção de aplicações não bloqueantes.' },
        ],
      },
      {
        id: 'm2',
        title: 'Módulo 2: Introdução a APIs de IA',
        lessons: [
          { id: 'l2_1', title: 'Conectando a uma IA Generativa', type: 'video', duration: 30, content: 'Aprenda a conectar sua aplicação JavaScript a um poderoso modelo de IA Generativa. Esta lição fornece um guia passo a passo sobre como configurar seu ambiente, obter chaves de API e fazer sua primeira chamada de API para gerar texto. Construiremos uma aplicação simples de "gerador de ideias".' },
          { id: 'l2_2', title: 'Construindo um Sumarizador com IA', type: 'article', duration: 45, content: 'Esta lição prática guia você na construção de uma ferramenta de IA útil: um sumarizador de texto. Você aprenderá sobre técnicas de engenharia de prompt para obter os melhores resultados da IA. Usaremos os conceitos das lições anteriores para criar uma interface web onde os usuários podem colar texto e obter um resumo conciso.' },
        ],
      },
    ],
  },
  {
    id: 'c2',
    title: 'Design UI/UX com Figma',
    description: 'De wireframes a protótipos interativos, aprenda o processo completo de design.',
    longDescription: 'Este curso abrangente leva você por todo o processo de design UI/UX usando o Figma, a ferramenta de design padrão do setor. Você aprenderá sobre pesquisa de usuário, criação de personas, wireframing, design de mockups de alta fidelidade e construção de protótipos interativos. O curso é baseado em projetos e você construirá um design completo de aplicativo móvel do zero.',
    instructor: {
      name: 'Liam Chen',
      title: 'Designer de Produto Principal',
      avatar: 'https://placehold.co/100x100.png',
    },
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'abstract design',
    category: 'Design',
    modules: [
      {
        id: 'm3',
        title: 'Módulo 1: Fundamentos do Design',
        lessons: [
          { id: 'l3_1', title: 'Princípios do Design Visual', type: 'article', duration: 20, content: 'Explore os princípios fundamentais do design visual, incluindo hierarquia, contraste, repetição, proximidade e espaço em branco. Entender esses princípios é essencial para criar interfaces de usuário que sejam bonitas e funcionais. Este artigo inclui exemplos de aplicativos e sites populares.' },
          { id: 'l3_2', title: 'Introdução ao Figma', type: 'video', duration: 35, content: 'Uma introdução prática à interface do Figma. Abordaremos as ferramentas essenciais, como frames, formas, texto e layout automático. Ao final desta lição, você estará confortável para navegar no Figma e criar elementos de design básicos para seus projetos.' },
        ],
      },
    ],
  },
  {
    id: 'c3',
    title: 'Fundamentos do Marketing Digital',
    description: 'Aprenda SEO, SEM e marketing de mídia social para expandir qualquer negócio online.',
    longDescription: 'Desvende os segredos para um marketing online de sucesso. Este curso cobre os três pilares do marketing digital: Otimização para Mecanismos de Busca (SEO), Marketing para Mecanismos de Busca (SEM) e Marketing de Mídia Social. Você aprenderá estratégias práticas para melhorar o ranking de sites, executar campanhas de anúncios eficazes no Google e em plataformas sociais, e construir uma comunidade online engajada.',
    instructor: {
      name: 'Aisha Khan',
      title: 'Estrategista de Marketing Digital',
      avatar: 'https://placehold.co/100x100.png',
    },
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'data visualization',
    category: 'Marketing',
    modules: [
        {
          id: 'm4',
          title: 'Módulo 1: Introdução ao SEO',
          lessons: [
            { id: 'l4_1', title: 'Como os Motores de Busca Funcionam', type: 'article', duration: 15, content: 'Esta lição desmistifica motores de busca como o Google. Aprenderemos sobre rastreamento, indexação e ranqueamento, os três estágios principais que determinam quais sites aparecem no topo dos resultados de busca. Este conhecimento fundamental é crucial para qualquer estratégia de SEO eficaz.' },
            { id: 'l4_2', title: 'Técnicas de SEO On-Page', type: 'video', duration: 40, content: 'Aprenda a otimizar o conteúdo e o código-fonte HTML do seu site para ranquear mais alto. Este vídeo cobre pesquisa de palavras-chave, redação de tags de título e meta descrições eficazes, otimização de imagens e criação de conteúdo amigável ao usuário. Faremos uma auditoria ao vivo de um site e implementaremos essas técnicas.' },
        ],
      },
    ]
  },
];

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
