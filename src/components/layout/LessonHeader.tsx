"use client";

import Link from "next/link";
import { BrainCircuit } from "lucide-react";

export function LessonHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container flex h-14 items-center justify-center">
        <Link href="/courses" aria-label="Voltar para os cursos">
          <BrainCircuit className="h-6 w-6 text-primary" />
        </Link>
      </div>
    </header>
  );
}
