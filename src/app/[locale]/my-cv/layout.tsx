import '@/app/globals.css';
import { routing } from '@/i18n/routing';
import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
    title: 'Dion ─── CV',
    description: 'Curriculum Vitae of Dion Firmansyah - showcasing professional background, skills, and experiences.',
    keywords: ['Dion Firmansyah', 'CV', 'Curriculum Vitae', 'Resume', 'Web Developer', 'Software Engineer'],
    authors: [{ name: 'Dion Firmansyah' }],
    openGraph: {
        title: 'Dion ─── CV',
        description: 'Professional CV of Dion Firmansyah - Explore my experience, skills, and career journey.',
        url: 'https://dionfirmansyah.vercel.app/my-cv',
        siteName: 'Dion Portfolio',
        type: 'profile',
        images: [
            {
                url: 'https://dionfirmansyah.vercel.app/cv/og-image.png?v=2',
                width: 1200,
                height: 630,
                alt: "Preview of Dion Firmansyah's CV",
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Dion ─── CV',
        description: 'Explore the professional CV of Dion Firmansyah.',
        images: ['https://dionfirmansyah.vercel.app/cv/og-image.png?v=2'],
    },
    metadataBase: new URL('https://dionfirmansyah.vercel.app'),
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 2.0,
    userScalable: true,
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function CvLayout({
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
