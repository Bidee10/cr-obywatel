'use client';
import { useUser } from '@/components/UserContext';
import { LogOut, Settings, User, Shield, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MorePage() {
  const { user, logout } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900">Więcej</h1>
      </div>
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-2xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
            <p className="text-sm text-gray-500 font-mono">{user.pesel}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden">
          <Link href="/more/zmien-dane">
            <div className="flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 transition">
              <Edit size={20} className="text-blue-600" />
              <span className="flex-1 font-medium">Zmień dane</span>
            </div>
          </Link>
          <div className="flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 transition">
            <Shield size={20} className="text-blue-600" />
            <span className="flex-1 font-medium">Bezpieczeństwo</span>
          </div>
          <div className="flex items-center gap-3 p-4 hover:bg-gray-50 transition">
            <Settings size={20} className="text-blue-600" />
            <span className="flex-1 font-medium">Ustawienia</span>
          </div>
        </div>

        <button onClick={handleLogout} className="w-full bg-red-50 text-red-600 rounded-2xl p-4 flex items-center gap-3 hover:bg-red-100 transition">
          <LogOut size={20} />
          <span className="font-medium">Wyloguj się</span>
        </button>
      </div>
    </div>
  );
}
