
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const timelineData = [
    { step: 1, title: 'Aula Inaugural', highlight: false },
    { step: 2, title: 'Project Based Learning', highlight: false },
    { step: 3, title: 'Plataforma On', highlight: false },
    { step: 4, title: 'Lives', highlight: false },
    { step: 5, title: 'Mentoria', highlight: true },
    { step: 6, title: 'Atendimento', highlight: true },
    {
        step: 7,
        title: 'Virtualização do Ambiente',
        highlight: true,
        image: 'https://placehold.co/800x600.png',
        'data-ai-hint': 'server room',
        description: 'Muitas áreas exigem o desenvolvimento prático para dominar ferramentas e tecnologias. Por isso, oferecemos infraestrutura, laboratórios virtuais e suporte para você desenvolver seus conhecimentos muito além da teoria. Além disso, contamos com diversos professores, parceiros de mercado.',
    },
    { step: 8, title: 'Enterprise Challenges', highlight: false },
    { step: 9, title: 'Global Solutions', highlight: false },
    { step: 10, title: 'Next', highlight: false },
    { step: 11, title: 'Atividade Presencial Obrigatória', highlight: false },
];

export function TimelineSection() {
    const contentItem = timelineData.find(item => item.image);

    return (
        <section id="timeline" className="py-24 sm:py-32 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Nossa Jornada do Aluno
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Uma metodologia completa que une teoria, prática e desafios do mundo real para forjar sua maestria.
                    </p>
                </div>

                <div className="mt-16">
                    <div className="relative">
                        {/* Linha do tempo */}
                        <div className="hidden lg:block absolute top-5 left-0 w-full h-0.5 bg-border -z-10" />

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-11 gap-x-4 gap-y-8">
                            {timelineData.map((item, index) => (
                                <div key={item.step} className="relative flex flex-col items-center text-center">
                                    {/* Conector e Número */}
                                    <div className="relative flex-grow-0">
                                        <div className="hidden lg:block w-0.5 h-5 bg-border" />
                                        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-sm border-2 bg-background border-border" />
                                    </div>
                                    <div className={`mt-10 font-headline text-3xl font-bold ${item.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                                        {item.step}
                                    </div>
                                    <h3 className={`mt-2 text-sm font-semibold tracking-wide uppercase ${item.highlight ? 'text-foreground' : 'text-muted-foreground'}`}>
                                        {item.title}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>

                    {contentItem && (
                         <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8 }}
                            className="mt-16 p-8 md:p-12 rounded-2xl bg-card/50 border border-white/10 backdrop-blur-lg grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                        >
                            <div className="w-full">
                                <Image
                                    src={contentItem.image}
                                    alt={contentItem.title}
                                    width={800}
                                    height={600}
                                    data-ai-hint={contentItem['data-ai-hint']}
                                    className="rounded-xl shadow-lg object-cover w-full h-auto"
                                />
                            </div>
                            <div className="max-w-md">
                                <h3 className="font-headline text-2xl font-bold text-primary">{contentItem.title}</h3>
                                <p className="mt-4 text-muted-foreground">{contentItem.description}</p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}
