import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "O que é a Revolução Cognitiva?",
    answer: "A Revolução Cognitiva é uma plataforma de aprendizado de ponta focada em Inteligência Artificial e tecnologias emergentes. Nossos cursos são projetados para serem práticos, imersivos e guiados por um assistente de IA para uma experiência de aprendizado única.",
  },
  {
    question: "Para quem são os cursos?",
    answer: "Nossos cursos são para todos: desde iniciantes curiosos que querem dar os primeiros passos em tecnologia até profissionais experientes que buscam aprimorar suas habilidades com as ferramentas mais recentes do mercado.",
  },
  {
    question: "Preciso pagar para me inscrever?",
    answer: "Atualmente, todos os nossos cursos são oferecidos gratuitamente. Acreditamos no acesso democrático à educação de alta qualidade para capacitar o maior número possível de pessoas.",
  },
  {
    question: "Que tipo de suporte eu recebo como aluno?",
    answer: "Além do conteúdo de alta qualidade, cada curso vem com o 'Professor AI', seu assistente de IA pessoal disponível 24/7 para tirar dúvidas, explicar conceitos complexos e mantê-lo motivado durante sua jornada de aprendizado.",
  },
  {
    question: "Posso obter um certificado?",
    answer: "Sim, ao concluir com sucesso um curso, você receberá um certificado de conclusão para validar suas novas habilidades, que pode ser adicionado ao seu currículo e perfil do LinkedIn.",
  },
];

export function FaqSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Perguntas Frequentes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tem alguma dúvida? Encontre respostas para as perguntas mais comuns abaixo.
          </p>
        </div>

        <div className="mt-12 mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="border-none">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline p-6 bg-card rounded-lg data-[state=open]:rounded-b-none text-foreground">
                    {faq.question}
                </AccordionTrigger>
                <AccordionContent className="bg-card rounded-b-lg p-6 pt-2 text-base text-muted-foreground">
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
