export type ProjectBase = {
  id: string;
  title: string;
  description: string;
  image: string;
  'data-ai-hint'?: string;
  tags: string[];
  projectUrl: string;
  courseId: string; // Link to the course that builds this project
};

// This data represents the "final project" a user builds in a course.
export const projects: ProjectBase[] = [
  {
    id: 'proj-c1',
    courseId: 'c1',
    title: 'Guia Socrático de Escrita',
    description: 'A prova do seu domínio em engenharia de prompt. Uma IA que não dá respostas, mas faz as perguntas que forçam a criatividade.',
    image: 'https://placehold.co/600x450.png',
    'data-ai-hint': 'chatbot interface conversation',
    tags: ['Gemini', 'Genkit', 'IA'],
    projectUrl: '/courses/c1/lessons/l2_2',
  },
  {
    id: 'proj-c2',
    courseId: 'c2',
    title: 'Protótipo de Confiança para IA',
    description: 'Um protótipo de alta fidelidade que comunica com clareza os poderes e limites da IA, forjando a confiança do usuário.',
    image: 'https://placehold.co/600x450.png',
    'data-ai-hint': 'user interface design',
    tags: ['Figma', 'UI/UX', 'Prototipagem'],
    projectUrl: '/courses/c2/lessons/l3_2',
  },
  {
    id: 'proj-c3',
    courseId: 'c3',
    title: 'Painel de Intuição de Mercado',
    description: 'Uma criação que analisa o sentimento de dados em tempo real, provando seu domínio em forjar insights de mercado a partir de ruído.',
    image: 'https://placehold.co/600x450.png',
    'data-ai-hint': 'data dashboard charts',
    tags: ['Análise de Dados', 'Marketing', 'IA'],
    projectUrl: '/courses/c3/lessons/l4_2',
  },
];

export const getProjectsForCourses = (courseIds: Set<string>): ProjectBase[] => {
  return projects.filter(project => courseIds.has(project.courseId));
};
