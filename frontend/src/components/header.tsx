'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const navigation = [
    { name: t('home'), href: `/${locale}#home` },
    { name: t('about'), href: `/${locale}#about` },
    { name: t('projects'), href: `/${locale}#projects` },
    { name: t('skills'), href: `/${locale}#skills` },
    { name: t('keywordOptimizer'), href: `/${locale}#keyword-optimizer` },
    { name: t('contact'), href: `/${locale}#contact` },
  ];

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    // Use Next.js router for smooth navigation without page reload
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href={`/${locale}`} className="text-xl font-bold text-primary">
            Miguel F. Gargurevich
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            
            <div className="flex items-center gap-2 ml-4">
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Language Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLocale}
                className="flex items-center gap-2"
              >
                <Globe className="h-4 w-4" />
                {locale.toUpperCase()}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLocale}
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              {locale.toUpperCase()}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
