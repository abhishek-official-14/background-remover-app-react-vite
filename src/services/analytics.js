// import { useEffect } from 'react'
// import { useLocation } from 'react-router-dom'

// class AnalyticsService {
//   constructor() {
//     this.gaId = import.meta.env.VITE_GA_ID
//     this.enabled = !!this.gaId
//   }

//   init() {
//     if (!this.enabled) return
    
//     const script = document.createElement('script')
//     script.async = true
//     script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`
//     document.head.appendChild(script)
    
//     window.dataLayer = window.dataLayer || []
//     window.gtag = function() {
//       window.dataLayer.push(arguments)
//     }
//     window.gtag('js', new Date())
//     window.gtag('config', this.gaId)
//   }

//   trackPageView(path) {
//     if (!this.enabled) return
//     window.gtag?.('event', 'page_view', {
//       page_path: path,
//       page_title: document.title
//     })
//   }

//   trackEvent(category, action, label, value) {
//     if (!this.enabled) return
//     window.gtag?.('event', action, {
//       event_category: category,
//       event_label: label,
//       value: value
//     })
//   }

//   trackConversion(eventId, value) {
//     if (!this.enabled) return
//     window.gtag?.('event', 'conversion', {
//       send_to: eventId,
//       value: value
//     })
//   }

//   trackProcessingTime(duration, imageSize) {
//     this.trackEvent('Performance', 'processing_time', `${imageSize}px`, duration)
//   }

//   trackFeatureUsage(featureName) {
//     this.trackEvent('Features', 'used', featureName)
//   }

//   trackError(errorType, errorMessage) {
//     this.trackEvent('Errors', errorType, errorMessage)
//   }
// }

// export const analytics = new AnalyticsService()

// export const useAnalytics = () => {
//   const location = useLocation()
  
//   useEffect(() => {
//     analytics.init()
//   }, [])
  
//   useEffect(() => {
//     analytics.trackPageView(location.pathname)
//   }, [location])
  
//   return analytics
// }





export const analyticsConfig = {
  enabled: false,
};

export const trackPageView = () => {
  if (!analyticsConfig.enabled) return;

  console.log("Tracking page view");
};

export const trackEvent = (
  eventName,
  data = {}
) => {
  if (!analyticsConfig.enabled) return;

  console.log("Event:", eventName, data);
};

export const useAnalytics = () => {
  return {
    trackPageView,
    trackEvent,
  };
};

