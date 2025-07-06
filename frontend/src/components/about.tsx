'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Briefcase } from 'lucide-react';

// Importa el componente Image de Next.js si está disponible
import Image from 'next/image';

export default function About() {
  const t = useTranslations('about');

  const stats = [
    {
      icon: Briefcase,
      number: t('experience'),
      label: t('experienceLabel'),
    },
    {
      icon: Users,
      number: t('projects'),
      label: t('projectsLabel'),
    },
    {
      icon: Award,
      number: t('certifications'),
      label: t('certificationsLabel'),
    },
  ];

  return (
    <section id="about" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            {/* Foto de perfil */}
            <div className="flex justify-center mb-6">
              <Image
                src="/profile.png"
                alt="Foto de perfil de Miguel Gargurevich"
                width={128}
                height={128}
                className="rounded-full border-4 border-primary shadow-lg object-cover"
                priority
              />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('description')}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">
                      {stat.number}
                    </div>
                    <div className="text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Background Experience */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {t('roleTitle')}
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {t('roleDescription1')}
                </p>
                <p>
                  {t('roleDescription2')}
                </p>
                <p>
                  {t('roleDescription3')}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-background border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">{t('skillCategories.cloudPlatforms')}</h4>
                  <p className="text-sm text-muted-foreground">{t('skillCategories.cloudPlatformsDesc')}</p>
                </div>
                <div className="bg-background border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">{t('skillCategories.devops')}</h4>
                  <p className="text-sm text-muted-foreground">{t('skillCategories.devopsDesc')}</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-background border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">{t('skillCategories.development')}</h4>
                  <p className="text-sm text-muted-foreground">{t('skillCategories.developmentDesc')}</p>
                </div>
                <div className="bg-background border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">{t('skillCategories.aiml')}</h4>
                  <p className="text-sm text-muted-foreground">{t('skillCategories.aimlDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
