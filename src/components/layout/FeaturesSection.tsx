import { Sparkle } from "lucide-react";

const features = [
  {
    title: "O Ginásio da Mente",
    description: "Aqui, você não consome conteúdo. Você luta com as ideias. Cada lição é um round contra o conhecimento frágil, projetado para construir seu músculo intelectual.",
  },
  {
    title: "Prova de Maestria",
    description: "Seu perfil não é uma lista de cursos, é uma galeria de criações. Ao final de cada jornada, você não tem um certificado. Você tem um projeto de IA funcional, a prova tangível do seu domínio.",
  },
  {
    title: "Seu Guia Socrático",
    description: "Sua IA não dá respostas, ela faz perguntas. É um parceiro de treino incansável que te força a conectar conceitos, justificar suas hipóteses e construir um entendimento à prova de fogo.",
  },
  {
    title: "Forje Modelos Mentais",
    description: "Informação é commodity. Nós te ajudamos a construir algo muito mais valioso: intuição. Estruturas de pensamento resilientes que você pode aplicar a qualquer problema do mundo real.",
  },
];

const FeatureCard = ({ title, description, className }: { title: string, description: string, className?: string }) => (
  <div className={className}>
    <div className="bg-card/60 backdrop-blur-lg border border-border/20 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 max-w-sm sm:max-w-xs md:max-w-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
        <Sparkle className="h-5 w-5 text-primary" />
      </div>
      <h3 className="text-lg font-headline font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

export function FeaturesSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Como Nós Forjamos a Maestria
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Aprender não é assistir. É construir. Nosso ginásio foi projetado para forjar o pensamento, não para acumular fatos, com um Guia Socrático ao seu lado.
          </p>
        </div>

        <div className="relative mt-20 lg:mt-24">
          <div className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2" aria-hidden="true">
            <svg
              className="mx-auto h-auto w-full max-w-4xl text-primary/20"
              viewBox="0 0 892 590"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M504.553 589.5C793.823 589.5 891.5 458.12 891.5 295C891.5 131.88 793.823 0.5 504.553 0.5C215.283 0.5 0.5 131.88 0.5 295C0.5 458.12 215.283 589.5 504.553 589.5Z"
                stroke="currentColor"
              />
              <path
                d="M504.553 529C758.623 529 826 418.156 826 295C826 171.844 758.623 61 504.553 61C250.483 61 183 171.844 183 295C183 418.156 250.483 529 504.553 529Z"
                stroke="currentColor"
              />
              <path
                d="M231.954 532.5L424.582 295.333"
                stroke="currentColor"
                strokeLinecap="round"
              />
              <path
                d="M678.046 59.5L485.418 296.667"
                stroke="currentColor"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 items-start gap-y-10 sm:grid-cols-2 lg:gap-x-8">
            {/* Left Column */}
            <div className="flex flex-col space-y-10 sm:items-end sm:space-y-16">
              <FeatureCard title={features[0].title} description={features[0].description} />
              <FeatureCard title={features[1].title} description={features[1].description} />
            </div>
            {/* Right Column */}
            <div className="flex flex-col space-y-10 sm:items-start sm:space-y-16 sm:mt-24">
              <FeatureCard title={features[2].title} description={features[2].description} />
              <FeatureCard title={features[3].title} description={features[3].description} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
