import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function NewsletterCta() {
  return (
    <div className="container mx-auto my-24 px-4 sm:px-6 lg:px-8">
      <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-card to-muted/30 shadow-2xl shadow-primary/10">
        <div className="grid items-center md:grid-cols-2">
            <CardHeader className="p-8 md:p-12">
              <div className="flex items-center gap-4 text-primary">
                  <Mail className="h-8 w-8" />
                  <CardTitle className="font-headline text-3xl font-bold">Fique por Dentro</CardTitle>
              </div>
              <CardDescription className="mt-2 text-lg">
                Assine nossa newsletter e receba as últimas novidades sobre IA, tecnologia e aprendizado diretamente no seu email.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center p-8 pt-0 md:py-12">
              <form className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="seu@email.com" className="flex-1" />
                <Button type="submit">Inscrever-se</Button>
              </form>
            </CardContent>
        </div>
      </Card>
    </div>
  );
}
