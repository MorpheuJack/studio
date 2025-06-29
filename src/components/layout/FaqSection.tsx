import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "O que é a Revolução Cognitiva?",
    answer: "Revolução Cognitiva é o nosso movimento. Um palco onde o aprendizado passivo morre e a conversa com a inteligência começa. Usamos um copiloto de IA como a ponte mágica entre o conhecimento e a sua mente.",
  },
  {
    question: "Este movimento é para mim?",
    answer: "É para os curiosos. Os pioneiros. Aqueles que se recusam a ser espectadores. Seja você um iniciante buscando o despertar ou um profissional pronto para dominar o futuro, este é o seu lugar.",
  },
  {
    question: "Qual o preço da revolução?",
    answer: "A verdadeira revolução é o acesso. Nosso conhecimento é aberto e gratuito. Nossa promessa é despertar o maior número de mentes possível, sem barreiras.",
  },
  {
    question: "Como funciona a conversa?",
    answer: "Você nunca está sozinho. Em cada jornada, o 'Professor AI', seu copiloto pessoal, está ao seu lado. Ele está disponível 24/7 para responder, provocar e acelerar seu domínio.",
  },
  {
    question: "Posso obter um certificado?",
    answer: "Sim. Ao final de cada jornada, você não recebe apenas um certificado. Você recebe a prova do seu domínio. Uma conquista para validar suas novas habilidades e mostrar ao mundo o que você é capaz de construir.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            O Manifesto
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Perguntas não são um obstáculo. São o início da conversa. Aqui estão as respostas para as suas.
          </p>
        </div>

        <div className="mt-12 mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="border-none bg-card/50 backdrop-blur-lg border border-white/10 rounded-lg overflow-hidden">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline p-6 text-foreground data-[state=open]:bg-black/10">
                    {faq.question}
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0 text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
