import Link from 'next/link';
import { BrainCircuit, Github, Twitter, Linkedin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-2 md:text-left lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand & Social */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="mb-4 flex items-center space-x-2">
              <BrainCircuit className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline text-foreground">
                Revolução Cognitiva
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Sua plataforma de aprendizado para dominar a Inteligência Artificial e tecnologias do futuro.
            </p>
            <div className="mt-6 flex space-x-6">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
              </Link>
              <Link href="#" aria-label="GitHub">
                <Github className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
              </Link>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground">Navegação</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="/courses/all" className="text-muted-foreground transition-colors hover:text-primary">Todos os Cursos</Link></li>
              <li><Link href="/blog" className="text-muted-foreground transition-colors hover:text-primary">Blog</Link></li>
              <li><Link href="#faq" className="text-muted-foreground transition-colors hover:text-primary">FAQ</Link></li>
              <li><Link href="#" className="text-muted-foreground transition-colors hover:text-primary">Sobre Nós</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal & Resources */}
           <div>
            <h3 className="font-headline text-lg font-semibold text-foreground">Recursos</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="#" className="text-muted-foreground transition-colors hover:text-primary">Comunidade</Link></li>
              <li><Link href="#" className="text-muted-foreground transition-colors hover:text-primary">Suporte</Link></li>
              <li><Link href="#" className="text-muted-foreground transition-colors hover:text-primary">Termos de Serviço</Link></li>
              <li><Link href="#" className="text-muted-foreground transition-colors hover:text-primary">Política de Privacidade</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-headline text-lg font-semibold text-foreground">Fique por Dentro</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Receba as últimas novidades sobre IA e aprendizado, direto no seu email.
            </p>
            <form className="mt-4 flex w-full max-w-sm items-center gap-2">
              <Input type="email" placeholder="seu@email.com" className="flex-1" />
              <Button type="submit" size="icon" aria-label="Inscrever-se na newsletter">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-12 bg-white/10" />

        <div className="text-center text-sm text-muted-foreground">
          © {currentYear} Revolução Cognitiva. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
