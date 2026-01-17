import { CheckCircle2, Calendar, MapPin, MessageCircle, Instagram, Linkedin, Phone } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion } from 'motion/react';

interface ConfirmationScreenProps {
  contactName: string;
  activity: string;
  date: string;
  location: string;
  onFinish: () => void;
}

export function ConfirmationScreen({ 
  contactName, 
  activity, 
  date, 
  location, 
  onFinish 
}: ConfirmationScreenProps) {
  const iceBreakers = [
    `Salut ${contactName} ! Hâte de te revoir ${date.toLowerCase()} 😊`,
    `Hey ${contactName}, c'est confirmé pour ${date.toLowerCase()} ! À très vite 🎉`,
    `${contactName}, rendez-vous ${date.toLowerCase()} ! 👋`
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-24">
      {/* Success Animation */}
      <div className="flex flex-col items-center justify-center pt-16 pb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        >
          <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-16 h-16 text-white" />
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-gray-900 mb-2"
        >
          C'est confirmé ! 🎉
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 text-center px-6"
        >
          Votre rendez-vous avec {contactName} est planifié
        </motion.p>
      </div>

      {/* Event Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mx-6 mb-6"
      >
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] flex items-center justify-center text-white font-bold text-xl">
              {contactName.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{contactName}</h3>
              <p className="text-sm text-gray-600">{activity}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#FF6B35] mt-0.5" />
              <div>
                <div className="text-sm text-gray-500">Date & Heure</div>
                <div className="font-medium text-gray-900">{date}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#FF6B35] mt-0.5" />
              <div>
                <div className="text-sm text-gray-500">Lieu</div>
                <div className="font-medium text-gray-900">{location}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ice Breakers */}
      <div className="mx-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <MessageCircle className="w-5 h-5 text-[#FF6B35]" />
          <h3 className="font-semibold text-gray-900">Messages suggérés</h3>
        </div>
        
        <div className="space-y-2">
          {iceBreakers.map((message, index) => (
            <button
              key={index}
              onClick={() => copyToClipboard(message)}
              className="w-full bg-white rounded-2xl p-4 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors border border-gray-100"
            >
              {message}
            </button>
          ))}
        </div>
      </div>

      {/* Contact Options */}
      <div className="mx-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Contacter {contactName}</h3>
        <div className="grid grid-cols-3 gap-3">
          <button className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
            <Phone className="w-6 h-6 text-[#FF6B35]" />
            <span className="text-xs font-medium text-gray-700">Appeler</span>
          </button>
          <button className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
            <Instagram className="w-6 h-6 text-[#FF6B35]" />
            <span className="text-xs font-medium text-gray-700">Instagram</span>
          </button>
          <button className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
            <Linkedin className="w-6 h-6 text-[#FF6B35]" />
            <span className="text-xs font-medium text-gray-700">LinkedIn</span>
          </button>
        </div>
      </div>

      {/* Finish Button */}
      <div className="mx-6">
        <Button
          onClick={onFinish}
          className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white h-14 text-lg rounded-full"
        >
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
}
