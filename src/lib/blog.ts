export type Post = {
  slug: string;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  date: string;
  isoDate: string;
  image: string;
  'data-ai-hint'?: string;
  content: string;
  audioUrl?: string;
};

export const posts: Post[] = [
  {
    slug: 'o-futuro-da-ia-generativa',
    title: 'O Futuro da IA Generativa: Além do Hype',
    description: 'Uma análise profunda sobre para onde a tecnologia de IA generativa está indo e o que esperar nos próximos anos.',
    author: 'Dr. Evelyn Reed',
    authorAvatar: 'https://placehold.co/100x100.png',
    date: '15 de Julho, 2024',
    isoDate: '2024-07-15',
    image: 'https://placehold.co/800x400.png',
    'data-ai-hint': 'abstract future',
    content: `A inteligência artificial generativa capturou a imaginação do mundo, mas o que vem depois da onda inicial de chatbots e geradores de imagem? Neste artigo, exploramos as tendências emergentes que moldarão a próxima geração de IA.

**Rumo à Multimodalidade**

A verdadeira revolução virá de modelos que não apenas entendem texto, mas também imagens, áudio e vídeo simultaneamente. Imagine descrever uma cena em palavras e a IA gerar um clipe de filme completo, com som e música. Este é o futuro da criação de conteúdo, onde a barreira entre ideia e execução se torna quase inexistente.

**A Era dos Agentes Autônomos**

Os assistentes de IA evoluirão para se tornarem agentes proativos. Em vez de apenas responder a comandos, eles anteciparão suas necessidades, executarão tarefas complexas de vários passos e gerenciarão partes de nossas vidas digitais de forma autônoma. Pense em um agente que planeja suas viagens, gerencia seu calendário e filtra suas comunicações, tudo com uma compreensão profunda do seu contexto e preferências.

**Personalização Extrema e IA Individual**

A próxima fronteira é a personalização. Os modelos serão ajustados dinamicamente para cada indivíduo, aprendendo seu estilo de comunicação, suas preferências e seu contexto. Isso levará a assistentes verdadeiramente pessoais e ferramentas de trabalho que se adaptam ao seu fluxo, tornando a tecnologia uma extensão natural do seu pensamento.

O futuro é brilhante e cheio de possibilidades. A IA generativa não é apenas uma ferramenta, mas um novo meio para a criatividade e a produtividade humana, prometendo uma sinergia sem precedentes entre mente e máquina.`,
    audioUrl: '/audio/o-futuro-da-ia-generativa.mp3',
  },
  {
    slug: '5-dicas-para-escrever-prompts-melhores',
    title: '5 Dicas para Escrever Prompts de IA Melhores',
    description: 'Desbloqueie todo o potencial dos modelos de linguagem com estas dicas práticas para engenharia de prompt.',
    author: 'Liam Chen',
    authorAvatar: 'https://placehold.co/100x100.png',
    date: '10 de Julho, 2024',
    isoDate: '2024-07-10',
    image: 'https://placehold.co/800x400.png',
    'data-ai-hint': 'brain circuit',
    content: `A qualidade da sua saída de IA é diretamente proporcional à qualidade da sua entrada. Aqui estão cinco dicas para aprimorar suas habilidades de engenharia de prompt:

**1. Clareza é Rainha: Seja Específico e Dê Contexto**

Em vez de um vago "Escreva sobre carros", forneça detalhes. Um prompt muito melhor seria: "Escreva um post de blog de 500 palavras sobre o impacto dos carros elétricos na sustentabilidade urbana, focando nos modelos da Tesla e da Rivian e comparando suas tecnologias de bateria." Quanto mais contexto você fornecer, mais relevante será a resposta.

**2. Estruture a Saída: Peça o Formato que Você Deseja**

Não deixe o formato ao acaso. Diga explicitamente à IA como você quer a resposta. Por exemplo: "Liste os prós e contras em uma tabela com duas colunas" ou "Responda no formato de um e-mail formal para um cliente." Isso economiza muito tempo de edição.

**3. Incorpore uma Persona: Peça à IA para Atuar**

Dê um papel à IA. Isso ajuda a definir o tom, o estilo e o nível de profundidade da resposta. Tente: "Você é um economista vencedor do prêmio Nobel. Explique o conceito de inflação para um estudante do ensino médio de forma simples e com analogias."

**4. Guie com Exemplos: A Mágica do "Few-Shot Prompting"**

Mostre, não apenas diga. Forneça à IA um ou dois exemplos do que você espera antes de fazer sua pergunta real. Se você quer que ela resuma textos em um estilo específico, dê a ela um exemplo de texto e seu resumo ideal. Isso ajuda a calibrar a saída.

**5. Itere e Refine: A Engenharia de Prompt é um Processo**

Seu primeiro prompt raramente é o melhor. Veja a primeira resposta como um rascunho. Analise o que funcionou e o que não funcionou. Adicione mais detalhes, restrinja o escopo ou reformule a pergunta para refinar a saída. A engenharia de prompt é uma ciência, mas também uma arte.`,
  },
  {
    slug: 'como-a-ia-esta-mudando-o-marketing',
    title: 'Como a IA Está (Realmente) Mudando o Marketing Digital',
    description: 'Deixe o hype de lado e veja as aplicações práticas da IA que os profissionais de marketing podem usar hoje.',
    author: 'Aisha Khan',
    authorAvatar: 'https://placehold.co/100x100.png',
    date: '5 de Julho, 2024',
    isoDate: '2024-07-05',
    image: 'https://placehold.co/800x400.png',
    'data-ai-hint': 'marketing chart',
    content: `A IA não é mais uma promessa futura para o marketing; é uma ferramenta presente e poderosa. Deixe o hype de lado e veja as aplicações práticas que os profissionais de marketing podem usar hoje:

**Análise Preditiva para Foco em Vendas**

Modelos de IA podem analisar o comportamento do cliente em seu site, interações por e-mail e dados de CRM para prever quais leads têm a maior probabilidade de conversão. Isso permite que as equipes de vendas foquem seus esforços em contas de alto valor, aumentando drasticamente a eficiência.

**SEO Estratégico em Larga Escala**

Ferramentas de IA podem analisar milhares de páginas de concorrentes e resultados de busca (SERPs) em minutos. Elas identificam "lacunas de conteúdo" em seu site e sugerem novas palavras-chave, tópicos e até mesmo estruturas de artigos para otimizar sua estratégia de conteúdo e superar a concorrência.

**Geração e Teste de Criativos em Velocidade Recorde**

Use a IA para gerar dezenas de variações de texto e imagens para seus anúncios no Google, Facebook e outras plataformas. Isso permite testes A/B em uma escala que seria impossível manualmente, otimizando rapidamente para os criativos de melhor desempenho e maximizando seu ROI.

A adoção dessas ferramentas não se trata de substituir os profissionais de marketing, mas de aumentar suas capacidades. A IA cuida da análise de dados em grande escala, liberando os humanos para se concentrarem no que fazem de melhor: estratégia, criatividade e construção de relacionamentos.`,
  },
];

export const getAllPosts = () => {
  return posts.sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime());
};

export const getPostBySlug = (slug: string) => {
  return posts.find(post => post.slug === slug);
};
