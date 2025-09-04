'use client';

import { Button } from '@/components/ui/button';
import { useProject } from '@/hooks/useProject';
import { Project } from '@/types';
import { Calendar, ChevronDown, ExternalLink, Github } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { ProjectImage } from '../ProjectImage';
import ProjectSkeleton from '../ProjectSkeleton';
import { RequestDemoModal } from '../RequestDemoModal';
import SlideToViewAll from '../SlideToNavigate';

export default function Projects() {
    const t = useTranslations('projects');

    const locale = useLocale();

    const { featured_works, isLoading, error } = useProject();

    const [expandedProject, setExpandedProject] = useState<string | null>(null);

    const toggleProject = (projectId: string) => {
        setExpandedProject(expandedProject === projectId ? null : projectId);
    };

    const [selectedProject, setSelectedProject] = useState<string | undefined>(undefined);
    const [open, setOpen] = useState(false);

    const handleRequestDemo = (projectName: string | undefined) => {
        setSelectedProject(projectName);
        setOpen(true);
    };

    return (
        <section id="projects" className="py-2">
            <div className="container mx-auto max-w-5xl px-4">
                {/* Header Section - Neo Swiss Style */}
                <div className="mb-2">
                    <div className="">
                        <div className="mb-2 flex items-center justify-between">
                            <p className="text-sm font-medium tracking-wider text-gray-500">{t('title')}</p>
                            {/* Garis separator */}
                            <div className="ml-2 h-px flex-1 bg-black"></div>◉
                            <p className="text-4xl font-black text-gray-300 md:text-6xl">0{featured_works?.length}</p>
                        </div>

                        <h1 className="text-6xl leading-none font-black tracking-tight text-black md:text-8xl">
                            {t('subtitle')}
                        </h1>
                    </div>
                </div>

                {/* Description */}
                <div
                    className="w-full border-b-2 border-dashed border-black"
                    style={{
                        borderBottomWidth: '2px',
                        borderBottomStyle: 'dashed',
                        borderBottomColor: 'black',
                        borderImage:
                            'repeating-linear-gradient(to right, black 0, black 10px, transparent 10px, transparent 20px) 1',
                    }}
                >
                    <p className="mt-12 mb-16 text-justify text-lg leading-relaxed text-gray-700 first-letter:float-left first-letter:mr-3 first-letter:bg-lime-300 first-letter:p-2 first-letter:py-1 first-letter:text-6xl first-letter:font-bold">
                        {t('description')}
                    </p>
                </div>
                {/* Projects List - Accordion Style */}

                {isLoading || error || featured_works.length === 0 ? (
                    <>
                        <ProjectSkeleton />
                        <ProjectSkeleton />
                        <ProjectSkeleton />
                    </>
                ) : (
                    <div className="space-y-0">
                        {featured_works.map((data: Project, index) => (
                            <div
                                key={data.id}
                                className={`border-b border-black last:border-b-0`}
                                style={{ animationDelay: `${0.8 + index * 0.1}s`, animationFillMode: 'forwards' }}
                            >
                                {/* Project Header */}
                                <button
                                    onClick={() => toggleProject(data.id)}
                                    className="group relative w-full overflow-hidden py-8 transition-all duration-300"
                                >
                                    <div className="relative grid grid-cols-12 items-center gap-4 text-left">
                                        {/* Number */}
                                        <div className="col-span-2 md:col-span-1">
                                            <p className="text-lg font-bold text-gray-400 transition-all duration-300 group-hover:text-black">
                                                N°00{index + 1}
                                            </p>
                                        </div>

                                        {/* Project Title */}
                                        <div className="col-span-8 ml-2 md:col-span-6">
                                            <h3 className="transform text-lg font-bold text-black transition-all duration-300 group-hover:translate-x-2 group-hover:text-gray-600 md:text-2xl">
                                                {data.title || data.name || ''}
                                            </h3>
                                            <p className="mt-1 transform text-sm text-gray-500 transition-all duration-300 group-hover:translate-x-2">
                                                {data.category || data.type || ''}
                                            </p>
                                        </div>

                                        {/* Client */}
                                        <div className="col-span-3 hidden md:col-span-2 md:block">
                                            <p className="text-sm font-medium text-gray-700 transition-colors duration-300 group-hover:text-black">
                                                {data.client || data.company || ''}
                                            </p>
                                        </div>

                                        {/* Year */}
                                        <div className="col-span-2 mx-auto hidden text-center md:col-span-2 md:block">
                                            <p className="rounded-full border border-black bg-lime-300 px-2 text-sm font-medium text-black transition-colors duration-300 group-hover:text-gray-600 md:border-2">
                                                {data.year || (data.createdAt ? data.createdAt.substring(0, 4) : '')}
                                            </p>
                                        </div>

                                        {/* Expand Icon */}
                                        <div className="col-span-2 flex justify-end md:col-span-1">
                                            <div
                                                className={`transform transition-all duration-500 ${expandedProject === data.id ? 'rotate-180' : 'rotate-0'}`}
                                            >
                                                <ChevronDown className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-black" />
                                            </div>
                                        </div>
                                    </div>
                                </button>

                                {/* Expanded Content with Smooth Animation */}
                                <div
                                    className={`overflow-hidden transition-all duration-700 ease-out ${
                                        expandedProject === data.id ? 'max-h-[1000px] opacity-100' : 'max-h-0'
                                    }`}
                                >
                                    <div
                                        className={`ml-4 transform border-l-2 border-gray-200 pb-8 pl-4 transition-all duration-700 ease-out md:ml-8 md:pl-16 ${
                                            expandedProject === data.id ? 'translate-y-0' : '-translate-y-4'
                                        }`}
                                    >
                                        <div className="max-w-3xl">
                                            {/* Images */}
                                            <div className="mb-4">
                                                {data.showcaseImages?.length
                                                    ? data.showcaseImages.map((img, index: number) => (
                                                          <div key={index}>
                                                              <ProjectImage
                                                                  src={img.url || ''}
                                                                  alt={`Project image ${index + 1}`}
                                                                  className="h-full w-full rounded-lg object-cover transition-transform duration-500 hover:scale-105"
                                                                  width={0}
                                                                  height={0}
                                                                  projectTitle={data.title}
                                                                  priority={index === 0}
                                                              />
                                                          </div>
                                                      ))
                                                    : []}
                                            </div>

                                            {/* Description */}
                                            <p
                                                className={`mb-6 leading-relaxed text-gray-700 transition-all delay-100 duration-700 ${
                                                    expandedProject === data.id
                                                        ? 'translate-y-0 transform opacity-100'
                                                        : 'translate-y-4 transform'
                                                }`}
                                            >
                                                {locale === 'id'
                                                    ? data.descriptions?.[0]?.indonesia || data.description || ''
                                                    : data.descriptions?.[0]?.english || data.description || ''}
                                            </p>

                                            {/* Mobile Client Info */}
                                            <div
                                                className={`mb-6 transition-all delay-200 duration-700 md:hidden ${
                                                    expandedProject === data.id
                                                        ? 'translate-y-0 transform opacity-100'
                                                        : 'translate-y-4 transform'
                                                }`}
                                            >
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <p className="mb-1 font-medium text-gray-500">CLIENT</p>
                                                        <p className="text-gray-700">
                                                            {data.client || data.company || ''}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="mb-1 font-medium text-gray-500">YEAR</p>
                                                        <p className="text-gray-700">
                                                            {data.year ||
                                                                (data.createdAt ? data.createdAt.substring(0, 4) : '')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Technologies */}
                                            <div
                                                className={`mb-8 transition-all delay-300 duration-700 ${
                                                    expandedProject === data.id
                                                        ? 'translate-y-0 transform opacity-100'
                                                        : 'translate-y-4 transform'
                                                }`}
                                            >
                                                <p className="mb-3 text-sm font-medium tracking-wider text-gray-500">
                                                    {t('tech')}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {(data.technologies ?? []).map((tech, techIndex: number) => (
                                                        <span
                                                            key={techIndex}
                                                            className={`border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 transition-all duration-300 hover:scale-105 hover:transform hover:border-gray-300 ${
                                                                expandedProject === data.id
                                                                    ? 'animate-slideInScale'
                                                                    : ''
                                                            }`}
                                                            style={{
                                                                animationDelay:
                                                                    expandedProject === data.id
                                                                        ? `${400 + techIndex * 50}ms`
                                                                        : '0ms',
                                                                animationFillMode: 'forwards',
                                                            }}
                                                        >
                                                            {tech.name || tech.title || String(tech) || ''}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div
                                                className={`flex gap-4 transition-all delay-500 duration-700 ${
                                                    expandedProject === data.id
                                                        ? 'translate-y-0 transform opacity-100'
                                                        : 'translate-y-4 transform'
                                                }`}
                                            >
                                                {data.liveUrl ? (
                                                    <Button asChild variant="limeOutline">
                                                        <Link
                                                            href={data.liveUrl || '#'}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="group flex items-center"
                                                        >
                                                            <ExternalLink className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-105" />
                                                            {t('viewProject')}
                                                        </Link>
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        onClick={() => handleRequestDemo(data.title)}
                                                        variant="limeOutline"
                                                        className="group flex items-center"
                                                    >
                                                        <Calendar className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-105" />
                                                        {t('requestDemo')}
                                                    </Button>
                                                )}

                                                {data.githubUrl && (
                                                    <Button
                                                        variant="outline"
                                                        className="rounded-full border-black px-6 font-medium transition-all duration-300 hover:scale-105 hover:transform hover:border-gray-400 hover:shadow-md md:border-2"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={data.githubUrl || '#'}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center"
                                                        >
                                                            <Github className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                                                            {t('sourceCode')}
                                                        </Link>
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="my-10 w-full">
                    <SlideToViewAll
                        targetPath="/work?"
                        label={t('slideButton')}
                        pointerWidth={locale === 'id' ? 175 : 125}
                    />
                </div>
                <RequestDemoModal
                    open={open}
                    onClose={() => setOpen(false)}
                    projectName={selectedProject || ''}
                    locale={locale}
                />
            </div>

            {/* CSS Animations */}
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

                @keyframes slideInScale {
                    from {
                        opacity: 0;
                        transform: translateY(10px) scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                . {
                    animation: slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }

                .animate-slideInRight {
                    animation: slideInRight 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }

                .animate-slideInScale {
                    animation: slideInScale 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    opacity: 0;
                }
            `}</style>
        </section>
    );
}
