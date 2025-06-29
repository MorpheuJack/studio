import { Button } from "@/components/ui/button";
import { Sparkle } from "lucide-react";

const features = [
  {
    title: "Aprendizado Prático",
    description: "Projetos do mundo real que constroem seu portfólio desde o primeiro dia.",
  },
  {
    title: "Comunidade Exclusiva",
    description: "Conecte-se com outros inovadores, mentores e profissionais da indústria.",
  },
  {
    title: "Assistente de IA Pessoal",
    description: "Seu próprio tutor de IA para tirar dúvidas e acelerar seu aprendizado 24/7.",
  },
  {
    title: "Conteúdo de Ponta",
    description: "Currículo sempre atualizado com as últimas tendências e ferramentas do mercado.",
  },
];

const FeatureCard = ({ title, description, className }: { title: string, description: string, className?: string }) => (
  <div className={className}>
    <div className="bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 max-w-sm sm:max-w-xs md:max-w-sm">
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
            O Que Nos Coloca à Frente
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nosso ecossistema de aprendizado amplifica cada passo da sua jornada, ajudando você a se lançar e escalar sem necessidade de experiência prévia.
          </p>
        </div>

        <div className="relative mt-20 lg:mt-24">
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="mx-auto h-[400px] w-full max-w-3xl rounded-full bg-primary/5 blur-3xl" />
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

        <div className="mt-20 flex justify-center gap-4">
          <Button size="lg">Acesso Imediato</Button>
          <Button size="lg" variant="outline">Agendar uma chamada</Button>
        </div>
      </div>
    </section>
  );
}
