import React, { useState, useEffect } from 'react';
import { Client, Measurements } from '../types';
import { Save, X } from 'lucide-react';

interface ClientFormProps {
  initialData?: Client | null;
  onSave: (client: Client) => void;
  onCancel: () => void;
}

const emptyMeasurements: Measurements = {
  waist: '',
  pantsLength: '',
  shoulderWidth: '',
  neck: '',
  sleeve: '',
  wrist: '',
  notes: ''
};

export const ClientForm: React.FC<ClientFormProps> = ({ initialData, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [measurements, setMeasurements] = useState<Measurements>(emptyMeasurements);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPhoneNumber(initialData.phoneNumber);
      setMeasurements(initialData.measurements);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clientData: Client = {
      id: initialData ? initialData.id : crypto.randomUUID(),
      name,
      phoneNumber,
      measurements,
      createdAt: initialData ? initialData.createdAt : Date.now(),
    };
    onSave(clientData);
  };

  const handleMeasurementChange = (field: keyof Measurements, value: string) => {
    setMeasurements(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-2xl mx-auto border border-indigo-100">
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-indigo-900">
          {initialData ? 'ویرایش مشتری' : 'افزودن مشتری جدید'}
        </h2>
        <button onClick={onCancel} className="text-gray-400 hover:text-red-500 transition-colors">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">نام و نام خانوادگی</label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="مثال: علی رضایی"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">شماره تماس</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="مثال: 0912..."
            />
          </div>
        </div>

        <div className="border-t border-gray-100 my-4"></div>
        <h3 className="text-lg font-semibold text-indigo-800 mb-4">اندازه‌ها (سانتی‌متر)</h3>

        {/* Measurements Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {[
            { key: 'waist', label: 'دور شکم' },
            { key: 'pantsLength', label: 'قد شلوار' },
            { key: 'shoulderWidth', label: 'عرض شانه' },
            { key: 'neck', label: 'دور یقه' },
            { key: 'sleeve', label: 'قد آستین' },
            { key: 'wrist', label: 'دور مچ' },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-xs font-medium text-gray-500 mb-1">{field.label}</label>
              <input
                type="number"
                value={measurements[field.key as keyof Measurements]}
                onChange={(e) => handleMeasurementChange(field.key as keyof Measurements, e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none text-center font-mono text-lg"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">توضیحات تکمیلی</label>
          <textarea
            value={measurements.notes}
            onChange={(e) => handleMeasurementChange('notes', e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none"
            placeholder="مدل یقه، نوع پارچه و..."
          ></textarea>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 font-bold shadow-lg shadow-indigo-200"
          >
            <Save size={20} />
            ذخیره اطلاعات
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors font-medium"
          >
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
};
