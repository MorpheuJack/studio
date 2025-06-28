
"use client";

import Link from "next/link";
import { BrainCircuit, LogOut, User, Settings, CreditCard, LifeBuoy, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

const navLinks = [
  { href: "/courses", label: "Cursos" },
  { href: "/my-courses", label: "Meus Cursos" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const pathname = usePathname();
  const { isAuthenticated, user, logout, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const [logoText, setLogoText] = useState('');
  const [animationPhase, setAnimationPhase] = useState<'typing' | 'pausing' | 'deleting' | 'swapping' | 'inserting-slash' | 'finished'>('typing');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fullText = "Revolução Cognitiva";
    const twoLetterText = "Re";
    const intermediateText = "RC";
    const finalText = "R/C";
    const typeSpeed = 100;
    const deleteSpeed = 60;
    const pauseDelay = 1500;
    const swapDelay = 100;
    const slashDelay = 200;

    if (animationPhase === 'finished') return;

    let timer: NodeJS.Timeout;

    switch (animationPhase) {
        case 'typing':
            timer = setTimeout(() => {
                if (logoText.length < fullText.length) {
                    setLogoText(fullText.substring(0, logoText.length + 1));
                } else {
                    setAnimationPhase('pausing');
                }
            }, typeSpeed);
            break;
        case 'pausing':
            timer = setTimeout(() => {
                setAnimationPhase('deleting');
            }, pauseDelay);
            break;
        case 'deleting':
            timer = setTimeout(() => {
                if (logoText.length > twoLetterText.length) {
                    setLogoText(logoText.substring(0, logoText.length - 1));
                } else {
                    setAnimationPhase('swapping');
                }
            }, deleteSpeed);
            break;
        case 'swapping':
            timer = setTimeout(() => {
                setLogoText(intermediateText);
                setAnimationPhase('inserting-slash');
            }, swapDelay);
            break;
        case 'inserting-slash':
            timer = setTimeout(() => {
                setLogoText(finalText);
                setAnimationPhase('finished');
            }, slashDelay);
            break;
        default:
            break;
    }

    // @ts-ignore
    return () => clearTimeout(timer);
}, [logoText, animationPhase]);


  const userName = user?.user_metadata?.full_name || user?.email || 'Usuário';
  
  const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[names.length - 1]) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name.substring(0, 2);
  }

  return (
    <header className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled ? "border-b border-border/40 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60" : "border-b border-transparent",
        (pathname === '/' || pathname === '/blog' || pathname === '/courses') && !scrolled ? '' : 'border-b border-border/40 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60'
    )}>
      <div className="container flex h-14 items-center md:grid md:grid-cols-3">
        {/* Left Side: Logo (Desktop) / Mobile Menu Wrapper */}
        <div className="flex items-center justify-start md:flex-1">
            <Link href="/" className="flex items-center space-x-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <div 
                className="relative font-bold font-headline h-6 hidden items-center md:flex" 
                style={{ textShadow: "0 0 8px hsl(var(--primary))" }}
            >
                <span className="min-w-[170px] text-left">{logoText}</span>
                {animationPhase !== 'finished' && (
                <span className="inline-block w-px h-5 bg-primary animate-blinking-cursor ml-1"></span>
                )}
            </div>
            </Link>
        </div>
        
        {/* Center: Desktop Navigation */}
        <nav className="hidden items-center justify-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname.startsWith(link.href) ? "text-foreground" : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side: Auth & Mobile Menu Trigger */}
        <div className="flex flex-1 items-center justify-end">
          {/* Desktop Auth UI */}
          <div className="hidden md:block">
            {loading ? (
              <div className="h-9 w-9 bg-muted rounded-full animate-pulse" />
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9 border-2 border-primary/50">
                      <AvatarFallback className="bg-primary/20 text-primary font-bold">
                        {getInitials(userName)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-64 border-border/20 bg-background/80 backdrop-blur-md" 
                  align="end" 
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Membros</span>
                      <DropdownMenuShortcut>⌘M</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Conquistas</span>
                      <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Configurações</span>
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Label htmlFor="dark-mode-switch" className="flex items-center w-full cursor-pointer">
                          <span>Modo Escuro</span>
                          <Switch id="dark-mode-switch" className="ml-auto" defaultChecked />
                      </Label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span>Suporte</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem onClick={logout} className="text-red-400 focus:bg-red-500/10 focus:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link href="/auth">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col p-6 pt-8">
                <SheetHeader>
                  <SheetTitle className="sr-only">Menu Principal</SheetTitle>
                </SheetHeader>
                <Link href="/" className="mb-6 flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                   <BrainCircuit className="h-6 w-6 text-primary" />
                   <span className="font-bold font-headline text-lg">Revolução Cognitiva</span>
                </Link>

                <nav className="flex flex-col gap-4 text-lg font-medium">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "transition-colors hover:text-primary",
                          pathname.startsWith(link.href) ? "text-primary font-semibold" : "text-muted-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-auto">
                   <Separator className="my-6" />
                   {loading ? (
                      <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
                    ) : isAuthenticated && user ? (
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border-2 border-primary/50">
                            <AvatarFallback className="bg-primary/20 text-primary font-bold">
                              {getInitials(userName)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <p className="text-base font-medium leading-none">{userName}</p>
                            <p className="text-sm leading-none text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <SheetClose asChild>
                          <Button onClick={logout} variant="outline" className="w-full justify-start">
                            <LogOut className="mr-2 h-4 w-4" />
                            Sair
                          </Button>
                        </SheetClose>
                      </div>
                    ) : (
                      <SheetClose asChild>
                        <Button asChild className="w-full text-base py-6">
                          <Link href="/auth">Login / Cadastrar</Link>
                        </Button>
                      </SheetClose>
                    )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
