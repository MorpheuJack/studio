
'use client';

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqData = [
  {
    question: 'O que é a Revolução Cognitiva?',
    answer:
      'É um ginásio para a mente, não uma plataforma de cursos passiva. Nosso foco é te ajudar a construir modelos mentais robustos e uma intuição poderosa para resolver problemas complexos, em vez de apenas acumular informações.',
  },
  {
    question: 'Como funciona o Guia Socrático de IA?',
    answer:
      'Seu Guia de IA é um parceiro de treino, não um professor que dá respostas. Ele faz perguntas desafiadoras, apresenta contradições e força a aplicação do conhecimento em cenários inesperados para garantir que seu entendimento seja profundo e à prova de fogo.',
  },
  {
    question: 'O que são as "provas de maestria"?',
    answer:
      'Em vez de certificados, você constrói projetos funcionais. Seu perfil se torna uma galeria de criações, a prova tangível e irrefutável do seu domínio sobre as ferramentas e conceitos que aprendeu.',
  },
  {
    question: 'Preciso saber programar para participar?',
    answer:
      'Não. Temos jornadas para todos os níveis e áreas, desde programação e engenharia de IA até design de interfaces e marketing estratégico. O fio condutor não é a tecnologia, mas a arte de forjar o pensamento.',
  },
  {
    question: 'Os cursos são realmente gratuitos?',
    answer:
      'Sim. Acreditamos que a capacidade de forjar a mente não deve ter barreiras financeiras. Nosso modelo é construído para ser acessível a todos que estão comprometidos com a jornada da maestria.',
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Perguntas Frequentes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Respostas diretas para as dúvidas mais comuns sobre nossa metodologia e propósito.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-4xl">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-0">
                <div className="rounded-lg border border-white/10 bg-card/50 backdrop-blur-lg px-6 transition-all duration-300 hover:border-primary/30 hover:bg-card/80">
                  <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base text-muted-foreground pt-2">
                        {item.answer}
                    </p>
                  </AccordionContent>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
