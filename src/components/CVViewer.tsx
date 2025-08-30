'use client';

import { Download, ExternalLink, ScrollText, X } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import { Button } from './ui/button';

interface CVViewerProps {
    title?: string;
    showDownload?: boolean;
}

export default function CVViewer({ title = 'VIEW CV', showDownload = true }: CVViewerProps) {
    const locale = useLocale();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const cvFiles = {
        id: '/cv/CV_DION-FIRMANSYAH_ID.pdf',
        en: '/cv/CV_DION-FIRMANSYAH_EN.pdf',
    };

    const getCurrentCV = () => {
        return cvFiles[locale as keyof typeof cvFiles] || cvFiles.id;
    };

    const handleView = () => {
        setIsModalOpen(true);
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
            {/* Neo Swiss Trigger Button */}
            <Button
                variant="outline"
                className="group text-foreground w-full rounded-full border-black px-8 py-4 text-lg font-bold tracking-wide uppercase hover:bg-lime-300 hover:text-black md:w-auto md:border-2"
                onClick={handleView}
            >
                <ScrollText />
                <p className="capitalize">{title}</p>
            </Button>

            {/* Neo Swiss Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
                    <div className="flex h-full items-center justify-center p-4">
                        <div className="relative h-full w-full max-w-7xl overflow-hidden border-2 border-white bg-white">
                            {/* Minimal Header - Swiss Style */}
                            <div className="flex flex-col items-center justify-between gap-6 border-b-2 border-black bg-white p-6 md:flex-row">
                                {/* Left: Title */}
                                <div className="flex w-full items-center justify-between">
                                    <h1 className="font-mono text-2xl font-black tracking-[0.2em] text-black uppercase">
                                        CV
                                        <span className="font-mono text-sm font-medium tracking-wider text-gray-600 uppercase">
                                            DION FIRMANSYAH
                                        </span>
                                    </h1>
                                    <Button
                                        onClick={() => setIsModalOpen(false)}
                                        title="CLOSE"
                                        variant={'outline'}
                                        size={'icon'}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>

                                {/* Right: Actions */}
                                <div className="flex w-full items-center justify-end gap-1">
                                    {showDownload && (
                                        <Button variant={'limeOutline'} onClick={handleDownload}>
                                            {'DOWNLOAD'}
                                            <Download />
                                        </Button>
                                    )}

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant={'outline'}
                                            onClick={handleOpenInNewTab}
                                            className="group text-foreground border-black px-8 py-4 text-lg font-bold tracking-wide uppercase hover:bg-lime-300 hover:text-black md:w-auto md:border-2"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* PDF Viewer with Swiss Grid */}
                            <div className="relative h-[calc(100%-88px)]">
                                <iframe
                                    src={`${getCurrentCV()}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                                    className="h-full w-full border-0"
                                    title="CV PREVIEW"
                                    loading="lazy"
                                />

                                {/* Grid overlay for Swiss aesthetic */}
                            </div>

                            {/* Bottom accent line */}
                            <div className="absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r from-black via-gray-400 to-black" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
