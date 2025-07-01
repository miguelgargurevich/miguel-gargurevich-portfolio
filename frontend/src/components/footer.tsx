'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Miguel Fernandez Gargurevich
              </h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                {t('description')}
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/miguelgargurevich/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/miguel-arturo-fernandez-gargurevich/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:miguel@gargurevich.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('email')}
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">{t('quickLinks')}</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                    {tNav('about')}
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
                    {tNav('projects')}
                  </a>
                </li>
                <li>
                  <a href="#skills" className="text-muted-foreground hover:text-primary transition-colors">
                    {tNav('skills')}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                    {tNav('contact')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">{t('technologies')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Microsoft Azure</li>
                <li>React / Next.js</li>
                <li>TypeScript</li>
                <li>Node.js</li>
                <li>Python</li>
                <li>Docker / Kubernetes</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Miguel Fernandez Gargurevich. {t('rights')}
            </p>
            <p className="text-muted-foreground text-sm mt-2 md:mt-0">
              {t('builtWith')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
