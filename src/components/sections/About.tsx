'use client';

import { useResponsive } from '@/hooks/useResponsive';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
    SiCss3,
    SiFigma,
    SiGit,
    SiHtml5,
    SiJavascript,
    SiLaravel,
    SiMysql,
    SiNextdotjs,
    SiPhp,
    SiPwa,
    SiPython,
    SiReact,
    SiTailwindcss,
    SiTypescript,
} from 'react-icons/si';
import LogoLoop from '../LogoLoop';

export default function About() {
    const t = useTranslations('about');
    const { isMobile } = useResponsive();

    const skills = [
        {
            name: 'UI/UX DESIGN',
            level: 4,
        },
        {
            name: 'FRONTEND DEV',
            level: 4,
        },
        {
            name: 'BACKEND DEV',
            level: 3,
        },
    ];

    const techLogos = [
        // UI / UX
        { node: <SiFigma />, title: 'Figma', href: 'https://www.figma.com' },

        // Frontend
        { node: <SiHtml5 />, title: 'HTML', href: 'https://html.com' },
        { node: <SiCss3 />, title: 'CSS', href: 'https://css.com' },
        {
            node: <SiJavascript />,
            title: 'JavaScript',
            href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        }, // opsional kalau kamu pakai
        { node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
        { node: <SiReact />, title: 'React', href: 'https://react.dev' },
        { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
        { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
        { node: <SiPwa />, title: 'PWA', href: '#' },

        // Backend
        { node: <SiLaravel />, title: 'Laravel', href: 'https://laravel.com' },
        { node: <SiPhp />, title: 'PHP', href: 'https://www.php.net' },
        { node: <SiMysql />, title: 'MySQL', href: 'https://www.mysql.com' },
        { node: <SiPython />, title: 'Python', href: 'https://www.python.org' },

        // Tools
        { node: <SiGit />, title: 'Git', href: 'https://git-scm.com' },
    ];

    return (
        <section id="about" className="bt-10 pb-20">
            <div className="container mx-auto max-w-5xl px-4">
                {/* Header */}
                <div className="mb-12 w-full">
                    <h1
                        className="animate-slideInUp text-5xl leading-none font-black tracking-tight text-black opacity-0 md:text-8xl"
                        style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
                    >
                        {t('title')}
                    </h1>
                </div>

                {/* Content */}
                <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} items-start gap-12`}>
                    {/* Photo / Illustration Placeholder */}
                    <div
                        className={`bg-secondary relative overflow-hidden rounded-lg ${isMobile ? 'h-64' : 'h-96'} animate-slideInUp opacity-0`}
                        style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
                    >
                        <Image
                            src="/images/dion-firmansyah.png"
                            alt="dion-firmansyah"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Text Content */}
                    <div
                        className="animate-slideInUp space-y-6 opacity-0"
                        style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
                    >
                        <div className="w-full max-w-3xl space-y-4">
                            {/* Description */}
                            <p className="text-md text-justify leading-relaxed text-gray-700 first-letter:float-left first-letter:mr-3 first-letter:bg-lime-300 first-letter:p-2 first-letter:py-1 first-letter:text-6xl first-letter:font-bold">
                                {t('description')}
                            </p>

                            {/* Sub Description */}
                            <p className="text-md text-justify leading-relaxed text-gray-700 first-letter:float-left first-letter:mr-3 first-letter:bg-lime-300 first-letter:p-2 first-letter:py-1 first-letter:text-6xl first-letter:font-bold">
                                {t('sub-description')}
                            </p>
                        </div>

                        {/* Skills */}
                        <div>
                            {/* Skills Section */}
                            <div className="flex w-full items-center">
                                <h3 className="text-xl font-bold">Skills</h3>
                                <div className="ml-2 h-px flex-1 bg-black"></div>◉
                            </div>

                            <div className="my-4 space-y-2">
                                {skills.map((skill) => (
                                    <div key={skill.name} className="flex items-center gap-2">
                                        {skill.name}
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <span
                                                key={i}
                                                className={`h-2 w-2 rounded-full ${
                                                    i < skill.level ? 'bg-black' : 'border border-black'
                                                }`}
                                            ></span>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            {/* Tools & Technologies */}
                            <div className="mb-4 flex w-full items-center">
                                <h3 className="text-xl font-bold">Tools & Technologies</h3>
                                <div className="ml-2 h-px flex-1 bg-black"></div>◉
                            </div>

                            <LogoLoop
                                logos={techLogos}
                                speed={80}
                                direction="left"
                                logoHeight={48}
                                gap={40}
                                pauseOnHover
                                scaleOnHover
                                fadeOut
                                fadeOutColor="#ffffff"
                                ariaLabel="Technology partners"
                                className="mt-6"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Animations */}
            <style jsx global>{`
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: scaleX(0);
                    }
                    to {
                        opacity: 1;
                        transform: scaleX(1);
                    }
                }
                .animate-slideInUp {
                    animation: slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
                .animate-slideInRight {
                    animation: slideInRight 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }

                .about {
                    background: var(--swiss-gray);
                }

                .about p {
                    font-size: 18px;
                    line-height: 1.5;
                    margin-bottom: 24px;
                }

                .skills {
                    margin-top: 32px;
                }

                .skill-item {
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid var(--black);
                    padding-bottom: 8px;
                    margin-bottom: 16px;
                }

                .about-box {
                    background: var(--white);
                    padding: 32px;
                }

                .about-number {
                    font-size: 96px;
                    font-weight: bold;
                    color: var(--swiss-red);
                    margin-bottom: 16px;
                }

                .about-text {
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin-bottom: 32px;
                }

                .tools-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 8px;
                    font-size: 14px;
                }
            `}</style>
        </section>
    );
}
