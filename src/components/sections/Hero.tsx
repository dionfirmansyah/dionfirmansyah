'use client';

import RotatingText from '@/components/RotatingText';
import { Button } from '@/components/ui/button';
import { useResponsive } from '@/hooks/useResponsive';
import { ArrowDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import CVViewer from '../CVViewer';

export default function Hero() {
    const t = useTranslations('hero');
    const { isMobile } = useResponsive();

    return (
        <section id="home" className="bg-background relative flex min-h-screen items-center overflow-hidden">
            {/* Background grid */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage: `  linear-gradient(to right, rgba(0, 0, 0, 0.3) 1px, transparent 1px),
                                        linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 1px, transparent 1px)
                                      `,
                    backgroundSize: '40px 40px',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.3))',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0, 0, 0, 0))',
                }}
            />
            <div className="container mx-auto max-w-5xl px-6 md:px-12">
                <div className="flex w-full items-center">
                    <p className="text-sm font-medium tracking-wider text-gray-500">{t('tagline')}</p>
                    <div className="ml-2 h-px flex-1 bg-black"></div>◉
                </div>

                {/* Heading */}
                <h1
                    className={`leading-none font-black tracking-tight ${isMobile ? 'mb-6 text-4xl' : 'mb-8 text-7xl'}`}
                >
                    <span className="text-primary block tracking-[0.05em]">{t('title')}</span>
                    <span className="block font-extrabold">Dion Firmansyah</span>
                </h1>

                {/* Subtitle */}

                <div className="flex items-center">
                    <RotatingText
                        texts={[
                            'Full Stack Developer',
                            'Creative Developer',
                            'Website Enthusiast',
                            'Turning Ideas into Code',
                        ]}
                        mainClassName={`text-muted-foreground uppercase  max-w-3xl font-medium ${
                            isMobile ? 'mb-4 text-lg' : 'mb-6 text-2xl'
                        }`}
                        staggerFrom={'last'}
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-120%' }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                        rotationInterval={3000}
                    />
                </div>

                {/* CTA */}
                <div className="mt-6 flex flex-col space-y-3 md:flex-row md:items-center md:gap-4 md:space-y-0">
                    <Button
                        variant="limeOutline"
                        className="group text-foreground w-full px-8 py-4 text-lg font-bold tracking-wide uppercase md:w-auto"
                        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <p className="capitalize">{t('cta')}</p>
                        <ArrowDown className="animate-bounce-fast h-5 w-5 transform transition-transform duration-300 group-hover:translate-y-1" />
                    </Button>

                    <CVViewer title={t('viewCV')} />
                </div>
            </div>
        </section>
    );
}
