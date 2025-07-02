
import { Sparkle } from "lucide-react";

const features = [
  {
    title: "O Ginásio da Mente",
    description: "Aqui, você não consome conteúdo. Você luta com as ideias. Cada lição é um round contra o conhecimento frágil, projetado para construir seu músculo intelectual.",
  },
  {
    title: "Seu Guia Socrático",
    description: "Sua IA não dá respostas, ela faz perguntas. É um parceiro de treino incansável que te força a conectar conceitos, justificar suas hipóteses e construir um entendimento à prova de fogo.",
  },
  {
    title: "Prova de Maestria",
    description: "Seu perfil não é uma lista de cursos, é uma galeria de criações. Ao final de cada jornada, você não tem um certificado. Você tem um projeto de IA funcional, a prova tangível do seu domínio.",
  },
  {
    title: "Forje Modelos Mentais",
    description: "Informação é commodity. Nós te ajudamos a construir algo muito mais valioso: intuição. Estruturas de pensamento resilientes que você pode aplicar a qualquer problema do mundo real.",
  },
];

const FeatureCard = ({ title, description }: { title: string, description: string }) => (
    <div className="h-full bg-card/50 backdrop-blur-lg border border-white/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
        <Sparkle className="h-5 w-5 text-primary" />
      </div>
      <h3 className="text-lg font-headline font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
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

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-left sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
