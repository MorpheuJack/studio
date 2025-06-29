'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LessonHeader } from '@/components/layout/LessonHeader';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Regex to specifically match lesson pages and not other nested routes.
  const isLessonPage = /^\/courses\/[^/]+\/lessons\/[^/]+$/.test(pathname);

  return (
    <div className="flex min-h-screen flex-col">
      {isLessonPage ? <LessonHeader /> : <Header />}
      <main className="flex-1">
        {children}
      </main>
      {!isLessonPage && <Footer />}
    </div>
  );
}
