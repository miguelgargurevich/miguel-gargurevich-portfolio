'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ArrowDown, Mail, Github, Linkedin } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('hero');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Greeting */}
          <p className="text-lg text-muted-foreground mb-4 animate-fade-in">
            {t('greeting')}
          </p>
          
          {/* Name */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {t('name')}
            </span>
          </h1>
          
          {/* Title */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-6 animate-fade-in-up animation-delay-200">
            {t('title')}
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
            {t('subtitle')}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up animation-delay-600">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('projects')}
              className="w-full sm:w-auto"
            >
              {t('cta')}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto"
            >
              <Mail className="w-4 h-4 mr-2" />
              {t('contact')}
            </Button>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-12 animate-fade-in-up animation-delay-800">
            <a
              href="https://github.com/miguelgargurevich/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/miguel-arturo-fernandez-gargurevich/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:miguel@gargurevich.com"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => scrollToSection('about')}
          className="p-2"
        >
          <ArrowDown className="w-6 h-6" />
        </Button>
      </div>
    </section>
  );
}
