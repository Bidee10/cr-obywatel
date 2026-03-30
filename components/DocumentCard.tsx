'use client';
import { ChevronRight, IdCard } from 'lucide-react';

interface DocumentCardProps {
  title: string;
  subtitle: string;
  badge?: string;
}

export function DocumentCard({ title, subtitle, badge }: DocumentCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <IdCard className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {badge && <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">{badge}</span>}
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
