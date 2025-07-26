
"use client";

import Link from "next/link";
import { BrainCircuit, LogOut, User, Settings, CreditCard, LifeBuoy, Menu, LayoutGrid } from "lucide-react";
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
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { MegaMenu } from "./MegaMenu";

const navLinks = [
  // { href: "/courses", label: "Cursos" }, // Replaced by MegaMenu
  { href: "/prompt-library", label: "Biblioteca" },
  { href: "/blog", label: "Blog" },
];
const fullLogoText = "Revolução Cognitiva";

export function Header() {
  const pathname = usePathname();
  const { isAuthenticated, user, logout, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [hasMounted, setHasMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const isLessonPage = /^\/courses\/[^/]+\/lessons\/[^/]+$/.test(pathname);
  const isAuthPage = pathname === '/auth';


  useEffect(() => {
    setHasMounted(true);

    if (isLessonPage) return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLessonPage]);

  const userName = user?.user_metadata?.full_name || user?.email || 'Usuário';
  
  const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[names.length - 1]) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name.substring(0, 2);
  }
  
  const isHeaderOpaque = scrolled || isLessonPage || isAuthPage;

  const authContent = (
    <>
      {(!hasMounted || loading) ? (
        <div className="h-9 w-9 bg-muted rounded-full animate-pulse" />
      ) : isAuthenticated && user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full group">
              <Avatar className="h-9 w-9 border-2 border-primary/50">
                <AvatarFallback className="bg-primary/20 text-primary font-bold transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
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
              <DropdownMenuItem asChild>
                <Link href="/my-courses">
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  <span>Meu Estúdio</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Membros</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Conquistas</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-border/50" />
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
    </>
  );

  if (isAuthPage) {
    return null;
  }

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isHeaderOpaque
        ? "border-b border-border/40 bg-card/95 backdrop-blur-sm supports-[backdrop-filter]:bg-card/60"
        : "border-b border-transparent",
      hidden && !isLessonPage ? "-translate-y-full" : "translate-y-0"
    )}>
      <div className="container flex h-14 items-center">
        <div className={cn(
          "flex items-center",
          isLessonPage ? "justify-start" : "justify-start md:flex-1"
        )}>
            <Link href={isLessonPage ? "/courses" : "/"} className="flex items-center space-x-2">
              <BrainCircuit className="h-6 w-6 text-primary" />
              {!isLessonPage && (
                <span className="font-bold font-headline hidden md:block">
                  {fullLogoText}
                </span>
              )}
            </Link>
        </div>
        
        {!isLessonPage && (
          <nav className="hidden items-center justify-center space-x-8 text-sm font-medium md:flex">
             <MegaMenu />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-primary",
                  pathname.startsWith(link.href) ? "text-primary font-semibold" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className={cn(
          "flex items-center",
          isLessonPage ? "ml-auto" : "flex-1 justify-end"
        )}>
          <div className="hidden md:block">
            {authContent}
          </div>

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
                   <span className="font-bold font-headline text-lg">{fullLogoText}</span>
                </Link>

                <nav className="flex flex-col gap-4 text-lg font-medium">
                   <SheetClose asChild>
                       <Link
                        href="/courses/all"
                        className={cn(
                          "transition-colors hover:text-primary",
                          pathname.startsWith('/courses') ? "text-primary font-semibold" : "text-muted-foreground"
                        )}
                      >
                        Cursos
                      </Link>
                    </SheetClose>
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
                   {(!hasMounted || loading) ? (
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
                        <Separator />
                        <nav className="flex flex-col gap-2">
                          <SheetClose asChild>
                            <Link
                              href="/my-courses"
                              className={cn(
                                'flex items-center gap-3 rounded-md p-2 text-base font-medium transition-colors hover:bg-accent',
                                pathname.startsWith('/my-courses')
                                  ? 'text-primary'
                                  : 'text-foreground'
                              )}
                            >
                              <LayoutGrid className="h-5 w-5" />
                              <span>Meu Estúdio</span>
                            </Link>
                          </SheetClose>
                        </nav>
                        <Separator />
                        <SheetClose asChild>
                          <Button onClick={logout} variant="ghost" className="w-full justify-start gap-3 p-2 text-base font-medium text-red-400 hover:bg-red-500/10 hover:text-red-400">
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
