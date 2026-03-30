'use client';
import { useState } from 'react';
import { ServiceCard } from '@/components/ServiceCard';
import { Settings } from 'lucide-react';

const services = [
  { id: 1, name: 'Podpisz dokument', icon: 'PenTool', category: 'Ulubione' },
  { id: 2, name: 'Bezpiecznie w sieci', icon: 'Shield', category: 'Ulubione' },
  { id: 3, name: 'Alert powodziowy', icon: 'Waves', category: 'Ulubione' },
  { id: 4, name: 'Zastrzeż PESEL', icon: 'Ban', category: 'Ulubione' },
  { id: 5, name: 'Firma', icon: 'Building2', category: 'Inne' },
  { id: 6, name: 'Punkty karne', icon: 'AlertTriangle', category: 'Inne' },
  { id: 7, name: 'Mandaty', icon: 'FileText', category: 'Inne' },
  { id: 8, name: 'Ochrona danych', icon: 'Lock', category: 'Inne' },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('Ulubione');
  const categories = ['Ulubione', 'Inne'];
  const filteredServices = services.filter(s => s.category === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Usługi</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full"><Settings size={20} /></button>
        </div>
        <p className="text-sm text-gray-500 mt-1">Ulubione · Dostosuj</p>
      </div>
      <div className="border-b border-gray-200 bg-white">
        <div className="flex px-4">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveTab(cat)} className={`py-3 px-4 font-medium transition ${activeTab === cat ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 grid grid-cols-2 gap-3">
        {filteredServices.map(service => (<ServiceCard key={service.id} name={service.name} icon={service.icon} />))}
      </div>
    </div>
  );
}
