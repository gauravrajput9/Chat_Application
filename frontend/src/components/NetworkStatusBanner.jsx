import React from 'react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { Wifi, WifiOff } from 'lucide-react';

const NetworkStatusBanner = () => {
  const { isOnline, connectionType, isSlowConnection } = useNetworkStatus();

  if (isOnline && !isSlowConnection) return null;

  return (
    <div className={`network-error-banner ${!isOnline ? 'bg-red-500' : 'bg-yellow-500'}`}>
      <div className="flex items-center justify-center gap-2">
        {!isOnline ? (
          <>
            <WifiOff className="w-4 h-4" />
            <span>No internet connection</span>
          </>
        ) : (
          <>
            <Wifi className="w-4 h-4" />
            <span>Slow connection ({connectionType})</span>
          </>
        )}
      </div>
    </div>
  );
};

export default NetworkStatusBanner;