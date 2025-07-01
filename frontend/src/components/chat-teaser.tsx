'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Bot, Calculator, ArrowRight, Sparkles } from 'lucide-react';

export default function ChatTeaser() {
  const t = useTranslations('chatTeaser');
  const params = useParams();
  const locale = params.locale as string;

  const features = [
    {
      icon: <MessageCircle className="w-5 h-5 text-primary" />,
      title: t('feature1Title'),
      description: t('feature1Description')
    },
    {
      icon: <Calculator className="w-5 h-5 text-primary" />,
      title: t('feature2Title'),
      description: t('feature2Description')
    },
    {
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      title: t('feature3Title'),
      description: t('feature3Description')
    }
  ];

  return (
    <section id="ai-assistant" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Bot className="w-8 h-8 text-primary" />
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                {t('title')}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Card */}
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5" />
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-6 h-6 text-primary" />
                  {t('ctaTitle')}
                </CardTitle>
                <CardDescription>
                  {t('ctaDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-background/80 rounded-lg border">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-xs text-muted-foreground">{t('availability')}</div>
                  </div>
                  <div className="p-3 bg-background/80 rounded-lg border">
                    <div className="text-2xl font-bold text-primary">AI</div>
                    <div className="text-xs text-muted-foreground">{t('powered')}</div>
                  </div>
                </div>
                
                <Link href={`/${locale}/chat`}>
                  <Button className="w-full" size="lg">
                    {t('startChat')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                
                <p className="text-xs text-center text-muted-foreground">
                  {t('freeToUse')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
