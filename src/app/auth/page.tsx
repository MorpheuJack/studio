
"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const loginSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z.string().min(1, { message: "A senha não pode estar em branco." }),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const router = useRouter();
  const { login, register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    const success = await login(data.email, data.password);
    if (success) {
      router.push('/my-courses');
    }
    setLoading(false);
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    const success = await register(data.name, data.email, data.password);
    if (success) {
      router.push('/auth'); // Redirect to login after successful registration
      setIsLoginView(true); // Switch to login view
    }
    setLoading(false);
  };
  
  const formContent = (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]">
        <div className="flex flex-col items-center space-y-2 text-center">
            <BrainCircuit className="h-10 w-10 text-primary mb-2 hidden lg:block" />
            <h1 className="text-2xl font-headline font-semibold tracking-tight">
              {isLoginView ? "Bem-vindo(a) de volta à Forja" : "Junte-se aos Artesãos do Pensamento"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isLoginView ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
              <button
                onClick={() => setIsLoginView(!isLoginView)}
                className="font-semibold text-primary underline-offset-4 hover:underline focus:outline-none"
              >
                {isLoginView ? "Cadastre-se" : "Faça login"}
              </button>
            </p>
        </div>
        
        {isLoginView ? (
           <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" type="email" placeholder="seu@email.com" {...loginForm.register("email")} />
                  {loginForm.formState.errors.email && <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Senha</Label>
                       <Link
                          href="#"
                          className="text-sm text-primary underline-offset-4 hover:underline"
                        >
                          Esqueceu a senha?
                        </Link>
                    </div>
                  <Input id="login-password" type="password" {...loginForm.register("password")} />
                  {loginForm.formState.errors.password && <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Entrar na Forja
                </Button>
              </form>
        ) : (
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                 <div className="space-y-2">
                  <Label htmlFor="register-name">Nome</Label>
                  <Input id="register-name" placeholder="Seu Nome Completo" {...registerForm.register("name")} />
                  {registerForm.formState.errors.name && <p className="text-sm text-destructive">{registerForm.formState.errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input id="register-email" type="email" placeholder="seu@email.com" {...registerForm.register("email")} />
                  {registerForm.formState.errors.email && <p className="text-sm text-destructive">{registerForm.formState.errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Senha</Label>
                  <Input id="register-password" type="password" {...registerForm.register("password")} />
                  {registerForm.formState.errors.password && <p className="text-sm text-destructive">{registerForm.formState.errors.password.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Construir Minha Mente
                </Button>
            </form>
        )}

        <p className="px-8 text-center text-sm text-muted-foreground">
          Ao clicar em continuar, você concorda com nossos{" "}
          <Link
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Termos de Serviço
          </Link>{" "}
          e{" "}
          <Link
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Política de Privacidade
          </Link>
          .
        </p>
    </div>
  );

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex flex-col p-6 lg:justify-center lg:py-12 min-h-screen lg:min-h-0">
          <div className="flex justify-center pt-12 lg:hidden">
              <BrainCircuit className="h-10 w-10 text-primary" />
          </div>
          <div className="flex-grow flex items-center justify-center lg:flex-grow-0">
              {formContent}
          </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <Image
          src="/img/rc-background.png"
          alt="Plano de fundo abstrato da Revolução Cognitiva"
          data-ai-hint="abstract technology"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
      </div>
    </div>
  );
}
