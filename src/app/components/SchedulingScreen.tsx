import { useState } from 'react';
import { Calendar, Clock, Check } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion } from 'motion/react';

interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

interface SchedulingScreenProps {
  contactName: string;
  onSelectSlot: (slotId: string) => void;
  onCancel: () => void;
}

export function SchedulingScreen({ contactName, onSelectSlot, onCancel }: SchedulingScreenProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Mock data - créneaux disponibles
  const timeSlots: TimeSlot[] = [
    { id: '1', date: 'Lundi 20 Jan', time: '18:00 - 20:00', available: true },
    { id: '2', date: 'Mardi 21 Jan', time: '12:00 - 14:00', available: true },
    { id: '3', date: 'Mercredi 22 Jan', time: '19:00 - 21:00', available: true },
    { id: '4', date: 'Jeudi 23 Jan', time: '18:30 - 20:30', available: true },
    { id: '5', date: 'Vendredi 24 Jan', time: '17:00 - 19:00', available: true },
    { id: '6', date: 'Samedi 25 Jan', time: '14:00 - 16:00', available: true },
  ];

  const handleConfirm = () => {
    if (selectedSlot) {
      onSelectSlot(selectedSlot);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] text-white px-6 py-8 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-semibold text-lg">
            {contactName.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{contactName}</h2>
            <p className="text-white/90 text-sm">Planifier une rencontre</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-white/90 text-sm">
          <Calendar className="w-4 h-4" />
          <span>Créneaux communs disponibles</span>
        </div>
      </div>

      {/* Time Slots */}
      <div className="px-6 py-6">
        <div className="space-y-3">
          {timeSlots.map((slot) => (
            <motion.button
              key={slot.id}
              onClick={() => setSelectedSlot(slot.id)}
              whileTap={{ scale: 0.98 }}
              className={`w-full bg-white rounded-2xl p-4 shadow-sm border-2 transition-all ${
                selectedSlot === slot.id
                  ? 'border-[#FF6B35] bg-orange-50'
                  : 'border-transparent hover:border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedSlot === slot.id ? 'bg-[#FF6B35] text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">{slot.date}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                      <Clock className="w-4 h-4" />
                      {slot.time}
                    </div>
                  </div>
                </div>
                {selectedSlot === slot.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 rounded-full bg-[#FF6B35] flex items-center justify-center"
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <Button
            onClick={handleConfirm}
            disabled={!selectedSlot}
            className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white h-14 text-lg rounded-full disabled:opacity-50"
          >
            Confirmer le créneau
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="w-full border-gray-300 text-gray-700 h-14 text-lg rounded-full hover:bg-gray-50"
          >
            Annuler
          </Button>
        </div>
      </div>
    </div>
  );
}
