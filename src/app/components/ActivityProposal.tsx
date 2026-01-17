import { useState } from 'react';
import { Coffee, Dumbbell, Video, Music, MapPin, Sparkles, Check } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion } from 'motion/react';

interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  location: string;
  icon: any;
}

interface ActivityProposalProps {
  contactName: string;
  selectedSlot: string;
  onConfirm: (activityId: string) => void;
  onReject: () => void;
}

export function ActivityProposal({ contactName, selectedSlot, onConfirm, onReject }: ActivityProposalProps) {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  // Mock activities basées sur les intérêts communs
  const activities: Activity[] = [
    {
      id: '1',
      type: 'Café',
      title: 'Café & Discussion',
      description: 'Un café tranquille pour mieux se connaître',
      location: 'Café des Arts, Paris 11ème',
      icon: Coffee
    },
    {
      id: '2',
      type: 'Sport',
      title: 'Session de sport',
      description: 'Une session de fitness ou course à pied',
      location: 'Parc des Buttes-Chaumont',
      icon: Dumbbell
    },
    {
      id: '3',
      type: 'Culture',
      title: 'Concert Jazz',
      description: 'Soirée jazz dans un club local',
      location: 'Le Sunset, Paris 1er',
      icon: Music
    },
    {
      id: '4',
      type: 'Virtuel',
      title: 'Visio-café',
      description: 'Un appel vidéo décontracté',
      location: 'En ligne',
      icon: Video
    }
  ];

  const handleConfirm = () => {
    if (selectedActivity) {
      onConfirm(selectedActivity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] text-white px-6 py-8 rounded-b-3xl">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6" />
          <span className="text-sm font-medium">Suggestion IA</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Activité proposée</h1>
        <p className="text-white/90">
          Pour votre rencontre avec <span className="font-semibold">{contactName}</span>
        </p>
        <div className="mt-3 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 inline-block">
          <p className="text-sm">{selectedSlot}</p>
        </div>
      </div>

      {/* Activities */}
      <div className="px-6 py-6">
        <p className="text-sm text-gray-600 mb-4">
          Basé sur vos centres d'intérêts communs
        </p>
        
        <div className="space-y-3">
          {activities.map((activity) => {
            const Icon = activity.icon;
            const isSelected = selectedActivity === activity.id;
            
            return (
              <motion.button
                key={activity.id}
                onClick={() => setSelectedActivity(activity.id)}
                whileTap={{ scale: 0.98 }}
                className={`w-full bg-white rounded-2xl p-5 shadow-sm border-2 transition-all text-left ${
                  isSelected
                    ? 'border-[#FF6B35] bg-orange-50'
                    : 'border-transparent hover:border-gray-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-[#FF6B35] text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full bg-[#FF6B35] flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{activity.location}</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <Button
            onClick={handleConfirm}
            disabled={!selectedActivity}
            className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white h-14 text-lg rounded-full disabled:opacity-50"
          >
            Valider cette activité
          </Button>
          <Button
            onClick={onReject}
            variant="outline"
            className="w-full border-gray-300 text-gray-700 h-14 text-lg rounded-full hover:bg-gray-50"
          >
            Proposer autre chose
          </Button>
        </div>
      </div>
    </div>
  );
}
