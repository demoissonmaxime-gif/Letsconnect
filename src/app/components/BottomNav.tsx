import { Home, Scan, Bell, User } from 'lucide-react';

interface BottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function BottomNav({ currentView, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Accueil' },
    { id: 'scan', icon: Scan, label: 'Scanner' },
    { id: 'notifications', icon: Bell, label: 'Activité' },
    { id: 'profile', icon: User, label: 'Profil' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
      <div className="max-w-md mx-auto px-2 py-2">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${
                  isActive ? 'text-[#FF6B35]' : 'text-gray-500'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'fill-[#FF6B35] stroke-[#FF6B35]' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
