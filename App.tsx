import React, { useState, useEffect } from 'react';
import { ClientList } from './components/ClientList';
import { ClientForm } from './components/ClientForm';
import { ClientDetails } from './components/ClientDetails';
import { Client, ViewState } from './types';
import { Scissors } from 'lucide-react';

const App: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [view, setView] = useState<ViewState>('LIST');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Load from LocalStorage
  useEffect(() => {
    const savedClients = localStorage.getItem('sewing_clients');
    if (savedClients) {
      try {
        setClients(JSON.parse(savedClients));
      } catch (e) {
        console.error("Error parsing clients from local storage", e);
      }
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('sewing_clients', JSON.stringify(clients));
  }, [clients]);

  const handleSaveClient = (client: Client) => {
    if (view === 'EDIT' && selectedClient) {
      setClients(prev => prev.map(c => c.id === client.id ? client : c));
      setSelectedClient(client); // Update the view with new data
      setView('DETAILS');
    } else {
      setClients(prev => [client, ...prev]);
      setView('LIST');
    }
  };

  const handleDeleteClient = (id: string) => {
    if (confirm('آیا مطمئن هستید که می‌خواهید این مشتری را حذف کنید؟')) {
      setClients(prev => prev.filter(c => c.id !== id));
      setView('LIST');
      setSelectedClient(null);
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'LIST':
        return (
          <ClientList 
            clients={clients} 
            onSelectClient={(c) => {
              setSelectedClient(c);
              setView('DETAILS');
            }}
            onAddNew={() => {
              setSelectedClient(null);
              setView('ADD');
            }}
          />
        );
      case 'ADD':
        return (
          <ClientForm 
            onSave={handleSaveClient} 
            onCancel={() => setView('LIST')} 
          />
        );
      case 'DETAILS':
        return selectedClient ? (
          <ClientDetails 
            client={selectedClient} 
            onBack={() => setView('LIST')}
            onEdit={(c) => {
              setSelectedClient(c);
              setView('EDIT');
            }}
          />
        ) : null;
      case 'EDIT':
        return (
          <ClientForm 
            initialData={selectedClient}
            onSave={handleSaveClient} 
            onCancel={() => setView('DETAILS')} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Navbar */}
      <nav className="bg-indigo-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3" onClick={() => setView('LIST')} style={{cursor: 'pointer'}}>
            <div className="bg-white p-2 rounded-full text-indigo-900">
              <Scissors size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-wide">مدیریت خیاطی</h1>
          </div>
          <div className="text-sm opacity-80 hidden sm:block">
            {clients.length} مشتری ثبت شده
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;