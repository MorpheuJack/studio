'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  // Regex to specifically match lesson pages and not other nested routes.
  const isLessonPage = /^\/courses\/[^/]+\/lessons\/[^/]+$/.test(pathname);
  const isAuthPage = pathname === '/auth';

  const showHeader = !isAuthPage && !(isLessonPage && !isAuthenticated);

  return (
    <div className="flex min-h-screen flex-col">
      {showHeader && <Header />}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      {!isLessonPage && !isAuthPage && <Footer />}
    </div>
  );
}
