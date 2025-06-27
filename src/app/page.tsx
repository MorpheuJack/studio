import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
       <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-24 sm:py-32">
          <div className="grid grid-cols-1 items-center gap-y-16 lg:grid-cols-2 lg:gap-x-16">
            <div className="text-center lg:text-left">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Desbloqueie Seu Potencial com{" "}
                <span
                  className="text-primary"
                  style={{ textShadow: "0 0 15px hsl(var(--primary))" }}
                >
                  Aetheria AI
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Mergulhe em uma nova era de aprendizado. Aetheria AI oferece um
                catálogo de cursos selecionados, turbinados com ferramentas de IA para
                ajudá-lo a dominar novas habilidades mais rápido do que nunca.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <Button asChild size="lg">
                  <Link href="/courses">
                    Explorar Cursos
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href="/courses">Saber Mais &rarr;</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-80 lg:h-full">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Uma imagem abstrata representando IA e aprendizado"
                data-ai-hint="cosmic learning"
                fill
                className="rounded-xl object-cover shadow-2xl shadow-primary/20"
                priority
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
