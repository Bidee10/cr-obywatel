'use client';
import { useUser } from '@/components/UserContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, User, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ZmienDanePage() {
  const { user, updateUser } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    pesel: user?.pesel || '',
    citizenship: user?.citizenship || '',
    mDowod_series: user?.mDowod.series || '',
    mDowod_number: user?.mDowod.number || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!user) return;
    updateUser({
      firstName: formData.firstName.toUpperCase(),
      lastName: formData.lastName.toUpperCase(),
      pesel: formData.pesel,
      citizenship: formData.citizenship.toUpperCase(),
      mDowod: { ...user.mDowod, series: formData.mDowod_series.toUpperCase(), number: formData.mDowod_number },
    });
    toast.success('Dane zapisane!');
    setTimeout(() => router.push('/more'), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
        <Link href="/more"><ArrowLeft size={24} className="text-gray-600" /></Link>
        <h1 className="text-2xl font-bold text-gray-900">Zmień dane</h1>
      </div>
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-2xl p-4">
          <h2 className="font-semibold mb-3 flex items-center gap-2"><User size={18} /> Dane osobowe</h2>
          <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Imię" className="w-full p-2 border rounded-lg mb-2" />
          <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Nazwisko" className="w-full p-2 border rounded-lg mb-2" />
          <input name="pesel" value={formData.pesel} onChange={handleChange} placeholder="PESEL" className="w-full p-2 border rounded-lg mb-2" />
          <input name="citizenship" value={formData.citizenship} onChange={handleChange} placeholder="Obywatelstwo" className="w-full p-2 border rounded-lg" />
        </div>
        <div className="bg-white rounded-2xl p-4">
          <h2 className="font-semibold mb-3 flex items-center gap-2"><CreditCard size={18} /> mDowód</h2>
          <input name="mDowod_series" value={formData.mDowod_series} onChange={handleChange} placeholder="Seria (np. ZZC)" className="w-full p-2 border rounded-lg mb-2" />
          <input name="mDowod_number" value={formData.mDowod_number} onChange={handleChange} placeholder="Numer" className="w-full p-2 border rounded-lg" />
        </div>
        <button onClick={handleSave} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"><Save size={18} /> Zapisz zmiany</button>
      </div>
    </div>
  );
}
