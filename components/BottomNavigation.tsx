'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Grid, QrCode, MoreHorizontal } from 'lucide-react';

const navItems = [
  { name: 'Dokumenty', href: '/documents', icon: FileText },
  { name: 'Usługi', href: '/services', icon: Grid },
  { name: 'Kod QR', href: '/qr', icon: QrCode },
  { name: 'Więcej', href: '/more', icon: MoreHorizontal },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link key={item.href} href={item.href} className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
              <Icon size={24} />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
