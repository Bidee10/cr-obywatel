'use client';
import { useUser } from '@/components/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import BottomNavigation from '@/components/BottomNavigation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="pb-16 min-h-screen bg-gray-50">
      {children}
      <BottomNavigation />
    </div>
  );
}
