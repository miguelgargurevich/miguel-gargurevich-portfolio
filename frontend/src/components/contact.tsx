'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { CONTACT_CONFIG } from '@/config/contact';

export default function Contact() {
  const t = useTranslations('contact');
  const whatsappT = useTranslations('whatsapp');

  const handleWhatsAppClick = () => {
    const message = whatsappT('defaultMessage');
    const whatsappUrl = CONTACT_CONFIG.whatsapp.getUrl(message);
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:miguel@gargurevich.com';
  };

  return (
    <section id="contact" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Email Card */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleEmailClick}>
              <CardContent className="p-6 text-center">
                <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{t('contactInfo.email')}</h3>
                <p className="text-muted-foreground">miguel@gargurevich.com</p>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{t('contactInfo.location')}</h3>
                <p className="text-muted-foreground">{t('details.locationValue')}</p>
              </CardContent>
            </Card>

            {/* Availability Card */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{t('contactInfo.availability')}</h3>
                <p className="text-muted-foreground">{t('details.availabilityValue')}</p>
              </CardContent>
            </Card>
          </div>

          {/* WhatsApp CTA */}
          <div className="text-center">
            <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
              <CardContent className="p-8">
                <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full w-fit mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  WhatsApp
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  {t('whatsappNote')}
                </p>
                <Button 
                  onClick={handleWhatsAppClick}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t('startWhatsAppChat')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
