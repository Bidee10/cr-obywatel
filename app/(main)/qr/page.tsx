'use client';
import { useState } from 'react';
import QRCode from 'qrcode.react';
import { useUser } from '@/components/UserContext';
import { QrCode, Scan } from 'lucide-react';

export default function QRPage() {
  const [mode, setMode] = useState<'scan' | 'show'>('show');
  const { user } = useUser();
  const userData = user ? { pesel: user.pesel, name: `${user.firstName} ${user.lastName}` } : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Kod QR</h1>
        <p className="text-sm text-gray-500 mt-1">Zaloguj się lub potwierdź dokument</p>
      </div>
      <div className="flex border-b border-gray-200 bg-white">
        <button onClick={() => setMode('scan')} className={`flex-1 py-3 flex justify-center items-center gap-2 ${mode === 'scan' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}><Scan size={20} /> Skanuj</button>
        <button onClick={() => setMode('show')} className={`flex-1 py-3 flex justify-center items-center gap-2 ${mode === 'show' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}><QrCode size={20} /> Pokaż</button>
      </div>
      <div className="p-4">
        {mode === 'show' && userData && (
          <div className="bg-white rounded-2xl p-6 text-center">
            <div className="flex justify-center mb-4"><QRCode value={JSON.stringify(userData)} size={200} /></div>
            <p className="text-xs text-gray-500">Poproś osobę o zeskanowanie tego kodu</p>
          </div>
        )}
        {mode === 'scan' && (
          <div className="bg-white rounded-2xl p-6 text-center">
            <p className="text-gray-500">Skanowanie QR dostępne po włączeniu kamery</p>
            <p className="text-xs text-gray-400 mt-2">Wymaga HTTPS i dostępu do kamery</p>
          </div>
        )}
      </div>
    </div>
  );
}
