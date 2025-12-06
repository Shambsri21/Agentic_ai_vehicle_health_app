import { motion } from 'motion/react';
import { User, Car, Bell, Shield, Globe, ChevronRight, LogOut, Mail, Phone } from 'lucide-react';
import { Button } from './ui/button';

export function ProfileSettings() {
  const userInfo = {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    memberSince: 'January 2023'
  };

  const vehicleInfo = {
    make: 'Tesla',
    model: 'Model 3',
    year: 2022,
    vin: 'WXYZ123456789',
    mileage: '24,500 miles'
  };

  const settingsSections = [
    {
      title: 'Account',
      icon: User,
      items: [
        { label: 'Personal Information', icon: User },
        { label: 'Email & Password', icon: Mail },
        { label: 'Phone Number', icon: Phone }
      ]
    },
    {
      title: 'Vehicle',
      icon: Car,
      items: [
        { label: 'Vehicle Details', icon: Car },
        { label: 'Service History', icon: ChevronRight },
        { label: 'Linked Devices', icon: ChevronRight }
      ]
    },
    {
      title: 'Preferences',
      icon: Bell,
      items: [
        { label: 'Notifications', icon: Bell, toggle: true, enabled: true },
        { label: 'IVR Language', icon: Globe, value: 'English' },
        { label: 'Auto-Schedule', icon: ChevronRight, toggle: true, enabled: true }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      items: [
        { label: 'Privacy Settings', icon: Shield },
        { label: 'Security & Login', icon: ChevronRight },
        { label: 'Data & Permissions', icon: ChevronRight }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0E1A] p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Profile & Settings</h1>
        <p className="text-gray-400">Manage your account and preferences</p>
      </div>

      {/* User Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-6 mb-6 relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
              AJ
            </div>
            <div className="flex-1">
              <h2 className="text-xl mb-1">{userInfo.name}</h2>
              <p className="text-blue-100 text-sm mb-2">{userInfo.email}</p>
              <p className="text-blue-100 text-xs">Member since {userInfo.memberSince}</p>
            </div>
          </div>
        </div>
        
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -left-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      </motion.div>

      {/* Vehicle Info Card */}
      <div className="bg-[#141824] rounded-2xl p-5 border border-gray-800 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <Car className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="mb-0.5">My Vehicle</h3>
            <p className="text-sm text-gray-400">Primary vehicle</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Make & Model</span>
            <span>{vehicleInfo.make} {vehicleInfo.model}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Year</span>
            <span>{vehicleInfo.year}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">VIN</span>
            <span className="font-mono text-xs">{vehicleInfo.vin}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Mileage</span>
            <span>{vehicleInfo.mileage}</span>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6 mb-6">
        {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 className="text-lg mb-3 flex items-center gap-2">
              <section.icon className="w-5 h-5 text-gray-400" />
              {section.title}
            </h2>
            <div className="bg-[#141824] rounded-2xl border border-gray-800 overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  className={`w-full flex items-center justify-between p-4 hover:bg-[#1a1f35] transition-colors ${
                    itemIndex !== section.items.length - 1 ? 'border-b border-gray-800' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.value && (
                      <span className="text-sm text-gray-400">{item.value}</span>
                    )}
                    {item.toggle ? (
                      <div className={`w-11 h-6 rounded-full transition-colors ${
                        item.enabled ? 'bg-blue-500' : 'bg-gray-700'
                      }`}>
                        <div className={`w-5 h-5 bg-white rounded-full m-0.5 transition-transform ${
                          item.enabled ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </div>
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <Button
        variant="outline"
        className="w-full h-14 bg-transparent border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 rounded-xl"
      >
        <LogOut className="w-5 h-5 mr-2" />
        Log Out
      </Button>

      <div className="text-center mt-6 pb-4">
        <p className="text-xs text-gray-500">VehicleAI v2.1.0</p>
        <p className="text-xs text-gray-600 mt-1">© 2025 VehicleAI Inc.</p>
      </div>
    </div>
  );
}
