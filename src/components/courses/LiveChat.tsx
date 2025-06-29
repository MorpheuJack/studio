'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Users } from "lucide-react";

const chatMessages = [
    { name: 'Wijaya Abodi', message: 'Duis aute irure dolor in in proident velt esse cillum dolore eu fugiat.', avatar: 'https://placehold.co/40x40.png' },
    { name: 'Johnny Wise', message: 'tempor incididunt ut labore.', avatar: 'https://placehold.co/40x40.png' },
    { name: 'Budi Hokim', message: 'Duis aute irure dolor in in proident velt esse cillum dolore eu fugiat.', avatar: 'https://placehold.co/40x40.png' },
    { name: 'Thomas Hope', message: 'velt esse cillum dolore eu fugiat.', avatar: 'https://placehold.co/40x40.png' },
    { name: 'Revolução Cognitiva', message: 'Bem-vindo(a) à aula ao vivo! Sintam-se à vontade para enviar suas perguntas.', avatar: '/img/RG-personagem.png' },
];

export function LiveChat() {
    return (
        <Card className="flex flex-col h-[500px]">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Live Chat</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>15.3k pessoas</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden p-0">
                <ScrollArea className="h-full p-6">
                    <div className="space-y-6">
                        {chatMessages.map((msg, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <Avatar className="h-9 w-9 border-2 border-border">
                                    <AvatarImage src={msg.avatar} />
                                    <AvatarFallback>{msg.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-sm text-foreground">{msg.name}</p>
                                    <p className="text-sm text-muted-foreground">{msg.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="pt-4 border-t">
                <form className="relative w-full">
                    <Input
                        name="userMessage"
                        placeholder="Write your message"
                        className="pr-12"
                        autoComplete="off"
                    />
                    <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send Message</span>
                    </Button>
                </form>
            </CardFooter>
        </Card>
    )
}
