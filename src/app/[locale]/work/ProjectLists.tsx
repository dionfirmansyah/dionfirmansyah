'use client';
import { ProjectImage } from '@/components/ProjectImage';
import ProjectSkeleton from '@/components/ProjectSkeleton';
import { RequestDemoModal } from '@/components/RequestDemoModal';
import { Button } from '@/components/ui/button';
import { useProject } from '@/hooks/useProject';
import { ArrowLeft, Calendar, ChevronDown, Contact, ExternalLink, Github, Rocket } from 'lucide-react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

interface Translations {
    allwork: string;
    'allwork-desc': string;
    location: string;
    availableFor: string;
    newProjects: string;
    tech: string;
    viewProject: string;
    sourceCode: string;
    'cta-1': string;
    'cta-2': string;
    'cta-3': string;
    'cta-4': string;
    requestDemo: string;
}

interface ProjectListsProps {
    translations: Translations;
}

// Initial Loading Screen
function InitialLoadingScreen({ translations }: { translations: Translations }) {
    return (
        <div className="min-h-screen bg-white lg:flex lg:h-screen">
            {/* Left Sidebar - Static Content */}
            <div className="lg:sticky lg:flex lg:h-screen lg:w-1/2 lg:flex-col lg:justify-start lg:border-r-2 lg:border-black lg:bg-white lg:px-16 lg:pt-11">
                <div
                    className="border-b-2 border-dashed border-black px-4 py-8 lg:border-b-0 lg:px-4 lg:py-8"
                    style={{
                        borderBottomWidth: '2px',
                        borderBottomStyle: 'dashed',
                        borderBottomColor: 'black',
                        borderImage:
                            'repeating-linear-gradient(to right, black 0, black 10px, transparent 10px, transparent 20px) 1',
                    }}
                >
                    <div className="mb-4 flex items-center justify-between">
                        <Link href="/#projects">
                            <Button variant="limeOutline">
                                <ArrowLeft /> Back
                            </Button>
                        </Link>
                        <div className="ml-4 flex flex-1 items-center gap-2">
                            <p className="text-sm font-medium tracking-wider whitespace-nowrap text-gray-500">
                                {translations.allwork}
                            </p>
                            <div className="h-px flex-1 bg-black" />◉
                            <p className="text-4xl font-black text-gray-300 md:text-6xl">00</p>
                        </div>
                    </div>

                    <h1 className="mb-6 text-[clamp(4rem,8vw,6rem)] leading-[0.85] font-black tracking-tight text-black md:text-8xl">
                        {translations.allwork.split(' ').map((word, i) =>
                            i === 0 ? (
                                <span key={i}>
                                    {word}
                                    <br />
                                </span>
                            ) : (
                                <span key={i}> {word}</span>
                            ),
                        )}
                    </h1>

                    <div className="w-full max-w-3xl">
                        <p className="text-justify text-lg leading-relaxed text-gray-700 first-letter:float-left first-letter:mr-3 first-letter:bg-lime-300 first-letter:p-2 first-letter:py-1 first-letter:text-6xl first-letter:font-bold">
                            {translations['allwork-desc']}
                        </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between lg:mt-6">
                        <div>
                            <p className="mb-1 font-mono text-xs tracking-[0.2em] text-gray-500 uppercase">
                                {translations.location}
                            </p>
                            <p className="text-lg font-medium text-black">
                                Banjarmasin, <span className="lg:hidden">ID</span>
                                <span className="hidden lg:inline">INDONESIA</span>
                            </p>
                        </div>
                        <div>
                            <p className="mb-1 font-mono text-xs tracking-[0.2em] text-gray-500 uppercase">
                                {translations.availableFor}
                            </p>
                            <p className="text-lg font-medium text-black">{translations.newProjects}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Content - Loading State */}
            <div className="lg:h-screen lg:w-1/2 lg:overflow-y-auto">
                {/* <div className="flex items-center justify-center py-16 lg:h-96">
                    <div className="text-center">
                        <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-gray-400" />
                        <p className="mb-2 text-xl font-bold text-gray-400 lg:text-2xl">Loading projects...</p>
                        <p className="text-sm text-gray-500 lg:text-base">Fetching data from InstantDB</p>
                    </div>
                </div> */}
                <ProjectSkeleton />
                <ProjectSkeleton />
                <ProjectSkeleton />
                {/* Footer CTA */}
                <div className="border-t border-gray-200 bg-gray-50 px-4 py-12 lg:border-t-2 lg:border-black lg:px-8 lg:py-16">
                    <div className="text-center">
                        <div className="mb-6 lg:mb-8">
                            <p className="mb-2 text-xs font-medium tracking-wider text-gray-500 uppercase lg:mb-3 lg:text-sm">
                                {translations['cta-1']}
                            </p>
                            <h2 className="text-2xl font-bold text-black lg:text-4xl">{translations['cta-2']}</h2>
                        </div>
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-center lg:gap-4">
                            <Button asChild variant="limeOutline">
                                <Link href="/#contact" className="group flex items-center">
                                    <Rocket className="mr-2 h-4 w-4 transition-transform duration-300" />
                                    {translations['cta-3']}
                                </Link>
                            </Button>

                            <Button
                                variant="outline"
                                className="group text-foreground w-full rounded-full border-black px-8 py-4 text-lg font-bold tracking-wide uppercase hover:bg-lime-300 hover:text-black md:w-auto md:border-2"
                                asChild
                            >
                                <Link href="/#about" className="flex items-center">
                                    <Contact className="mr-2 h-4 w-4 transition-transform duration-300" />
                                    <p>{translations['cta-4']}</p>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ProjectLists({ translations }: ProjectListsProps) {
    const { allWorks, isLoading, error } = useProject(); // InstantDB hook Anda
    const locale = useLocale();
    const [expandedProject, setExpandedProject] = useState<string | null>(null);

    const [selectedProject, setSelectedProject] = useState<string | undefined>(undefined);
    const [open, setOpen] = useState(false);
    // Ensure allWorks is always an array
    const safeAllWorks = Array.isArray(allWorks) ? allWorks : [];

    const toggleProject = (projectId: string) => {
        setExpandedProject(expandedProject === projectId ? null : projectId);
    };

    // Show initial loading screen saat data masih loading
    if (isLoading && safeAllWorks.length === 0) {
        return <InitialLoadingScreen translations={translations} />;
    }

    // Handle error state
    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <div className="text-center">
                    <div className="mb-4 text-6xl">⚠️</div>
                    <h2 className="mb-2 text-2xl font-bold text-gray-800">Failed to load projects</h2>
                    <p className="mb-4 text-gray-600">Please check your connection and try again.</p>
                    <Button onClick={() => window.location.reload()} variant="limeOutline">
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    const handleRequestDemo = (projectName: string | undefined) => {
        setSelectedProject(projectName);
        setOpen(true);
    };

    return (
        <div className="min-h-screen bg-white lg:flex lg:h-screen">
            {/* Left Sidebar */}
            <div className="lg:sticky lg:flex lg:h-screen lg:w-1/2 lg:flex-col lg:justify-start lg:border-r-2 lg:border-black lg:bg-white lg:px-16 lg:pt-11">
                <div
                    className="border-b-2 border-dashed border-black px-4 py-8 lg:border-b-0 lg:px-4 lg:py-8"
                    style={{
                        borderBottomWidth: '2px',
                        borderBottomStyle: 'dashed',
                        borderBottomColor: 'black',
                        borderImage:
                            'repeating-linear-gradient(to right, black 0, black 10px, transparent 10px, transparent 20px) 1',
                    }}
                >
                    <div className="mb-4 flex items-center justify-between">
                        <Link href="/#projects">
                            <Button variant="limeOutline">
                                <ArrowLeft /> Back
                            </Button>
                        </Link>
                        <div className="ml-4 flex flex-1 items-center gap-2">
                            <p className="text-sm font-medium tracking-wider whitespace-nowrap text-gray-500">
                                {translations.allwork}
                            </p>
                            <div className="h-px flex-1 bg-black" />◉
                            <p className="text-4xl font-black text-gray-300 md:text-6xl">
                                {isLoading ? <span className="animate-pulse">...</span> : `0${allWorks.length}`}
                            </p>
                        </div>
                    </div>

                    <h1 className="mb-6 text-[clamp(4rem,8vw,6rem)] leading-[0.85] font-black tracking-tight text-black md:text-8xl">
                        {translations.allwork.split(' ').map((word, i) =>
                            i === 0 ? (
                                <span key={i}>
                                    {word}
                                    <br />
                                </span>
                            ) : (
                                <span key={i}> {word}</span>
                            ),
                        )}
                    </h1>

                    <div className="w-full max-w-3xl">
                        <p className="text-justify text-lg leading-relaxed text-gray-700 first-letter:float-left first-letter:mr-3 first-letter:bg-lime-300 first-letter:p-2 first-letter:py-1 first-letter:text-6xl first-letter:font-bold">
                            {translations['allwork-desc']}
                        </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between lg:mt-6">
                        <div>
                            <p className="mb-1 font-mono text-xs tracking-[0.2em] text-gray-500 uppercase">
                                {translations.location}
                            </p>
                            <p className="text-lg font-medium text-black">
                                Banjarmasin, <span className="lg:hidden">ID</span>
                                <span className="hidden lg:inline">INDONESIA</span>
                            </p>
                        </div>
                        <div>
                            <p className="mb-1 font-mono text-xs tracking-[0.2em] text-gray-500 uppercase">
                                {translations.availableFor}
                            </p>
                            <p className="text-lg font-medium text-black">{translations.newProjects}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Content */}
            <div className="lg:h-screen lg:w-1/2 lg:overflow-y-auto">
                <div className="divide-y divide-black lg:divide-y-2">
                    {/* Show skeleton saat masih loading lebih banyak data */}
                    {isLoading && allWorks.length > 0 && <ProjectSkeleton />}

                    {allWorks.length === 0 && !isLoading ? (
                        <div className="flex items-center justify-center py-16 lg:h-96">
                            <div className="text-center">
                                <p className="mb-2 text-xl font-bold text-gray-400 lg:text-2xl">No projects found</p>
                                <p className="text-sm text-gray-500 lg:text-base">
                                    <p>{`Projects will appear here once they're available`}</p>
                                </p>
                            </div>
                        </div>
                    ) : (
                        allWorks.map((project, index) => (
                            <div key={project.id} className="bg-white">
                                <button
                                    onClick={() => toggleProject(project.id)}
                                    className="group relative w-full px-4 py-4 hover:bg-gray-50 lg:px-8 lg:py-8"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-1 items-start space-x-3 text-left lg:items-center lg:space-x-6">
                                            <span className="text-sm font-bold text-gray-400 group-hover:text-black lg:w-16 lg:text-lg">
                                                N°{String(index + 1).padStart(3, '0')}
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <div className="mb-1 flex w-full items-start justify-between gap-2 lg:items-center lg:gap-4">
                                                    <h3 className="text-lg leading-tight font-bold text-black group-hover:text-gray-600 lg:text-2xl">
                                                        {project.title}
                                                    </h3>
                                                    {project.year && (
                                                        <span className="flex-shrink-0 rounded-full border border-black bg-lime-300 px-1 py-0.5 text-xs font-bold text-black lg:px-2 lg:py-1">
                                                            {project.year}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-gray-500 lg:gap-4 lg:text-sm">
                                                    <span>{project.category}</span>
                                                    {project.client && (
                                                        <>
                                                            <span className="hidden lg:inline">•</span>
                                                            <span className="hidden lg:inline">{project.client}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={`ml-2 flex-shrink-0 transition-transform duration-200 lg:ml-4 ${
                                                expandedProject === project.id ? 'rotate-180' : 'rotate-0'
                                            }`}
                                        >
                                            <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-black lg:h-6 lg:w-6" />
                                        </div>
                                    </div>
                                </button>

                                {/* Expanded Content */}
                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-out ${
                                        expandedProject === project.id
                                            ? 'max-h-[2000px] opacity-100'
                                            : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <div className="px-4 pb-4 lg:px-8 lg:pb-8">
                                        <div className="ml-6 border-l border-gray-200 pl-3 lg:ml-22 lg:border-l-2 lg:pl-8">
                                            {/* Images */}
                                            {project.imgUrl && project.imgUrl.length > 0 && (
                                                <div className="mb-6 space-y-2">
                                                    {project.imgUrl.map((img, imgIndex) => (
                                                        <div key={imgIndex}>
                                                            <ProjectImage
                                                                src={img}
                                                                alt={`${project.title} showcase ${imgIndex + 1}`}
                                                                className="h-full w-full rounded-lg object-cover"
                                                                width={0}
                                                                height={0}
                                                                projectTitle={project.title}
                                                                priority={index === 0}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Description */}
                                            <p className="mb-6 text-base leading-relaxed text-gray-700 lg:mb-8">
                                                {locale === 'id'
                                                    ? project.descriptions?.indonesia || ''
                                                    : project.descriptions?.english || ''}
                                            </p>

                                            {/* Client Info - Mobile Only */}
                                            <div className="mb-6 lg:hidden">
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <p className="mb-1 text-xs font-medium text-gray-500 uppercase">
                                                            Client
                                                        </p>
                                                        <p className="text-gray-700">{project.client}</p>
                                                    </div>
                                                    <div>
                                                        <p className="mb-1 text-xs font-medium text-gray-500 uppercase">
                                                            Year
                                                        </p>
                                                        <p className="text-gray-700">{project.year}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Technologies */}
                                            <div className="mb-6 lg:mb-8">
                                                <p className="mb-4 text-sm font-medium tracking-wider text-gray-500 uppercase">
                                                    {translations.tech}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.technologies?.map((tech, techIndex) => (
                                                        <span
                                                            key={techIndex}
                                                            className="transform border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 transition-all duration-300 hover:scale-105 hover:border-gray-300"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-2">
                                                {project.liveUrl ? (
                                                    <Button asChild variant="limeOutline">
                                                        <Link
                                                            href={project.liveUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="group flex items-center"
                                                        >
                                                            <ExternalLink className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-105" />
                                                            {translations.viewProject}
                                                        </Link>
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        onClick={() => handleRequestDemo(project.title)}
                                                        variant="limeOutline"
                                                        className="group flex items-center"
                                                    >
                                                        <Calendar className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-105" />
                                                        {translations.requestDemo}
                                                    </Button>
                                                )}
                                                {project.githubUrl && (
                                                    <>
                                                        <Button
                                                            variant="outline"
                                                            className="group rounded-full border-black px-8 py-4 tracking-wide hover:bg-lime-300 hover:text-black md:w-auto md:border-2"
                                                            asChild
                                                        >
                                                            <Link
                                                                href={project.githubUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center"
                                                            >
                                                                <Github className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                                                                {translations.sourceCode}
                                                            </Link>
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer CTA */}
                <div className="border-t border-gray-200 bg-gray-50 px-4 py-12 lg:border-t-2 lg:border-black lg:px-8 lg:py-16">
                    <div className="text-center">
                        <div className="mb-6 lg:mb-8">
                            <p className="mb-2 text-xs font-medium tracking-wider text-gray-500 uppercase lg:mb-3 lg:text-sm">
                                {translations['cta-1']}
                            </p>
                            <h2 className="text-2xl font-bold text-black lg:text-4xl">{translations['cta-2']}</h2>
                        </div>
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-center lg:gap-4">
                            <Button asChild variant="limeOutline">
                                <Link href="/#contact" className="group flex items-center">
                                    <Rocket className="mr-2 h-4 w-4 transition-transform duration-300" />
                                    {translations['cta-3']}
                                </Link>
                            </Button>

                            <Button
                                variant="outline"
                                className="group rounded-full border-black px-8 py-4 font-bold tracking-wide hover:bg-lime-300 hover:text-black md:w-auto md:border-2"
                                asChild
                            >
                                <Link href="/#about" className="flex items-center">
                                    <Contact className="mr-2 h-4 w-4 transition-transform duration-300" />
                                    {translations['cta-4']}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <RequestDemoModal
                open={open}
                onClose={() => setOpen(false)}
                projectName={selectedProject || ''}
                locale={locale}
            />
        </div>
    );
}
