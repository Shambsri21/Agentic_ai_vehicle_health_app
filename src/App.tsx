import { useState } from 'react';
import { Onboarding } from './components/Onboarding';
import { HomeDashboard } from './components/HomeDashboard';
import { PredictiveAnalytics } from './components/PredictiveAnalytics';
import { MaintenanceScheduler } from './components/MaintenanceScheduler';
import { AIAssistant } from './components/AIAssistant';
import { SecurityPanel } from './components/SecurityPanel';
import { ProfileSettings } from './components/ProfileSettings';
import { BottomNavigation } from './components/BottomNavigation';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'home' | 'analytics' | 'maintenance' | 'assistant' | 'security' | 'profile'>('onboarding');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    setCurrentScreen('home');
  };

  if (!hasCompletedOnboarding && currentScreen === 'onboarding') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white">
      <main className="pb-20 min-h-screen">
        {currentScreen === 'home' && <HomeDashboard onNavigate={setCurrentScreen} />}
        {currentScreen === 'analytics' && <PredictiveAnalytics />}
        {currentScreen === 'maintenance' && <MaintenanceScheduler />}
        {currentScreen === 'assistant' && <AIAssistant />}
        {currentScreen === 'security' && <SecurityPanel />}
        {currentScreen === 'profile' && <ProfileSettings />}
      </main>
      
      <BottomNavigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </div>
  );
}
