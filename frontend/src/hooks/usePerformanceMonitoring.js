import { useEffect } from 'react';

// Performance monitoring hook for Core Web Vitals
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    // Function to send analytics data
    const sendAnalytics = (metric) => {
      // In production, send to your analytics service
      if (process.env.NODE_ENV === 'development') {
        console.log('Performance Metric:', metric);
      }
      
      // Example: Send to Google Analytics 4
      if (window.gtag) {
        window.gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          metric_id: metric.id,
          metric_value: metric.value,
          metric_delta: metric.delta,
        });
      }
    };

    // Measure Core Web Vitals
    const measureCoreWebVitals = async () => {
      try {
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
        
        // Cumulative Layout Shift
        getCLS(sendAnalytics);
        
        // First Input Delay
        getFID(sendAnalytics);
        
        // First Contentful Paint
        getFCP(sendAnalytics);
        
        // Largest Contentful Paint
        getLCP(sendAnalytics);
        
        // Time to First Byte
        getTTFB(sendAnalytics);
        
      } catch (error) {
        console.warn('Could not load web-vitals library:', error);
      }
    };

    // Custom performance metrics
    const measureCustomMetrics = () => {
      // Measure initial page load time
      if ('performance' in window && 'timing' in window.performance) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        
        sendAnalytics({
          name: 'page_load_time',
          value: loadTime,
          id: 'custom-page-load',
          delta: loadTime
        });
      }

      // Measure DOM content loaded time
      if ('performance' in window && 'getEntriesByType' in window.performance) {
        const navEntries = window.performance.getEntriesByType('navigation');
        if (navEntries.length > 0) {
          const navEntry = navEntries[0];
          const domContentLoaded = navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart;
          
          sendAnalytics({
            name: 'dom_content_loaded',
            value: domContentLoaded,
            id: 'custom-dcl',
            delta: domContentLoaded
          });
        }
      }
    };

    // Initialize performance monitoring
    measureCoreWebVitals();
    
    // Measure custom metrics after page load
    if (document.readyState === 'complete') {
      measureCustomMetrics();
    } else {
      window.addEventListener('load', measureCustomMetrics);
    }

    // Cleanup
    return () => {
      window.removeEventListener('load', measureCustomMetrics);
    };
  }, []);
};

// Hook for monitoring real-time chat performance
export const useChatPerformanceMonitoring = () => {
  const measureMessageDeliveryTime = (startTime) => {
    const deliveryTime = Date.now() - startTime;
    
    // Send to analytics
    if (window.gtag) {
      window.gtag('event', 'message_delivery_time', {
        value: deliveryTime,
        event_category: 'chat_performance',
        event_label: 'message_sent'
      });
    }
    
    return deliveryTime;
  };

  const measureConnectionTime = (startTime) => {
    const connectionTime = Date.now() - startTime;
    
    if (window.gtag) {
      window.gtag('event', 'socket_connection_time', {
        value: connectionTime,
        event_category: 'chat_performance',
        event_label: 'socket_connected'
      });
    }
    
    return connectionTime;
  };

  return {
    measureMessageDeliveryTime,
    measureConnectionTime
  };
};

export default usePerformanceMonitoring;