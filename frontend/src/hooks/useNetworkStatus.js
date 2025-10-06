import { useState, useEffect } from 'react';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState('unknown');

  useEffect(() => {
    const handleOnline = () => {
      console.log('🌐 Network: Connected');
      setIsOnline(true);
    };

    const handleOffline = () => {
      console.log('📴 Network: Disconnected');
      setIsOnline(false);
    };

    // Get connection type if available (mobile specific)
    const getConnectionType = () => {
      if ('connection' in navigator) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
          setConnectionType(connection.effectiveType || connection.type || 'unknown');
          console.log('📶 Connection type:', connection.effectiveType || connection.type);
        }
      }
    };

    // Initial setup
    getConnectionType();

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Listen for connection changes (mobile specific)
    if ('connection' in navigator) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection) {
        connection.addEventListener('change', () => {
          getConnectionType();
          console.log('📶 Connection changed:', connection.effectiveType || connection.type);
        });
      }
    }

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    isOnline,
    connectionType,
    isSlowConnection: connectionType === '2g' || connectionType === 'slow-2g'
  };
};