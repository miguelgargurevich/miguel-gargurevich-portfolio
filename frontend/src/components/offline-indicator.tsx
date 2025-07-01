'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { WifiOff, Wifi } from 'lucide-react'

export function OfflineIndicator() {
  const t = useTranslations('pwa')
  const [isOnline, setIsOnline] = useState(true)
  const [showOfflineBanner, setShowOfflineBanner] = useState(false)

  useEffect(() => {
    const updateOnlineStatus = () => {
      const online = navigator.onLine
      setIsOnline(online)
      
      if (!online) {
        setShowOfflineBanner(true)
      } else if (showOfflineBanner) {
        // Show brief "back online" message
        setTimeout(() => setShowOfflineBanner(false), 3000)
      }
    }

    // Initial check
    updateOnlineStatus()

    // Listen for online/offline events
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [showOfflineBanner])

  if (!showOfflineBanner) return null

  return (
    <div className={`fixed top-16 left-4 right-4 md:left-auto md:right-4 md:w-80 rounded-lg p-3 z-50 animate-slide-down ${
      isOnline 
        ? 'bg-green-500 text-white' 
        : 'bg-orange-500 text-white'
    }`}>
      <div className="flex items-center gap-2">
        {isOnline ? (
          <Wifi className="w-4 h-4" />
        ) : (
          <WifiOff className="w-4 h-4" />
        )}
        <span className="text-sm font-medium">
          {isOnline ? t('backOnline') : t('offlineMode')}
        </span>
      </div>
      {!isOnline && (
        <p className="text-xs mt-1 opacity-90">
          {t('offlineDescription')}
        </p>
      )}
    </div>
  )
}
