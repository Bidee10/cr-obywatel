'use client';
import { FileText, Shield, Waves, Ban, Building2, AlertTriangle, Lock } from 'lucide-react';

const iconMap: { [key: string]: any } = {
  PenTool: FileText,
  Shield: Shield,
  Waves: Waves,
  Ban: Ban,
  Building2: Building2,
  AlertTriangle: AlertTriangle,
  Lock: Lock,
};

interface ServiceCardProps {
  name: string;
  icon: string;
}

export function ServiceCard({ name, icon }: ServiceCardProps) {
  const IconComponent = iconMap[icon] || FileText;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition cursor-pointer">
      <div className="flex flex-col items-center text-center gap-2">
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
          <IconComponent className="w-6 h-6 text-blue-600" />
        </div>
        <span className="text-sm font-medium text-gray-700">{name}</span>
      </div>
    </div>
  );
}
