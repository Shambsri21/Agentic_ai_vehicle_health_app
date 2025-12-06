import { Home, Activity, Calendar, MessageSquare, User } from 'lucide-react';

interface BottomNavigationProps {
  currentScreen: string;
  onNavigate: (screen: 'home' | 'analytics' | 'maintenance' | 'assistant' | 'profile') => void;
}

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'analytics', icon: Activity, label: 'Analytics' },
    { id: 'maintenance', icon: Calendar, label: 'Service' },
    { id: 'assistant', icon: MessageSquare, label: 'AI Chat' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0A0E1A] border-t border-gray-800 px-6 py-3 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as any)}
              className="flex flex-col items-center gap-1 py-2 px-3 transition-all"
            >
              <div className={`transition-all ${
                isActive ? 'text-blue-400 scale-110' : 'text-gray-500'
              }`}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs transition-all ${
                isActive ? 'text-blue-400' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 bg-blue-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
