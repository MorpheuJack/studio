export type Post = {
  slug: string;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  date: string;
  image: string;
  'data-ai-hint'?: string;
  content: string;
};

export const posts: Post[] = [
  {
    slug: 'o-futuro-da-ia-generativa',
    title: 'O Futuro da IA Generativa: Além do Hype',
    description: 'Uma análise profunda sobre para onde a tecnologia de IA generativa está indo e o que esperar nos próximos anos.',
    author: 'Dr. Evelyn Reed',
    authorAvatar: 'https://placehold.co/100x100.png',
    date: '15 de Julho, 2024',
    image: 'https://placehold.co/800x400.png',
    'data-ai-hint': 'abstract future',
    content: `
A inteligência artificial generativa capturou a imaginação do mundo, mas o que vem depois da onda inicial de chatbots e geradores de imagem? Neste artigo, exploramos as tendências emergentes que moldarão a próxima geração de IA.

**1. Modelos Multimodais:** A verdadeira revolução virá de modelos que não apenas entendem texto, mas também imagens, áudio e vídeo simultaneamente. Imagine descrever uma cena em palavras e a IA gerar um clipe de filme completo, com som e música.

**2. IA Autônoma e Agentes:** Os assistentes de IA se tornarão agentes proativos. Em vez de apenas responder a comandos, eles anteciparão necessidades, executarão tarefas complexas de vários passos e gerenciarão partes de nossas vidas digitais de forma autônoma.

**3. Personalização Extrema:** Os modelos serão ajustados dinamicamente para cada indivíduo, aprendendo seu estilo de comunicação, suas preferências e seu contexto. Isso levará a assistentes verdadeiramente pessoais e ferramentas de trabalho que se adaptam ao seu fluxo.

O futuro é brilhante e cheio de possibilidades. A IA generativa não é apenas uma ferramenta, mas um novo meio para a criatividade e a produtividade humana.
    `,
  },
  {
    slug: '5-dicas-para-escrever-prompts-melhores',
    title: '5 Dicas para Escrever Prompts de IA Melhores',
    description: 'Desbloqueie todo o potencial dos modelos de linguagem com estas dicas práticas para engenharia de prompt.',
    author: 'Liam Chen',
    authorAvatar: 'https://placehold.co/100x100.png',
    date: '10 de Julho, 2024',
    image: 'https://placehold.co/800x400.png',
    'data-ai-hint': 'brain circuit',
    content: `
A qualidade da sua saída de IA é diretamente proporcional à qualidade da sua entrada. Aqui estão cinco dicas para aprimorar suas habilidades de engenharia de prompt:

**1. Seja Específico e Dê Contexto:** Em vez de "Escreva sobre carros", tente "Escreva um post de blog de 500 palavras sobre o impacto dos carros elétricos na sustentabilidade urbana, com foco em Tesla e Rivian."

**2. Defina o Formato de Saída:** Diga explicitamente à IA como você quer a resposta. Por exemplo: "Liste os prós e contras em uma tabela com duas colunas" ou "Responda em formato de um e-mail formal."

**3. Use Personas:** Peça à IA para agir como um especialista. "Você é um economista vencedor do prêmio Nobel. Explique a inflação para uma criança de 5 anos."

**4. Forneça Exemplos (Few-Shot Prompting):** Dê à IA alguns exemplos do que você quer antes de fazer sua pergunta real. Isso a ajuda a entender o padrão que você está procurando.

**5. Itere e Refine:** Seu primeiro prompt raramente é o melhor. Experimente diferentes formulações, adicione mais detalhes e veja como a resposta muda. A engenharia de prompt é uma ciência, mas também uma arte.
    `,
  },
  {
    slug: 'como-a-ia-esta-mudando-o-marketing',
    title: 'Como a IA Está (Realmente) Mudando o Marketing Digital',
    description: 'Deixe o hype de lado e veja as aplicações práticas da IA que os profissionais de marketing podem usar hoje.',
    author: 'Aisha Khan',
    authorAvatar: 'https://placehold.co/100x100.png',
    date: '5 de Julho, 2024',
    image: 'https://placehold.co/800x400.png',
    'data-ai-hint': 'marketing chart',
    content: `
A IA não é mais uma promessa futura para o marketing; é uma ferramenta presente e poderosa. Aqui estão algumas maneiras práticas de usá-la:

**1. Análise Preditiva de Clientes:** Modelos de IA podem analisar o comportamento do cliente para prever quais leads têm maior probabilidade de converter, permitindo que as equipes de vendas foquem seus esforços.

**2. Otimização de SEO em Larga Escala:** Ferramentas de IA podem analisar milhares de páginas de concorrentes e SERPs para identificar "lacunas de conteúdo" e sugerir novas palavras-chave e tópicos para otimizar sua estratégia de conteúdo.

**3. Geração de Criativos para Anúncios:** Use a IA para gerar dezenas de variações de texto e imagens para seus anúncios. Isso permite testes A/B em uma escala que seria impossível manualmente, otimizando rapidamente para os criativos de melhor desempenho.

A adoção dessas ferramentas não se trata de substituir os profissionais de marketing, mas de aumentar suas capacidades, permitindo que se concentrem em estratégia e criatividade enquanto a IA lida com a análise de dados em grande escala.
    `,
  },
];

export const getAllPosts = () => {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPostBySlug = (slug: string) => {
  return posts.find(post => post.slug === slug);
};
