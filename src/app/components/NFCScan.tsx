import { useState, useEffect } from 'react';
import { Smartphone, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';

interface NFCScanProps {
  onScanComplete: (contactName: string) => void;
}

export function NFCScan({ onScanComplete }: NFCScanProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  useEffect(() => {
    if (isScanning) {
      // Simulation du scan NFC
      const timer = setTimeout(() => {
        setScanComplete(true);
        setTimeout(() => {
          onScanComplete('Romain Dubois');
        }, 1000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isScanning, onScanComplete]);

  const startScan = () => {
    setIsScanning(true);
    setScanComplete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <motion.div
          animate={isScanning && !scanComplete ? {
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          } : {}}
          transition={{
            duration: 2,
            repeat: isScanning && !scanComplete ? Infinity : 0
          }}
          className="mb-8 flex justify-center"
        >
          {scanComplete ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <CheckCircle className="w-32 h-32 text-green-500" />
            </motion.div>
          ) : (
            <div className="relative">
              <Smartphone className="w-32 h-32 text-[#FF6B35]" />
              {isScanning && (
                <motion.div
                  className="absolute inset-0 border-4 border-[#FF6B35] rounded-3xl"
                  animate={{ scale: [1, 1.3, 1.3], opacity: [1, 0, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </div>
          )}
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {scanComplete ? 'Contact ajouté !' : isScanning ? 'Scan en cours...' : 'Scanner un contact'}
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          {scanComplete
            ? 'Vous avez ajouté Romain à vos contacts'
            : isScanning
            ? 'Approchez les deux téléphones'
            : 'Approchez votre téléphone de celui de votre nouveau contact'}
        </p>

        {!isScanning && !scanComplete && (
          <Button
            onClick={startScan}
            className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white h-14 text-lg rounded-full"
          >
            Activer le NFC
          </Button>
        )}

        {isScanning && !scanComplete && (
          <div className="flex items-center justify-center gap-2 text-[#FF6B35]">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-lg">Recherche en cours...</span>
          </div>
        )}
      </div>
    </div>
  );
}
