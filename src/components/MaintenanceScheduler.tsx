import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, MapPin, Star, Clock, Wrench, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export function MaintenanceScheduler() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState<number | null>(null);

  // Generate calendar days
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push({ day: null, available: false });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      available: i >= today.getDate() && i <= today.getDate() + 14,
      isAIRecommended: i === today.getDate() + 3
    });
  }

  const workshops = [
    {
      id: 1,
      name: 'AutoCare Pro',
      rating: 4.8,
      reviews: 342,
      distance: '2.3 km',
      specialties: ['Brake Service', 'Oil Change'],
      nextSlot: 'Today, 2:30 PM',
      isAIRecommended: true
    },
    {
      id: 2,
      name: 'QuickFix Motors',
      rating: 4.6,
      reviews: 218,
      distance: '3.1 km',
      specialties: ['Diagnostics', 'Fluid Check'],
      nextSlot: 'Tomorrow, 10:00 AM',
      isAIRecommended: false
    },
    {
      id: 3,
      name: 'Elite Auto Service',
      rating: 4.9,
      reviews: 456,
      distance: '4.8 km',
      specialties: ['Full Service', 'Brake Repair'],
      nextSlot: 'Today, 4:00 PM',
      isAIRecommended: false
    }
  ];

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="min-h-screen bg-[#0A0E1A] p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Schedule Service</h1>
        <p className="text-gray-400">Book your maintenance appointment</p>
      </div>

      {/* AI Recommended Slot */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-5 mb-6"
      >
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-blue-50 text-sm mb-1">AI Recommended Slot</p>
            <p className="text-lg mb-1">{monthNames[currentMonth]} {today.getDate() + 3}, 2:30 PM</p>
            <p className="text-blue-100 text-sm">Optimal timing based on your brake fluid levels</p>
          </div>
        </div>
        <Button
          onClick={() => setSelectedDate(today.getDate() + 3)}
          className="w-full bg-white/20 hover:bg-white/30 text-white border-0 rounded-xl"
        >
          Select This Slot
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>

      {/* Calendar */}
      <div className="mb-6">
        <h2 className="text-lg mb-3 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          Choose Date
        </h2>
        <div className="bg-[#141824] rounded-2xl p-5 border border-gray-800">
          <div className="text-center mb-4">
            <p className="text-lg">{monthNames[currentMonth]} {currentYear}</p>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs text-gray-500 py-1">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((item, index) => (
              <div key={index}>
                {item.day ? (
                  <button
                    onClick={() => item.available && setSelectedDate(item.day)}
                    disabled={!item.available}
                    className={`w-full aspect-square rounded-lg text-sm flex items-center justify-center relative transition-all ${
                      selectedDate === item.day
                        ? 'bg-blue-500 text-white'
                        : item.available
                        ? 'bg-[#1a1f35] text-white hover:bg-[#232940]'
                        : 'text-gray-700 cursor-not-allowed'
                    } ${item.isAIRecommended ? 'ring-2 ring-cyan-400' : ''}`}
                  >
                    {item.day}
                    {item.isAIRecommended && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full" />
                    )}
                  </button>
                ) : (
                  <div />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nearby Workshops */}
      <div className="mb-6">
        <h2 className="text-lg mb-3 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Nearby Workshops
        </h2>
        <div className="space-y-3">
          {workshops.map((workshop) => (
            <motion.div
              key={workshop.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: workshop.id * 0.1 }}
              onClick={() => setSelectedWorkshop(workshop.id)}
              className={`bg-[#141824] rounded-2xl p-4 border transition-all cursor-pointer ${
                selectedWorkshop === workshop.id
                  ? 'border-blue-500'
                  : 'border-gray-800 hover:border-gray-700'
              } ${workshop.isAIRecommended ? 'ring-2 ring-cyan-400/30' : ''}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p>{workshop.name}</p>
                    {workshop.isAIRecommended && (
                      <div className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded">
                        AI Pick
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      {workshop.rating} ({workshop.reviews})
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {workshop.distance}
                    </span>
                  </div>
                </div>
                <Wrench className={`w-5 h-5 ${selectedWorkshop === workshop.id ? 'text-blue-400' : 'text-gray-600'}`} />
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {workshop.specialties.map((specialty, index) => (
                  <span key={index} className="px-2 py-1 bg-[#1a1f35] text-xs rounded-lg text-gray-300">
                    {specialty}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Next slot: {workshop.nextSlot}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Confirm Button */}
      <Button
        disabled={!selectedDate || !selectedWorkshop}
        className="w-full h-14 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Confirm Appointment
      </Button>
    </div>
  );
}
