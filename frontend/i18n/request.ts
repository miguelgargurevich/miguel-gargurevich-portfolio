import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

const locales = ['en', 'es'];

export default getRequestConfig(async ({requestLocale}) => {
  // Await the locale from the request
  const locale = await requestLocale;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../src/messages/${locale}.json`)).default
  };
});
