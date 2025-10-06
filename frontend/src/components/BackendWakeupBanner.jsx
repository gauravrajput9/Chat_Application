import React, { useState, useEffect } from 'react';
import { Coffee, RefreshCw } from 'lucide-react';

const BackendWakeupBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isWakingUp, setIsWakingUp] = useState(false);

  useEffect(() => {
    // Listen for backend wake-up scenarios
    const handleBackendSleeping = () => {
      setShowBanner(true);
      setIsWakingUp(true);
      
      // Hide banner after 30 seconds (typical wake-up time)
      setTimeout(() => {
        setShowBanner(false);
        setIsWakingUp(false);
      }, 30000);
    };

    // Listen for auth check failures that might indicate sleeping backend
    const originalError = console.error;
    console.error = (...args) => {
      const message = args.join(' ');
      if (message.includes('502') || message.includes('sleeping') || message.includes('Bad Gateway')) {
        handleBackendSleeping();
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  if (!showBanner) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 z-50 shadow-lg">
      <div className="flex items-center justify-center gap-3 max-w-4xl mx-auto">
        {isWakingUp ? (
          <>
            <RefreshCw className="w-5 h-5 animate-spin" />
            <div className="text-center">
              <p className="font-medium">Waking up the backend service...</p>
              <p className="text-sm opacity-90">This may take 30-60 seconds on free hosting. Please wait.</p>
            </div>
          </>
        ) : (
          <>
            <Coffee className="w-5 h-5" />
            <div className="text-center">
              <p className="font-medium">Backend service is ready!</p>
              <p className="text-sm opacity-90">You can now use the chat application.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BackendWakeupBanner;