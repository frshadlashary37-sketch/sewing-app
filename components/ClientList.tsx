import React, { useState } from 'react';
import { Client } from '../types';
import { ArrowRight, Edit, Ruler, Sparkles, Scissors } from 'lucide-react';
import { getFabricAdvice } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface ClientDetailsProps {
  client: Client;
  onBack: () => void;
  onEdit: (client: Client) => void;
}

export const ClientDetails: React.FC<ClientDetailsProps> = ({ client, onBack, onEdit }) => {
  const [garmentType, setGarmentType] = useState('پیراهن مردانه');
  const [gender, setGender] = useState('آقا');
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetAdvice = async () => {
    setLoading(true);
    setAdvice(null);
    const result = await getFabricAdvice(garmentType, client.measurements, gender);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm">
        <button onClick={onBack} className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
          <ArrowRight className="ml-2" size={20} />
          <span>بازگشت به لیست</span>
        </button>
        <h1 className="text-xl font-bold text-gray-800">{client.name}</h1>
        <button 
          onClick={() => onEdit(client)} 
          className="bg-indigo-50 text-indigo-600 p-2 rounded-lg hover:bg-indigo-100 transition-colors"
        >
          <Edit size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Measurements Card */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border-t-4 border-indigo-500">
          <div className="flex items-center gap-2 mb-6 text-indigo-900">
            <Ruler size={24} />
            <h2 className="text-lg font-bold">جدول اندازه‌ها</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { label: 'دور شکم', value: client.measurements.waist },
              { label: 'قد شلوار', value: client.measurements.pantsLength },
              { label: 'عرض شانه', value: client.measurements.shoulderWidth },
              { label: 'دور یقه', value: client.measurements.neck },
              { label: 'قد آستین', value: client.measurements.sleeve },
              { label: 'دور مچ', value: client.measurements.wrist },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">{item.label}</span>
                <span className="text-indigo-700 font-mono font-bold text-lg">
                  {item.value || '-'} <span className="text-xs font-normal text-gray-400">cm</span>
                </span>
              </div>
            ))}
          </div>

          {client.measurements.notes && (
            <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
              <h3 className="text-sm font-bold text-yellow-800 mb-2">یادداشت‌ها:</h3>
              <p className="text-gray-700 text-sm">{client.measurements.notes}</p>
            </div>
          )}
        </div>

        {/* AI Consultant */}
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white/20 p-2 rounded-lg">
              <Sparkles className="text-yellow-300" size={24} />
            </div>
            <h2 className="text-xl font-bold">دستیار هوشمند خیاطی</h2>
          </div>

          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm mb-6">
            <p className="text-indigo-100 mb-4 text-sm">
              برای محاسبه پارچه مورد نیاز و دریافت نکات دوخت، نوع لباس را انتخاب کنید و از هوش مصنوعی بپرسید.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-indigo-200 mb-1">نوع لباس</label>
                <input 
                  type="text" 
                  value={garmentType}
                  onChange={(e) => setGarmentType(e.target.value)}
                  className="w-full bg-white/20 border border-indigo-400/30 text-white placeholder-indigo-300 rounded-lg px-3 py-2 focus:outline-none focus:bg-white/30 transition-all"
                  placeholder="مثال: کت تک، مانتو..."
                />
              </div>
              <div>
                <label className="block text-xs text-indigo-200 mb-1">جنسیت</label>
                <select 
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-white/20 border border-indigo-400/30 text-white rounded-lg px-3 py-2 focus:outline-none [&>option]:text-gray-900"
                >
                  <option value="آقا">آقا</option>
                  <option value="خانم">خانم</option>
                  <option value="کودک">کودک</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleGetAdvice}
              disabled={loading}
              className="w-full bg-white text-indigo-900 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-indigo-900 border-t-transparent rounded-full animate-spin"></div>
                  در حال تفکر...
                </>
              ) : (
                <>
                  <Scissors size={20} />
                  محاسبه پارچه و مشاوره
                </>
              )}
            </button>
          </div>

          {advice && (
            <div className="bg-white text-gray-800 p-6 rounded-xl shadow-inner animate-fade-in max-h-96 overflow-y-auto">
              <div className="prose prose-sm prose-indigo max-w-none font-medium leading-relaxed" dir="rtl">
                <ReactMarkdown>{advice}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
