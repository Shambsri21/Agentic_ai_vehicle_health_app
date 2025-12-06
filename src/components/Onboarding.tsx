import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, Bluetooth, Bell, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to VehicleAI',
      subtitle: 'Your intelligent vehicle health companion',
      icon: Sparkles,
      description: 'Predict failures before they happen. Auto-schedule maintenance. Experience seamless AI-powered support.',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      title: 'Grant Permissions',
      subtitle: 'We need a few permissions to monitor your vehicle',
      icon: Bell,
      description: 'Location, Bluetooth/OBD access, and notifications help us provide real-time diagnostics.',
      permissions: [
        { icon: MapPin, name: 'Location Access', description: 'Find nearby workshops' },
        { icon: Bluetooth, name: 'Bluetooth/OBD', description: 'Connect to vehicle sensors' },
        { icon: Bell, name: 'Notifications', description: 'Get maintenance alerts' }
      ],
      color: 'from-purple-500 to-pink-400'
    },
    {
      title: 'Link Your Vehicle',
      subtitle: 'Connect to start monitoring',
      icon: Car,
      description: 'Enter your vehicle details or scan the VIN to get started with predictive diagnostics.',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'AI System Ready',
      subtitle: 'Predictive intelligence activated',
      icon: Sparkles,
      description: 'Our AI will now monitor your vehicle 24/7, predict issues, and optimize maintenance.',
      color: 'from-green-500 to-emerald-400'
    }
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E1A] via-[#1a1f35] to-[#0A0E1A] flex flex-col items-center justify-center p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className={`w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${currentStep.color} flex items-center justify-center`}
            >
              <currentStep.icon className="w-12 h-12 text-white" />
            </motion.div>
            
            <h1 className="text-3xl mb-3">{currentStep.title}</h1>
            <p className="text-gray-400">{currentStep.subtitle}</p>
          </div>

          <div className="bg-[#141824] rounded-2xl p-6 mb-8 border border-gray-800">
            <p className="text-gray-300 leading-relaxed mb-6">
              {currentStep.description}
            </p>

            {currentStep.permissions && (
              <div className="space-y-3">
                {currentStep.permissions.map((perm, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-[#1a1f35] rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <perm.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm mb-1">{perm.name}</p>
                      <p className="text-xs text-gray-400">{perm.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleNext}
              className="w-full h-14 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white rounded-xl"
            >
              {step < steps.length - 1 ? 'Continue' : 'Get Started'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>

            {/* Progress indicators */}
            <div className="flex justify-center gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === step ? 'w-8 bg-blue-500' : 'w-1.5 bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
