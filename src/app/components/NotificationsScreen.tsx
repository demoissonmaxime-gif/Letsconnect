import { Heart, X, Clock } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion } from 'motion/react';

interface Notification {
  id: string;
  type: 'reminder' | 'match' | 'schedule';
  contactName: string;
  message: string;
  date: string;
  responded?: boolean;
}

interface NotificationsScreenProps {
  notifications: Notification[];
  onRespond: (id: string, response: 'yes' | 'no') => void;
}

export function NotificationsScreen({ notifications, onRespond }: NotificationsScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Activité</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        {notifications.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center mt-8">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">Aucune notification</p>
            <p className="text-sm text-gray-500 mt-2">
              Vous serez notifié quand il sera temps de revoir vos contacts
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notif) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {notif.contactName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{notif.contactName}</h3>
                    <p className="text-sm text-gray-600 mb-1">{notif.message}</p>
                    <p className="text-xs text-gray-400">{notif.date}</p>
                  </div>
                </div>

                {notif.type === 'reminder' && !notif.responded && (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => onRespond(notif.id, 'yes')}
                      className="flex-1 bg-[#FF6B35] hover:bg-[#FF5722] text-white rounded-full"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Oui, le revoir
                    </Button>
                    <Button
                      onClick={() => onRespond(notif.id, 'no')}
                      variant="outline"
                      className="flex-1 border-gray-300 text-gray-700 rounded-full hover:bg-gray-50"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Non merci
                    </Button>
                  </div>
                )}

                {notif.type === 'match' && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                    <p className="text-sm text-green-700 font-medium text-center">
                      🎉 Match ! Vous voulez tous les deux vous revoir
                    </p>
                  </div>
                )}

                {notif.responded && notif.type === 'reminder' && (
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-sm text-gray-600 text-center">
                      Répondu
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
