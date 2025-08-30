import '@/app/globals.css';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

export const metadata: Metadata = {
    metadataBase: new URL('https://dionfirmansyah.vercel.app'),
    title: 'Dion ─── Portfolio',
    description:
        'Portfolio resmi Dion Firmansyah: Fullstack Developer & UI Engineer yang berfokus pada React, Next.js, Laravel, dan desain antarmuka modern. Temukan proyek, pengalaman, serta karya terbaru.',
    keywords: [
        'Dion',
        'Dion Firmansyah',
        'Portfolio',
        'Portfolio Estetik',
        'Portfolio Neo Swiss Design',
        'Fullstack Developer',
        'Frontend Developer',
        'UI Engineer',
        'React',
        'Next.js',
        'Laravel',
        'Tailwind CSS',
        'Figma',
        'Web Developer Indonesia',
    ],
    authors: [{ name: 'Dion Firmansyah' }],
    creator: 'Dion Firmansyah',
    publisher: 'Dion Firmansyah',
    openGraph: {
        title: 'Dion ─── Portfolio',
        description: 'Jelajahi portfolio Dion: membangun aplikasi modern dengan Next.js, React, dan Laravel.',
        url: 'https://dionfirmansyah.vercel.app',
        siteName: 'Dion Portfolio',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Dion Portfolio Preview',
            },
        ],
        locale: 'id_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Dion ─── Portfolio',
        description: 'Portfolio resmi Dion, berisi proyek dan pengalaman sebagai developer.',
        images: ['/og-image.png'],
    },
    icons: {
        icon: [
            { url: '/icon1.png', sizes: '96x96', type: 'image/png' },
            { url: '/icon0.svg', type: 'image/svg+xml' },
            { url: '/dion-favicon.ico' },
        ],
        apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning={true}>
            <body suppressHydrationWarning={true}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    {children}
                    <Toaster richColors position="top-center" />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
