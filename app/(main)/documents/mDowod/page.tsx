'use client';
import { useUser } from '@/components/UserContext';
import { Copy, RefreshCw, KeyRound, MapPin, Calendar, Building } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MDowodPage() {
  const { user, updateUser } = useUser();

  if (!user) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Skopiowano!');
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pl-PL');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900">mDowód</h1>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-blue-600 rounded-2xl p-4 text-white">
          <p className="text-sm opacity-90">
            Czas: {new Date().toLocaleTimeString('pl-PL')} {new Date().toLocaleDateString('pl-PL')}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 space-y-3">
          <div><p className="text-xs text-gray-500 uppercase">Imię (imiona)</p><p className="font-semibold">{user.firstName}</p></div>
          <div><p className="text-xs text-gray-500 uppercase">Nazwisko</p><p className="font-semibold">{user.lastName}</p></div>
          <div><p className="text-xs text-gray-500 uppercase">Obywatelstwo</p><p className="font-semibold">{user.citizenship}</p></div>
          <div><p className="text-xs text-gray-500 uppercase">Data urodzenia</p><p className="font-semibold">{formatDate(user.dob)}</p></div>
          <div><p className="text-xs text-gray-500 uppercase">Numer PESEL</p><p className="font-semibold font-mono">{user.pesel}</p></div>
        </div>

        <div className="bg-white rounded-2xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <div><p className="text-xs text-gray-500 uppercase">Seria i numer</p><p className="font-semibold font-mono">{user.mDowod.series} {user.mDowod.number}</p></div>
            <button onClick={() => copyToClipboard(`${user.mDowod.series} ${user.mDowod.number}`)}><Copy size={18} /></button>
          </div>
          <div className="flex gap-2"><MapPin size={18} /><div><p className="text-xs text-gray-500 uppercase">Status</p><p className="font-semibold text-green-600">{user.mDowod.status}</p></div></div>
          <div className="flex gap-2"><Building size={18} /><div><p className="text-xs text-gray-500 uppercase">Organ wydający</p><p className="font-semibold">{user.mDowod.issuer}</p></div></div>
          <div className="flex gap-2"><Calendar size={18} /><div><p className="text-xs text-gray-500 uppercase">Termin ważności</p><p className="font-semibold">{formatDate(user.mDowod.validTo)}</p></div></div>
          <div><p className="text-xs text-gray-500 uppercase">Data wydania</p><p className="font-semibold">{formatDate(user.mDowod.issuedAt)}</p></div>
          <div className="pt-2 border-t"><p className="text-xs text-gray-500 uppercase">Ostatnia aktualizacja</p><p className="text-sm">{formatDate(user.mDowod.lastUpdated)}</p></div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => { const newDate = new Date().toISOString().split('T')[0]; updateUser({ mDowod: { ...user.mDowod, lastUpdated: newDate } }); toast.success('Zaktualizowano'); }} className="flex-1 bg-blue-600 text-white py-2 rounded-xl flex items-center justify-center gap-2"><RefreshCw size={18} /> Aktualizuj</button>
            <button className="flex-1 border py-2 rounded-xl flex items-center justify-center gap-2"><KeyRound size={18} /> Zmień PIN</button>
          </div>
        </div>
      </div>
    </div>
  );
}
