
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Award, BookOpen, Bot, Clapperboard, Code, Flag, Globe, Handshake, Users, Video, Waypoints } from 'lucide-react';


const timelineData = [
    {
        step: 1,
        title: 'Aula Inaugural',
        description: 'O ponto de partida. Aqui você entende nossa metodologia, conhece seu Guia Socrático de IA e define as bases para sua jornada.',
        icon: Flag,
    },
    {
        step: 2,
        title: 'Project Based Learning',
        description: 'Desde o início, você aprende construindo. Cada módulo é focado em um projeto prático que prova seu domínio sobre os conceitos.',
        icon: Code,
    },
    {
        step: 3,
        title: 'Plataforma On',
        description: 'Acesse nossa plataforma completa, com lições, estúdio de codificação integrado e ferramentas de colaboração.',
        icon: Clapperboard,
    },
    {
        step: 4,
        title: 'Lives',
        description: 'Participe de sessões ao vivo com especialistas da indústria para aprofundar seu conhecimento e tirar dúvidas em tempo real.',
        icon: Video,
    },
    {
        step: 5,
        title: 'Mentoria',
        description: 'Sessões de mentoria individuais e em grupo para guiar seus projetos, refinar suas habilidades e planejar sua carreira.',
        icon: Users,
    },
    {
        step: 6,
        title: 'Atendimento',
        description: 'Nosso time de suporte está sempre disponível para ajudar com qualquer dúvida técnica ou de conteúdo que você encontrar.',
        icon: Handshake,
    },
    {
        step: 7,
        title: 'Virtualização do Ambiente',
        image: 'https://placehold.co/800x600.png',
        'data-ai-hint': 'server room',
        description: 'Muitas áreas exigem o desenvolvimento prático para dominar ferramentas e tecnologias. Oferecemos laboratórios virtuais e suporte para você desenvolver seus conhecimentos muito além da teoria.',
        icon: Waypoints,
    },
    {
        step: 8,
        title: 'Enterprise Challenges',
        description: 'Resolva problemas reais propostos por nossas empresas parceiras. Uma oportunidade única de aplicar suas habilidades em um contexto de mercado.',
        icon: Award,
    },
    {
        step: 9,
        title: 'Global Solutions',
        description: 'Contribua para projetos de impacto global, usando a tecnologia para resolver desafios sociais e ambientais em escala.',
        icon: Globe,
    },
    {
        step: 10,
        title: 'Next',
        description: 'Preparamos você para o próximo nível. Conectamos você a oportunidades de carreira, programas de aceleração e nossa rede de ex-alunos.',
        icon: Bot,
    },
    {
        step: 11,
        title: 'Atividade Presencial Obrigatória',
        description: 'O ápice da jornada. Um evento presencial de imersão para consolidar seu aprendizado, fazer networking e celebrar suas conquistas.',
        icon: BookOpen,
    },
];

export function TimelineSection() {
    const [selectedStep, setSelectedStep] = useState(timelineData.find(item => item.image) || timelineData[6]);

    return (
        <section id="timeline" className="py-24 sm:py-32 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        O Mapa da Sua Jornada
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Uma metodologia completa que une teoria, prática e desafios do mundo real para forjar sua maestria. Clique em cada etapa para explorar.
                    </p>
                </div>

                <div className="mt-16">
                    <div className="relative">
                        <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-border -z-10" />

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-11 gap-x-4 gap-y-8">
                            {timelineData.map((item) => {
                                const Icon = item.icon;
                                const isSelected = selectedStep && selectedStep.step === item.step;
                                return (
                                <div key={item.step} className="relative flex flex-col items-center text-center cursor-pointer group" onClick={() => setSelectedStep(item)}>
                                    <div className={cn("relative flex h-16 w-16 items-center justify-center rounded-full border-2 bg-background transition-all duration-300",
                                        isSelected ? 'border-primary shadow-lg shadow-primary/20 scale-110' : 'border-border group-hover:border-primary/50'
                                    )}>
                                        <Icon className={cn("h-7 w-7 transition-colors", isSelected ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')} />
                                        <span className="absolute -bottom-8 text-sm font-semibold">{item.title}</span>
                                    </div>
                                </div>
                            )})}
                        </div>
                    </div>

                    {selectedStep && (
                         <div className="mt-24">
                             <AnimatePresence mode="wait">
                                 <motion.div
                                    key={selectedStep.step}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -50 }}
                                    transition={{ duration: 0.5 }}
                                    className="p-8 md:p-12 rounded-2xl bg-card/50 border border-white/10 backdrop-blur-lg grid grid-cols-1 lg:grid-cols-5 gap-12 items-center"
                                >
                                    {selectedStep.image && (
                                        <div className="w-full lg:col-span-2">
                                            <Image
                                                src={selectedStep.image}
                                                alt={selectedStep.title}
                                                width={800}
                                                height={600}
                                                data-ai-hint={selectedStep['data-ai-hint']}
                                                className="rounded-xl shadow-lg object-cover w-full h-auto"
                                            />
                                        </div>
                                    )}
                                    <div className={cn("lg:col-span-3", !selectedStep.image && "lg:col-span-5 lg:text-center")}>
                                        <h3 className="font-headline text-2xl font-bold text-primary">{selectedStep.title}</h3>
                                        <p className="mt-4 text-muted-foreground text-lg">{selectedStep.description}</p>
                                    </div>
                                </motion.div>
                             </AnimatePresence>
                         </div>
                    )}
                </div>
            </div>
        </section>
    );
}
