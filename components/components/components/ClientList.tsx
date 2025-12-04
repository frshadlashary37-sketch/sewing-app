import React, { useState, useMemo } from 'react';
import { Client } from '../types';
import { Search, User, Plus, ChevronLeft } from 'lucide-react';

interface ClientListProps {
  clients: Client[];
  onSelectClient: (client: Client) => void;
  onAddNew: () => void;
}

export const ClientList: React.FC<ClientListProps> = ({ clients, onSelectClient, onAddNew }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = useMemo(() => {
    return clients.filter(client => 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      client.phoneNumber.includes(searchTerm)
    );
  }, [clients, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="جستجو نام یا شماره مشتری..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        <button
          onClick={onAddNew}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 transition-colors"
        >
          <Plus size={20} />
          مشتری جدید
        </button>
      </div>

      {/* Clients Grid */}
      {filteredClients.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <User size={32} />
          </div>
          <p className="text-gray-500 font-medium">هیچ مشتری‌ای پیدا نشد.</p>
          {clients.length === 0 && (
            <p className="text-gray-400 text-sm mt-2">اولین مشتری خود را اضافه کنید!</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              onClick={() => onSelectClient(client)}
              className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 cursor-pointer transition-all hover:-translate-y-1 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-2 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{client.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{client.phoneNumber || 'بدون شماره'}</p>
                </div>
                <div className="bg-indigo-50 p-2 rounded-full text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <User size={20} />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-2 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <span className="block text-xs text-gray-400">شکم</span>
                  <span className="font-mono font-medium text-gray-700">{client.measurements.waist || '-'}</span>
                </div>
                <div className="text-center">
                  <span className="block text-xs text-gray-400">قد شلوار</span>
                  <span className="font-mono font-medium text-gray-700">{client.measurements.pantsLength || '-'}</span>
                </div>
                <div className="text-center">
                  <span className="block text-xs text-gray-400">شانه</span>
                  <span className="font-mono font-medium text-gray-700">{client.measurements.shoulderWidth || '-'}</span>
                </div>
              </div>

              <div className="flex items-center justify-end mt-4 text-indigo-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                مشاهده جزئیات
                <ChevronLeft size={16} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

