'use client';
import { useCreateRequest } from '@/hooks/useCreateRequest';
import { id } from '@instantdb/react';
import { ArrowUpRight, Circle, Github, Linkedin, Mail, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

export default function Contacts({ locale }: { locale: string }) {
    const t = useTranslations('contact');

    const formatter = new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    const { addRequestProject } = useCreateRequest();
    const [formData, setFormData] = useState({
        id: id(),
        name: '',
        email: '',
        company: '',
        message: '',
        createdAt: formatter.format(new Date()),
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const contactMethods = [
        {
            id: '001',
            label: t('methods.email'),
            value: 'dioonfirmansyah@gmail.com',
            href: 'mailto:dioonfirmansyah@gmail.com',
            icon: Mail,
            available: true,
        },
        {
            id: '002',
            label: t('methods.github'),
            value: 'github.com/dionfirmansyah',
            href: 'https://github.com/dionfirmansyah',
            icon: Github,
            available: true,
        },
        {
            id: '003',
            label: t('methods.linkedin'),
            value: 'linkedin.com/in/dion-firmansyah',
            href: 'https://linkedin.com/in/dion-firmansyah',
            icon: Linkedin,
            available: true,
        },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [lastSubmitTime, setLastSubmitTime] = useState<number | null>(null);
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const ONE_MINUTE = 60 * 1000;

    const updateRemainingTime = (submitTime: number) => {
        const now = Date.now();
        const remaining = Math.ceil((ONE_MINUTE - (now - submitTime)) / 1000);

        if (remaining > 0) {
            setRemainingTime(remaining);

            // Clear existing interval
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            // Update remaining time setiap detik
            intervalRef.current = setInterval(() => {
                const currentRemaining = Math.ceil((ONE_MINUTE - (Date.now() - submitTime)) / 1000);
                if (currentRemaining <= 0) {
                    setRemainingTime(0);
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                } else {
                    setRemainingTime(currentRemaining);
                }
            }, 1000);
        } else {
            setRemainingTime(0);
        }
    };

    // Cleanup interval saat component unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const now = Date.now();

        // Cek rate limit
        if (lastSubmitTime && now - lastSubmitTime < ONE_MINUTE) {
            const remaining = Math.ceil((ONE_MINUTE - (now - lastSubmitTime)) / 1000);

            toast.error(t('form.tooSoon'), {
                description: t('form.tryAgainIn', { seconds: remaining }),
            });

            updateRemainingTime(lastSubmitTime);
            return;
        }

        // Set loading state
        setIsSubmitting(true);

        try {
            await addRequestProject(formData);

            toast.success(t('form.onSuccess'), {
                description: formatter.format(new Date()),
            });

            // Update submit time dan start countdown
            setLastSubmitTime(now);
            updateRemainingTime(now);
        } catch (error) {
            console.error('Request project failed:', error);
            toast.error(t('form.onError'), {
                description: t('form.tryAgain'),
            });
        } finally {
            // Disable button selama 2 detik untuk mencegah double click
            setTimeout(() => setIsSubmitting(false), 2000);
        }
    };

    // Helper function untuk format waktu
    const formatRemainingTime = (seconds: number): string => {
        if (seconds <= 0) return '';

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        if (minutes > 0) {
            return `${minutes}m ${remainingSeconds}s`;
        }
        return `${remainingSeconds}s`;
    };

    // Di JSX, tampilkan status rate limit
    const isRateLimited = remainingTime > 0;

    return (
        <section id="contact" className="py-2">
            <div className="container mx-auto max-w-5xl px-6 pb-20">
                {/* Header Section */}
                <div className="mb-20">
                    <div className="mb-8 flex flex-col items-start justify-between">
                        <div className="mb-2 flex w-full items-center">
                            <p
                                className="animate-slideInUp text-sm font-medium tracking-wider text-gray-500 opacity-0"
                                style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
                            >
                                {t('subtitle')}
                            </p>
                            <div className="ml-2 h-px flex-1 bg-black"></div>◉
                        </div>

                        <h1
                            className="animate-slideInUp text-5xl leading-none font-black tracking-tight text-black opacity-0 md:text-8xl"
                            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
                        >
                            {t('title')}
                        </h1>
                    </div>

                    <div
                        className="animate-slideInRight mb-8 h-0.5 origin-left scale-x-0 bg-black opacity-0"
                        style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
                    ></div>

                    <p
                        className="animate-slideInUp max-w-2xl text-lg text-gray-600 opacity-0"
                        style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
                    >
                        {t('description')}
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
                    {/* Contact Information */}
                    <div className="space-y-12">
                        <div>
                            <h2
                                className="animate-slideInUp mb-8 text-2xl font-bold opacity-0"
                                style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
                            >
                                {t('contactInfo')}
                            </h2>

                            <div className="space-y-8">
                                {contactMethods.map((method, index) => (
                                    <div
                                        key={method.id}
                                        className={`group animate-slideInUp opacity-0 ${method.href ? 'cursor-pointer' : ''}`}
                                        style={{
                                            animationDelay: `${0.7 + index * 0.1}s`,
                                            animationFillMode: 'forwards',
                                        }}
                                    >
                                        {method.href ? (
                                            <a
                                                href={method.href}
                                                target={method.href.startsWith('http') ? '_blank' : '_self'}
                                                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                                className="-mx-4 block rounded-lg px-4 py-4 transition-all duration-300 hover:bg-gray-50/50"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-start space-x-4">
                                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 transition-all duration-300 group-hover:bg-black group-hover:text-white">
                                                            <method.icon className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <div className="mb-1 flex items-center space-x-3">
                                                                <span className="text-xs font-bold text-gray-400">
                                                                    {method.id}
                                                                </span>
                                                                <span className="text-sm font-medium tracking-wider text-gray-500">
                                                                    {method.label}
                                                                </span>
                                                                {method.available && (
                                                                    <Circle className="h-2 w-2 fill-lime-300" />
                                                                )}
                                                            </div>
                                                            <p className="text-lg font-medium text-black transition-colors duration-300 group-hover:text-gray-600">
                                                                {method.value}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <ArrowUpRight className="h-5 w-5 text-gray-400 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:transform group-hover:text-black" />
                                                </div>
                                            </a>
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Response Info */}
                        <div
                            className="animate-slideInUp border-t border-gray-200 pt-8 opacity-0"
                            style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}
                        >
                            <div className="grid grid-cols-2 gap-6 text-sm">
                                <div>
                                    <p className="mb-1 font-medium text-gray-500">{t('responseTime.label')}</p>
                                    <p className="font-medium text-black">{t('responseTime.value')}</p>
                                </div>
                                <div>
                                    <p className="mb-1 font-medium text-gray-500">{t('timezone.label')}</p>
                                    <p className="font-medium text-black">{t('timezone.value')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div
                        className="animate-slideInUp opacity-0"
                        style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
                    >
                        <h2 className="mb-8 text-2xl font-bold">{t('form.title')}</h2>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Form Fields */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label
                                        htmlFor="name"
                                        className="text-xs font-medium tracking-wider text-gray-500 uppercase"
                                    >
                                        {t('form.name')}
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full border-0 border-b-2 border-gray-200 bg-transparent px-0 py-3 text-black placeholder-gray-400 transition-colors duration-300 focus:border-black focus:outline-none"
                                        placeholder={t('form.placeholders.name')}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="text-xs font-medium tracking-wider text-gray-500 uppercase"
                                    >
                                        {t('form.email')}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full border-0 border-b-2 border-gray-200 bg-transparent px-0 py-3 text-black placeholder-gray-400 transition-colors duration-300 focus:border-black focus:outline-none"
                                        placeholder={t('form.placeholders.email')}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="company"
                                    className="text-xs font-medium tracking-wider text-gray-500 uppercase"
                                >
                                    {t('form.company')}
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    className="w-full border-0 border-b-2 border-gray-200 bg-transparent px-0 py-3 text-black placeholder-gray-400 transition-colors duration-300 focus:border-black focus:outline-none"
                                    placeholder={t('form.placeholders.company')}
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="message"
                                    className="text-xs font-medium tracking-wider text-gray-500 uppercase"
                                >
                                    {t('form.message')}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="w-full resize-none border-0 border-b-2 border-gray-200 bg-transparent px-0 py-3 text-black placeholder-gray-400 transition-colors duration-300 focus:border-black focus:outline-none"
                                    placeholder={t('form.placeholders.message')}
                                ></textarea>
                            </div>

                            <div className="pt-4">
                                <Button
                                    variant={'limeOutline'}
                                    type="submit"
                                    disabled={isSubmitting || isRateLimited}
                                    className={`btn ${isRateLimited ? 'btn-disabled' : 'btn-primary'}`}
                                >
                                    <Send />
                                    {isSubmitting
                                        ? t('form.sending')
                                        : isRateLimited
                                          ? t('form.waitTime', { time: formatRemainingTime(remainingTime) })
                                          : t('form.submit')}{' '}
                                    {!isSubmitting && isRateLimited && remainingTime + t('form.seconds')}
                                </Button>
                            </div>

                            <p className="text-xs leading-relaxed text-gray-500">{t('form.disclaimer')}</p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
