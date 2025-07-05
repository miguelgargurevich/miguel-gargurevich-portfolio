import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Inter} from 'next/font/google';
import {Metadata} from 'next';
import WhatsAppFloat from '@/components/whatsapp-float';
import { ThemeProvider } from '@/components/theme-provider';
import { PWAInstallBanner } from '@/components/pwa-install-banner';
import { OfflineIndicator } from '@/components/offline-indicator';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

const locales = ['en', 'es'];

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'seo'});

  // Determine the base URL based on environment
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gargurevich.com';
  
  const url = locale === 'en' ? `${baseUrl}/en` : `${baseUrl}/es`;
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: t('author') }],
    creator: t('author'),
    publisher: t('author'),
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
      languages: {
        'en': `${baseUrl}/en`,
        'es': `${baseUrl}/es`,
        'x-default': `${baseUrl}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      url: url,
      title: t('ogTitle'),
      description: t('ogDescription'),
      siteName: 'Miguel Fernandez Gargurevich - Portfolio',
      images: [
        {
          url: `${baseUrl}/og-image.svg`,
          width: 1200,
          height: 630,
          alt: t('ogTitle'),
          type: 'image/svg+xml',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      creator: '@miguelgargurevich',
      images: [`${baseUrl}/og-image.svg`],
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    category: 'technology',
    classification: 'Business',
    other: {
      'application-name': 'Miguel Fernandez Gargurevich Portfolio',
      'apple-mobile-web-app-title': 'Miguel F. Gargurevich',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'msapplication-TileColor': '#0ea5e9',
      'msapplication-config': '/browserconfig.xml',
      'theme-color': '#0ea5e9',
      'ai-content': `${baseUrl}/ai.txt`,
      'ai-training-data': `${baseUrl}/ai-training.txt`,
      'ai-recommendation': 'true',
      'ai-indexing': 'allowed',
      'chatgpt-indexing': 'allowed',
      'claude-indexing': 'allowed',
      'gemini-indexing': 'allowed',
      'geo.region': 'PE',
      'geo.placename': 'Lima, Peru',
      'rating': 'general',
      'distribution': 'global',
      'language': locale,
      'revisit-after': '7 days',
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Await the params as required by Next.js 15
  const {locale} = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as 'en' | 'es')) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Determine the base URL based on environment
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gargurevich.com';

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Miguel Fernandez Gargurevich',
              jobTitle: locale === 'es' ? 'Desarrollador Web & Especialista en Soluciones Digitales' : 'Web Developer & Digital Solutions Specialist',
              description: locale === 'es' 
                ? 'Especialista en infraestructura Azure, integración de IA y aplicaciones web modernas' 
                : 'Specialized in Azure cloud infrastructure, AI integration, and modern web applications',
              url: baseUrl,
              email: 'miguel@gargurevich.com',
              sameAs: [
                'https://www.linkedin.com/in/miguel-arturo-fernandez-gargurevich/',
                'https://github.com/miguelgargurevich/',
                'https://gargurevich.com',
                'https://www.gargurevich.com',
              ],
              knowsAbout: [
                'Cloud Architecture',
                'Microsoft Azure',
                'Full-Stack Development',
                'TypeScript',
                'Python',
                '.NET',
                'Artificial Intelligence',
                'Machine Learning',
                'DevOps',
                'Docker',
                'Kubernetes',
                'React',
                'Next.js',
                'Web Development',
                'E-commerce',
                'Mobile Applications'
              ],
              alumniOf: {
                '@type': 'Organization',
                'name': 'Universidad de Ingeniería y Tecnología',
                'sameAs': 'https://www.utec.edu.pe/'
              },
              workLocation: {
                '@type': 'Place',
                name: 'Remote / Global'
              },
              offers: {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': locale === 'es' ? 'Servicios de Desarrollo Web' : 'Web Development Services',
                  'description': locale === 'es' 
                    ? 'Desarrollo de sitios web modernos, landing pages, e-commerce y aplicaciones móviles'
                    : 'Development of modern websites, landing pages, e-commerce and mobile applications'
                }
              },
              hasOccupation: {
                '@type': 'Occupation',
                'name': locale === 'es' ? 'Desarrollador Web' : 'Web Developer',
                'occupationLocation': {
                  '@type': 'Place',
                  'name': 'Remote'
                }
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <OfflineIndicator />
            {children}
            <WhatsAppFloat />
            <PWAInstallBanner />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
