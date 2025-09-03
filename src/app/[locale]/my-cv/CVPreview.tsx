'use client';

import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

export default function CVPreview() {
    const locale = useLocale();

    const [isLoading, setIsLoading] = useState(true);

    // Path file PDF
    const cvFiles = {
        id: '/cv/CV_DION-FIRMANSYAH_ID.pdf',
        en: '/cv/CV_DION-FIRMANSYAH_EN.pdf',
    };

    // Path file image preview
    const cvImages = {
        id: '/cv/CV_DION-FIRMANSYAH_ID.jpg',
        en: '/cv/CV_DION-FIRMANSYAH_ID.jpg',
    };

    const getCurrentCV = () => {
        return cvFiles[locale as keyof typeof cvFiles] || cvFiles.id;
    };

    const getCurrentImage = () => {
        return cvImages[locale as keyof typeof cvImages] || cvImages.id;
    };

    const handleDownload = () => {
        const cvUrl = getCurrentCV();
        const link = document.createElement('a');
        link.href = cvUrl;
        link.download = `CV_DION-FIRMANSYAH_${locale.toUpperCase()}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleOpenInNewTab = () => {
        window.open(getCurrentCV(), '_blank');
    };

    return (
        <>
            {/* Actions */}
            <div className="flex w-full items-center justify-end gap-2 p-2">
                <Button size={'sm'} title="DOWNLOAD CV" variant={'limeOutline'} onClick={handleDownload}>
                    {'DOWNLOAD'}
                    <Download />
                </Button>

                <Button
                    size={'sm'}
                    title="VIEW NEW PAGE"
                    variant={'outline'}
                    onClick={handleOpenInNewTab}
                    className="group text-foreground border-black px-8 py-4 text-lg font-bold tracking-wide uppercase hover:bg-lime-300 hover:text-black md:w-auto md:border-2"
                >
                    <ExternalLink className="h-4 w-4" />
                </Button>
            </div>

            <div className="relative flex h-[calc(100%-88px)] w-full items-start justify-center overflow-y-auto bg-gray-50">
                {/* Skeleton shimmer */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white">
                        <div className="relative">
                            <div className="h-16 w-16 rounded-full border-2 border-gray-200"></div>
                            <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
                            <p className="mt-2 text-center text-sm font-medium text-gray-500">Loading...</p>
                        </div>
                    </div>
                )}

                <Image
                    src={getCurrentImage()}
                    alt="CV Preview"
                    width={1200}
                    height={1600}
                    className={`h-auto w-full border border-black object-contain transition-opacity duration-700 ${
                        isLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                    priority
                    onLoadingComplete={() => setIsLoading(false)}
                />
            </div>
        </>
    );
}
