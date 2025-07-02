import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { EnrollmentProvider } from '@/context/EnrollmentContext';
import { AuthProvider } from '@/context/AuthContext';
import { AppLayout } from '@/components/layout/AppLayout';

export const metadata: Metadata = {
  title: 'Revolução Cognitiva - A Forja para a Mente',
  description: 'Nós não ensinamos o que pensar. Nós construímos o lugar onde você aprende a pensar. Forje modelos mentais, não apenas acumule informações.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
        <div className="fixed inset-0 -z-10 h-full w-full bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_1000px_at_50%_200px,hsl(var(--primary)/0.08),transparent_40%)] bg-[length:200%_200%] animate-animated-gradient" />
        </div>
        <AuthProvider>
          <EnrollmentProvider>
            <AppLayout>
              {children}
            </AppLayout>
            <Toaster />
          </EnrollmentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
