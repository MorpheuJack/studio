import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "O que é a Revolução Cognitiva?",
    answer: "É um ginásio para a mente. Um lugar onde você não vem para consumir informação, mas para lutar com as ideias e forjar modelos mentais robustos. Nós não ensinamos o que pensar, nós construímos o lugar onde você aprende a pensar.",
  },
  {
    question: "Isto é para mim?",
    answer: "É para aqueles que se recusam a aceitar o conhecimento frágil. Se você prefere construir o músculo do raciocínio a memorizar fatos para uma prova, este é o seu lugar. É para os artesãos do pensamento.",
  },
  {
    question: "Qual o preço da maestria?",
    answer: "Acreditamos que o verdadeiro obstáculo ao domínio não deve ser o preço. Nosso compromisso é construir a melhor forja para a mente do mundo, com acesso aberto e gratuito.",
  },
  {
    question: "Como a IA funciona aqui?",
    answer: "A IA não é uma tutora que dá respostas. Isso cria dependência. Aqui, a IA é seu Guia Socrático. Um parceiro de treino intelectual que te força a aprofundar seu raciocínio com perguntas desafiadoras, cenários absurdos e contradições.",
  },
  {
    question: "O que eu ganho no final?",
    answer: "Você não ganha um papel. Você ganha a prova. Ao final de cada jornada, você terá construído algo tangível no Estúdio: um projeto de IA funcional que demonstra sua maestria. É o seu troféu da forja.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            A Promessa da Forja
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Perguntas não são um obstáculo. São o início da construção. Aqui estão as respostas para as suas.
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
