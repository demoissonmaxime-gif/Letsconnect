import { useState } from 'react';
import { ArrowRight, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);

  const slides = [
    {
      icon: <Users className="w-20 h-20 text-[#FF6B35]" />,
      title: "Bienvenue sur Let's Connect",
      description: "Transformez vos rencontres en amitiés durables"
    },
    {
      icon: <div className="w-20 h-20 rounded-full bg-[#FF6B35] flex items-center justify-center text-white text-3xl">📱</div>,
      title: "Scannez pour connecter",
      description: "Utilisez le NFC pour échanger vos contacts instantanément"
    },
    {
      icon: <div className="w-20 h-20 rounded-full bg-[#FF6B35] flex items-center justify-center text-white text-3xl">🤝</div>,
      title: "Consolidez vos relations",
      description: "Recevez des rappels et organisez facilement vos rendez-vous"
    }
  ];

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-8">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center text-center"
        >
          <div className="mb-8">
            {slides[step].icon}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {slides[step].title}
          </h1>
          <p className="text-lg text-gray-600">
            {slides[step].description}
          </p>
        </motion.div>
      </div>

      <div className="w-full max-w-md">
        <div className="flex gap-2 justify-center mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === step ? 'w-8 bg-[#FF6B35]' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white h-14 text-lg rounded-full"
        >
          {step < slides.length - 1 ? 'Suivant' : 'Commencer'}
          <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
