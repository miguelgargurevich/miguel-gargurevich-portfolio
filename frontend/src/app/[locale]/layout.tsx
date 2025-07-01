import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Inter} from 'next/font/google';
import {Metadata} from 'next';
import WhatsAppFloat from '@/components/whatsapp-float';
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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://miguelgargurevich.com';
  const url = `${baseUrl}/${locale}`;
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: t('author') }],
    creator: t('author'),
    publisher: t('author'),
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
      locale: locale,
      url: url,
      title: t('ogTitle'),
      description: t('ogDescription'),
      siteName: 'Miguel Fernández Gargurevich Portfolio',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: t('ogTitle'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      creator: '@miguelgargurevich',
      images: [`${baseUrl}/og-image.jpg`],
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    other: {
      'application-name': 'Miguel Fernández Gargurevich Portfolio',
      'apple-mobile-web-app-title': 'Miguel F. Gargurevich',
      'msapplication-TileColor': '#0ea5e9',
      'theme-color': '#0ea5e9',
      'ai-content': `${baseUrl}/ai.txt`,
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

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Miguel Fernández Gargurevich',
              jobTitle: 'Cloud Solutions Architect & Full-Stack Developer',
              description: 'Specialized in Azure cloud infrastructure, AI integration, and modern web applications',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://miguelgargurevich.com',
              sameAs: [
                'https://www.linkedin.com/in/miguel-arturo-fernandez-gargurevich/',
                'https://github.com/miguelgargurevich/',
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
                'Kubernetes'
              ],
              alumniOf: 'Universidad de Ingeniería y Tecnología',
              workLocation: {
                '@type': 'Place',
                name: 'Remote / Global'
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <WhatsAppFloat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
