import { User, Settings, LogOut, Edit } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import type { UserProfile } from './ProfileSetup';

interface ProfileScreenProps {
  profile: UserProfile;
  onEdit: () => void;
}

export function ProfileScreen({ profile, onEdit }: ProfileScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] text-white px-6 py-8 rounded-b-3xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-3xl">
            {profile.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-white/90">Mon profil</p>
          </div>
        </div>
        <Button
          onClick={onEdit}
          className="w-full bg-white/20 hover:bg-white/30 text-white border-0 rounded-full"
        >
          <Edit className="w-4 h-4 mr-2" />
          Modifier mon profil
        </Button>
      </div>

      {/* Profile Info */}
      <div className="px-6 py-6 space-y-4">
        {/* Interests */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">Centres d'intérêt</h3>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="px-4 py-2 bg-orange-50 text-[#FF6B35] rounded-full text-sm font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        {profile.phone && (
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Téléphone</h3>
            <p className="text-gray-600">{profile.phone}</p>
          </div>
        )}

        {profile.address && (
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Localisation</h3>
            <p className="text-gray-600">{profile.address}</p>
          </div>
        )}

        {/* Social */}
        {(profile.instagram || profile.linkedin) && (
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Réseaux sociaux</h3>
            <div className="space-y-2">
              {profile.instagram && (
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="font-medium">Instagram:</span>
                  <span>{profile.instagram}</span>
                </div>
              )}
              {profile.linkedin && (
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="font-medium">LinkedIn:</span>
                  <span className="text-sm">{profile.linkedin}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <button className="w-full flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Paramètres</span>
            </div>
          </button>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <button className="w-full flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-red-500" />
              <span className="font-medium text-red-500">Déconnexion</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
