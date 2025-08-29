'use client';

import LangguageSwitcher from '@/components/common/LangguageSwitcher';
import { Button } from '@/components/ui/button';
import { useResponsive } from '@/hooks/useResponsive';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import BackToTopButton from '../common/BackToTopButton';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [headerVisible, setHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState('home');

    const t = useTranslations('navigation');
    const { isMobile } = useResponsive();

    const navItems = useMemo(
        () => [
            { key: 'home', href: '#home' },
            { key: 'about', href: '#about' },
            { key: 'projects', href: '#projects' },
            { key: 'contact', href: '#contact' },
        ],
        [],
    );

    // 🔹 Scroll detection for header & back-to-top
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 20);

            if (currentScrollY < lastScrollY || currentScrollY < 100) {
                setHeaderVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setHeaderVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // 🔹 IntersectionObserver untuk active section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                let visibleSection = activeSection;
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        visibleSection = entry.target.id;
                    }
                });
                if (visibleSection !== activeSection) {
                    setActiveSection(visibleSection);
                }
            },
            { threshold: 0.6 },
        );

        navItems.forEach((item) => {
            const el = document.querySelector(item.href);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [activeSection, navItems]);

    const handleNavClick = (href: string) => {
        setIsOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView();
            window.history.pushState(null, '', href);
        }
    };

    return (
        <>
            <header
                className={`fixed top-0 z-50 w-full p-0 transition-all duration-500 ease-in-out ${headerVisible ? 'translate-y-0' : '-translate-y-full'} ${
                    scrolled
                        ? 'bg-background/95 border-b border-black shadow-lg backdrop-blur-xl md:border-2'
                        : 'bg-background/80 border-b border-black backdrop-blur-md md:border-2'
                } `}
            >
                <div className="container mx-auto w-full px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}

                        <h1 className="font-[QurovaMedium] font-bold md:text-2xl">dionfirmansyah.</h1>

                        {/* Desktop Navigation */}
                        {!isMobile && (
                            <nav className="hidden items-center justify-center space-x-8 md:flex">
                                {navItems.map((item, index) => (
                                    <div key={item.key} className="group relative">
                                        <button
                                            onClick={() => handleNavClick(item.href)}
                                            className={`relative px-1 py-2 text-sm font-medium transition-all duration-300 ${activeSection === item.key ? 'text-primary' : 'hover:text-primary'}`}
                                        >
                                            <span className="relative z-10">{t(item.key)}</span>
                                            <span
                                                className={`bg-primary absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${activeSection === item.key ? 'w-full' : 'w-0 group-hover:w-full'}`}
                                            ></span>
                                        </button>
                                    </div>
                                ))}
                            </nav>
                        )}

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                            <LangguageSwitcher />
                            {isMobile ? (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="flex items-center justify-center transition-all duration-300 hover:scale-110"
                                >
                                    <div className="relative flex h-6 w-6 items-center justify-center">
                                        <Menu
                                            className={`absolute inset-0 top-1 left-1 transition-all duration-300 ${
                                                isOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'
                                            }`}
                                        />
                                        <X
                                            className={`absolute inset-0 top-1 left-1 transition-all duration-300 ${
                                                isOpen ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'
                                            }`}
                                        />
                                    </div>
                                </Button>
                            ) : (
                                <Button variant={'limeOutline'} asChild>
                                    <Link href={'/#contact'}>{t('cta')}</Link>
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMobile && (
                        <nav
                            className={`overflow-hidden border-t transition-all duration-500 ease-in-out ${isOpen ? 'mt-4 max-h-64 pb-4 opacity-100' : 'mt-0 max-h-0 pb-0 opacity-0'} `}
                        >
                            <div className="flex w-full flex-col items-center space-y-3 pt-2">
                                {navItems.map((item, index) => (
                                    <button
                                        key={item.key}
                                        onClick={() => handleNavClick(item.href)}
                                        className={`block transform rounded-full px-4 text-center text-sm font-medium transition-all duration-300 ${activeSection === item.key ? 'text-primary border border-black bg-lime-300 md:border-2' : 'hover:text-primary hover:bg-primary/5'} ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'} `}
                                        style={{
                                            transitionDelay: isOpen ? `${index * 0.1}s` : '0s',
                                        }}
                                    >
                                        {t(item.key)}
                                    </button>
                                ))}
                            </div>
                        </nav>
                    )}
                </div>
            </header>

            {/* Back to Top */}
            <BackToTopButton />

            {/* Animations */}
            <style jsx global>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                .animate-fadeInRight {
                    animation: fadeInRight 0.6s ease-out both;
                }
            `}</style>
        </>
    );
}
