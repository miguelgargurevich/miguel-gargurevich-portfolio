import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProfessionalChat from '@/components/professional-chat';

const locales = ['en', 'es'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'professionalChat' });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://miguelgargurevich.com';
  const url = `${baseUrl}/${locale}/chat`;

  return {
    title: `${t('title')} - Miguel Fernandez Gargurevich`,
    description: t('subtitle'),
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/en/chat`,
        es: `${baseUrl}/es/chat`,
      },
    },
    openGraph: {
      title: `${t('title')} - Miguel Fernandez Gargurevich`,
      description: t('subtitle'),
      url: url,
      siteName: 'Miguel Fernandez Gargurevich Portfolio',
      locale: locale,
      type: 'website',
    },
  };
}

export default async function ChatPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <main className="min-h-screen bg-background">
        <ProfessionalChat />
      </main>
    </NextIntlClientProvider>
  );
}
