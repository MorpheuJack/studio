import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <section className="py-24 sm:py-32">
        <div className="grid grid-cols-1 items-center gap-y-16 lg:grid-cols-2 lg:gap-x-16">
          <div className="text-center lg:text-left">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Unlock Your Potential with <span className="text-primary">Aetheria AI</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Dive into a new era of learning. Aetheria AI offers a curated catalog of courses, supercharged with AI tools to help you master new skills faster than ever before.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <Button asChild size="lg">
                <Link href="/courses">
                  Explore Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="#">Learn More &rarr;</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-80 lg:h-full">
            <Image
              src="https://placehold.co/600x400.png"
              alt="An abstract image representing AI and learning"
              data-ai-hint="ai learning"
              fill
              className="rounded-xl object-cover shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
}
