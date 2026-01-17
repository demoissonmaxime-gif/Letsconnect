import { useState } from 'react';
import { Onboarding } from '@/app/components/Onboarding';
import { ProfileSetup, UserProfile } from '@/app/components/ProfileSetup';
import { HomeScreen } from '@/app/components/HomeScreen';
import { NFCScan } from '@/app/components/NFCScan';
import { NotificationsScreen } from '@/app/components/NotificationsScreen';
import { SchedulingScreen } from '@/app/components/SchedulingScreen';
import { ActivityProposal } from '@/app/components/ActivityProposal';
import { ConfirmationScreen } from '@/app/components/ConfirmationScreen';
import { ProfileScreen } from '@/app/components/ProfileScreen';
import { BottomNav } from '@/app/components/BottomNav';

type AppScreen = 
  | 'onboarding' 
  | 'profile-setup' 
  | 'home' 
  | 'scan' 
  | 'notifications' 
  | 'profile'
  | 'scheduling'
  | 'activity'
  | 'confirmation';

interface Contact {
  id: string;
  name: string;
  meetDate: string;
  status: 'pending' | 'matched' | 'scheduled';
  interests: string[];
}

interface Notification {
  id: string;
  type: 'reminder' | 'match' | 'schedule';
  contactName: string;
  message: string;
  date: string;
  responded?: boolean;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('onboarding');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'reminder',
      contactName: 'Sophie Martin',
      message: 'Ça fait une semaine que vous vous êtes rencontrés. Voulez-vous la revoir ?',
      date: 'Il y a 2 heures'
    }
  ]);
  const [currentContact, setCurrentContact] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [selectedActivity, setSelectedActivity] = useState<{
    name: string;
    date: string;
    location: string;
  } | null>(null);

  // Handler pour compléter l'onboarding
  const handleOnboardingComplete = () => {
    setCurrentScreen('profile-setup');
  };

  // Handler pour compléter le profil
  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentScreen('home');
  };

  // Handler pour scanner un contact
  const handleScanComplete = (contactName: string) => {
    const newContact: Contact = {
      id: Date.now().toString(),
      name: contactName,
      meetDate: 'Aujourd\'hui',
      status: 'pending',
      interests: ['Tech', 'Sport', 'Musique']
    };
    setContacts([newContact, ...contacts]);
    
    // Ajouter une notification de rappel simulée
    setTimeout(() => {
      setNotifications([
        {
          id: Date.now().toString(),
          type: 'reminder',
          contactName: contactName,
          message: 'Ça fait une semaine que vous vous êtes rencontrés. Voulez-vous le revoir ?',
          date: 'À l\'instant'
        },
        ...notifications
      ]);
    }, 1000);
    
    setCurrentScreen('home');
  };

  // Handler pour répondre à une notification
  const handleNotificationRespond = (notifId: string, response: 'yes' | 'no') => {
    setNotifications(notifications.map(n => 
      n.id === notifId ? { ...n, responded: true } : n
    ));

    if (response === 'yes') {
      const notif = notifications.find(n => n.id === notifId);
      if (notif) {
        // Créer une notification de match
        setNotifications([
          {
            id: Date.now().toString(),
            type: 'match',
            contactName: notif.contactName,
            message: `${notif.contactName} a aussi envie de vous revoir ! C'est un match 🎉`,
            date: 'À l\'instant'
          },
          ...notifications
        ]);

        // Mettre à jour le statut du contact
        setContacts(contacts.map(c => 
          c.name === notif.contactName ? { ...c, status: 'matched' } : c
        ));

        // Passer à l'écran de planification
        setCurrentContact(notif.contactName);
        setTimeout(() => {
          setCurrentScreen('scheduling');
        }, 2000);
      }
    }
  };

  // Handler pour sélectionner un créneau
  const handleSlotSelect = (slotId: string) => {
    setSelectedSlot('Lundi 20 Jan, 18:00 - 20:00');
    setCurrentScreen('activity');
  };

  // Handler pour confirmer une activité
  const handleActivityConfirm = (activityId: string) => {
    const activities = [
      { name: 'Café & Discussion', location: 'Café des Arts, Paris 11ème' },
      { name: 'Session de sport', location: 'Parc des Buttes-Chaumont' },
      { name: 'Concert Jazz', location: 'Le Sunset, Paris 1er' },
      { name: 'Visio-café', location: 'En ligne' }
    ];
    const activity = activities[parseInt(activityId) - 1];
    
    setSelectedActivity({
      name: activity.name,
      date: selectedSlot,
      location: activity.location
    });

    // Mettre à jour le statut du contact
    setContacts(contacts.map(c => 
      c.name === currentContact ? { ...c, status: 'scheduled' } : c
    ));

    setCurrentScreen('confirmation');
  };

  // Handler pour finir le flow
  const handleFinish = () => {
    setCurrentScreen('home');
    setCurrentContact('');
    setSelectedSlot('');
    setSelectedActivity(null);
  };

  // Navigation
  const handleNavigate = (view: string) => {
    switch (view) {
      case 'home':
        setCurrentScreen('home');
        break;
      case 'scan':
        setCurrentScreen('scan');
        break;
      case 'notifications':
        setCurrentScreen('notifications');
        break;
      case 'profile':
        setCurrentScreen('profile');
        break;
    }
  };

  // Render des écrans
  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      
      case 'profile-setup':
        return <ProfileSetup onComplete={handleProfileComplete} />;
      
      case 'home':
        return (
          <>
            <HomeScreen 
              contacts={contacts}
              onScan={() => setCurrentScreen('scan')}
            />
            <BottomNav currentView="home" onNavigate={handleNavigate} />
          </>
        );
      
      case 'scan':
        return (
          <>
            <NFCScan onScanComplete={handleScanComplete} />
            <BottomNav currentView="scan" onNavigate={handleNavigate} />
          </>
        );
      
      case 'notifications':
        return (
          <>
            <NotificationsScreen 
              notifications={notifications}
              onRespond={handleNotificationRespond}
            />
            <BottomNav currentView="notifications" onNavigate={handleNavigate} />
          </>
        );
      
      case 'profile':
        return (
          <>
            <ProfileScreen 
              profile={userProfile!}
              onEdit={() => setCurrentScreen('profile-setup')}
            />
            <BottomNav currentView="profile" onNavigate={handleNavigate} />
          </>
        );
      
      case 'scheduling':
        return (
          <SchedulingScreen
            contactName={currentContact}
            onSelectSlot={handleSlotSelect}
            onCancel={() => setCurrentScreen('home')}
          />
        );
      
      case 'activity':
        return (
          <ActivityProposal
            contactName={currentContact}
            selectedSlot={selectedSlot}
            onConfirm={handleActivityConfirm}
            onReject={() => setCurrentScreen('scheduling')}
          />
        );
      
      case 'confirmation':
        return (
          <ConfirmationScreen
            contactName={currentContact}
            activity={selectedActivity?.name || ''}
            date={selectedActivity?.date || ''}
            location={selectedActivity?.location || ''}
            onFinish={handleFinish}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto relative">
        {renderScreen()}
      </div>
    </div>
  );
}
