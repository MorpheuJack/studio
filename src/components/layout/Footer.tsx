import Link from 'next/link';
import { BrainCircuit, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const platformLinks = [
  { href: "/courses", label: "Cursos" },
  { href: "/blog", label: "Blog" },
  { href: "/my-courses", label: "Meus Cursos" },
];

const supportLinks = [
    { href: "/#faq", label: "FAQ" },
    { href: "#", label: "Contato" },
    { href: "#", label: "Suporte" },
];

const legalLinks = [
    { href: "#", label: "Termos de Serviço" },
    { href: "#", label: "Política de Privacidade" },
];

const socialLinks = [
    { href: "#", icon: <Facebook className="h-5 w-5" />, name: "Facebook" },
    { href: "#", icon: <Twitter className="h-5 w-5" />, name: "Twitter" },
    { href: "#", icon: <Instagram className="h-5 w-5" />, name: "Instagram" },
    { href: "#", icon: <Linkedin className="h-5 w-5" />, name: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
          {/* Brand & Socials Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <BrainCircuit className="h-8 w-8 text-primary" />
              <span className="font-headline text-xl font-bold text-foreground">
                Revolução Cognitiva
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-muted-foreground">
              Sua plataforma de aprendizado para dominar a Inteligência Artificial e tecnologias do futuro.
            </p>
            <div className="mt-6 flex space-x-1">
              {socialLinks.map((social) => (
                <Button key={social.name} asChild variant="ghost" size="icon" className="text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
                  <Link href={social.href} target="_blank" rel="noopener noreferrer">
                    <span className="sr-only">{social.name}</span>
                    {social.icon}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            <div>
              <p className="font-headline text-base font-semibold text-foreground">Plataforma</p>
              <ul className="mt-4 space-y-3">
                {platformLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-headline text-base font-semibold text-foreground">Suporte</p>
              <ul className="mt-4 space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <p className="font-headline text-base font-semibold text-foreground">Legal</p>
              <ul className="mt-4 space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Revolução Cognitiva. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
