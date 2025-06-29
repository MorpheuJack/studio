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
    title: 'Copiloto de Escrita Criativa',
    description: 'Um copiloto de IA que mantém o contexto da conversa, uma prova do seu domínio em engenharia de prompt avançada.',
    image: 'https://placehold.co/600x450.png',
    'data-ai-hint': 'chatbot interface conversation',
    tags: ['Gemini', 'Genkit', 'IA'],
    projectUrl: '/courses/c1/lessons/l2_2',
  },
  {
    id: 'proj-c2',
    courseId: 'c2',
    title: 'Protótipo Interativo de Copiloto',
    description: 'Um protótipo de alta fidelidade para uma conversa com IA, projetado no Figma com foco na mágica da experiência do usuário.',
    image: 'https://placehold.co/600x450.png',
    'data-ai-hint': 'user interface design',
    tags: ['Figma', 'UI/UX', 'Prototipagem'],
    projectUrl: '/courses/c2/lessons/l3_2',
  },
  {
    id: 'proj-c3',
    courseId: 'c3',
    title: 'Painel de Análise de Sentimento',
    description: 'Uma criação que analisa o sentimento de dados em tempo real, provando seu domínio em extrair insights valiosos com IA.',
    image: 'https://placehold.co/600x450.png',
    'data-ai-hint': 'data dashboard charts',
    tags: ['Análise de Dados', 'Marketing', 'IA'],
    projectUrl: '/courses/c3/lessons/l4_2',
  },
];

export const getProjectsForCourses = (courseIds: Set<string>): ProjectBase[] => {
  return projects.filter(project => courseIds.has(project.courseId));
};
