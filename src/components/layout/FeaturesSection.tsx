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
    <div className="bg-background/50 border border-primary/10 backdrop-blur-md rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 max-w-sm sm:max-w-xs md:max-w-sm">
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
            <svg className="w-full max-w-3xl" viewBox="0 0 688 496" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.15" filter="url(#filter0_f_30_3)">
                    <path d="M344 168C432.421 168 504 239.579 504 328C504 416.421 432.421 488 344 488C255.579 488 184 416.421 184 328C184 239.579 255.579 168 344 168Z" fill="hsl(var(--primary))"/>
                </g>
                <path d="M168.916 220.457C203.901 247.457 266.071 285.402 320.669 310.511" stroke="hsl(var(--primary))" strokeOpacity="0.3"/>
                <path d="M168.916 435.543C203.901 408.543 266.071 370.598 320.669 345.489" stroke="hsl(var(--primary))" strokeOpacity="0.3"/>
                <path d="M519.084 220.457C484.099 247.457 421.929 285.402 367.331 310.511" stroke="hsl(var(--primary))" strokeOpacity="0.3"/>
                <path d="M519.084 435.543C484.099 408.543 421.929 370.598 367.331 345.489" stroke="hsl(var(--primary))" strokeOpacity="0.3"/>
                <g opacity="0.4">
                    <path d="M344 269.833C376.138 269.833 402.167 295.862 402.167 328C402.167 360.138 376.138 386.167 344 386.167C311.862 386.167 285.833 360.138 285.833 328C285.833 295.862 311.862 269.833 344 269.833Z" stroke="hsl(var(--primary))" strokeWidth="2"/>
                    <path d="M344 248C389.791 248 428 286.209 428 332C428 377.791 389.791 416 344 416C298.209 416 260 377.791 260 332C260 286.209 298.209 248 344 248Z" stroke="hsl(var(--primary))" strokeWidth="0.5"/>
                </g>
                <defs>
                    <filter id="filter0_f_30_3" x="24" y="8" width="640" height="640" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feGaussianBlur stdDeviation="80" result="effect1_foregroundBlur_30_3"/>
                    </filter>
                </defs>
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

        <div className="mt-20 flex justify-center gap-4">
          <Button size="lg">Acesso Imediato</Button>
          <Button size="lg" variant="outline">Agendar uma chamada</Button>
        </div>
      </div>
    </section>
  );
}
