'use client'

import { MessageCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function WhatsAppFloat() {
  const t = useTranslations('whatsapp')
  
  const phoneNumber = '51966918363' // Código de país Perú (51) + número
  const message = encodeURIComponent('¡Hola Miguel! Me interesa conocer más sobre tus servicios de arquitectura cloud y desarrollo.')
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  const handleClick = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-600 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-500/30"
      aria-label={t('aria')}
      title={t('tooltip')}
    >
      <MessageCircle className="h-6 w-6" />
      
      {/* Animación de pulso para llamar la atención */}
      <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
    </button>
  )
}
