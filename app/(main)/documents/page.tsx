'use client';
import { useUser } from '@/components/UserContext';
import { DocumentCard } from '@/components/DocumentCard';
import { Plus, Settings } from 'lucide-react';
import Link from 'next/link';

export default function DocumentsPage() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dokumenty</h1>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <Settings size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <Plus size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">Dostosuj · Dodaj</p>
      </div>

      <div className="p-4">
        <Link href="/documents/mDowod">
          <DocumentCard
            title="mDowód"
            subtitle={`${user.firstName} ${user.lastName}`}
            badge="WAŻNY"
          />
        </Link>
      </div>
    </div>
  );
}
