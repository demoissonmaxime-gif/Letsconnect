import { Users, Calendar, Scan as ScanIcon, TrendingUp } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface Contact {
  id: string;
  name: string;
  meetDate: string;
  status: 'pending' | 'matched' | 'scheduled';
  interests: string[];
}

interface HomeScreenProps {
  contacts: Contact[];
  onScan: () => void;
}

export function HomeScreen({ contacts, onScan }: HomeScreenProps) {
  const stats = {
    connections: contacts.length,
    pending: contacts.filter(c => c.status === 'pending').length,
    scheduled: contacts.filter(c => c.status === 'scheduled').length
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] text-white px-6 py-8 rounded-b-3xl">
        <h1 className="text-3xl font-bold mb-2">Let's Connect</h1>
        <p className="text-white/90">Cultivez vos relations</p>
      </div>

      {/* Stats Cards */}
      <div className="px-6 -mt-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <Users className="w-6 h-6 text-[#FF6B35] mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.connections}</div>
            <div className="text-xs text-gray-600">Contacts</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <TrendingUp className="w-6 h-6 text-[#FF6B35] mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
            <div className="text-xs text-gray-600">En attente</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <Calendar className="w-6 h-6 text-[#FF6B35] mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.scheduled}</div>
            <div className="text-xs text-gray-600">Planifiés</div>
          </div>
        </div>
      </div>

      {/* Quick Action */}
      <div className="px-6 mb-6">
        <Button
          onClick={onScan}
          className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white h-16 text-lg rounded-2xl shadow-lg"
        >
          <ScanIcon className="mr-2 w-6 h-6" />
          Scanner un nouveau contact
        </Button>
      </div>

      {/* Recent Connections */}
      <div className="px-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Connexions récentes</h2>
        <div className="space-y-3">
          {contacts.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Aucun contact pour le moment</p>
              <p className="text-sm text-gray-500 mt-2">Scannez votre premier contact pour commencer</p>
            </div>
          ) : (
            contacts.map((contact) => (
              <div key={contact.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] flex items-center justify-center text-white font-semibold text-lg">
                      {contact.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                      <p className="text-sm text-gray-500">{contact.meetDate}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    contact.status === 'scheduled' ? 'bg-green-100 text-green-700' :
                    contact.status === 'matched' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {contact.status === 'scheduled' ? 'Planifié' :
                     contact.status === 'matched' ? 'Match' : 'En attente'}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {contact.interests.slice(0, 3).map((interest) => (
                    <span key={interest} className="px-3 py-1 bg-orange-50 text-[#FF6B35] text-xs rounded-full">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
