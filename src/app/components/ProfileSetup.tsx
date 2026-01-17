import { useState } from 'react';
import { ArrowLeft, Instagram, Linkedin, MapPin, Phone, Save } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

interface ProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
  onBack?: () => void;
}

export interface UserProfile {
  name: string;
  phone: string;
  address: string;
  instagram: string;
  linkedin: string;
  interests: string[];
}

const interestOptions = [
  'Sport', 'Musique', 'Art', 'Cuisine', 'Voyage', 'Tech',
  'Lecture', 'Cinéma', 'Gaming', 'Nature', 'Photo', 'Mode'
];

export function ProfileSetup({ onComplete, onBack }: ProfileSetupProps) {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    phone: '',
    address: '',
    instagram: '',
    linkedin: '',
    interests: []
  });

  const toggleInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = () => {
    if (profile.name && profile.interests.length > 0) {
      onComplete(profile);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center">
          {onBack && (
            <button onClick={onBack} className="mr-4">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
          )}
          <h1 className="text-xl font-semibold">Créer mon profil</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        <div className="bg-white rounded-2xl p-6 space-y-4">
          <div>
            <Label htmlFor="name">Nom complet *</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Votre nom"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Téléphone
            </Label>
            <Input
              id="phone"
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              placeholder="+33 6 12 34 56 78"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Adresse
            </Label>
            <Input
              id="address"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              placeholder="Paris, France"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="instagram" className="flex items-center gap-2">
              <Instagram className="w-4 h-4" />
              Instagram
            </Label>
            <Input
              id="instagram"
              value={profile.instagram}
              onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
              placeholder="@username"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="linkedin" className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </Label>
            <Input
              id="linkedin"
              value={profile.linkedin}
              onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
              placeholder="linkedin.com/in/username"
              className="mt-2"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6">
          <Label className="mb-4 block">Mes centres d'intérêt *</Label>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-full border-2 transition-all ${
                  profile.interests.includes(interest)
                    ? 'bg-[#FF6B35] border-[#FF6B35] text-white'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-[#FF6B35]'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!profile.name || profile.interests.length === 0}
          className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white h-14 text-lg rounded-full"
        >
          <Save className="mr-2" />
          Enregistrer mon profil
        </Button>
      </div>
    </div>
  );
}
