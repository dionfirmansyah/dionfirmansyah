import '@/app/globals.css';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
    description: 'Portfolio',
    title: 'dion ─── work',
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function WorkLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    // Await the params to get locale
    const { locale } = await params;

    // Get messages for the locale
    const messages = await getMessages();

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
}
