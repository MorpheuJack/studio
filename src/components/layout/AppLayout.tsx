
'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLessonPage = /^\/courses\/[^/]+\/lessons\/[^/]+$/.test(pathname);
  const isAuthPage = pathname === '/auth';


  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      {!isLessonPage && !isAuthPage && <Footer />}
    </div>
  );
}
