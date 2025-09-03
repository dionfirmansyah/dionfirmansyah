'use client';
import { AlertCircle, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ProjectImageProps {
    src: string;
    alt: string;
    className?: string;
    width: number;
    height: number;
    projectTitle?: string;
    priority?: boolean;
}

export function ProjectImage({ src, alt, className = '', width, height, projectTitle }: ProjectImageProps) {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [transformOrigin, setTransformOrigin] = useState('center center');

    // Hitung posisi mouse untuk set `transform-origin`
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setTransformOrigin(`${x}% ${y}%`);
    };

    // Loading state component
    const LoadingPlaceholder = () => (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="relative">
                <div className="h-16 w-16 rounded-full border-2 border-gray-200"></div>
                <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
                <p className="mt-2 text-center text-sm font-medium text-gray-500">Loading...</p>
            </div>
        </div>
    );

    // Error fallback component
    const ErrorFallback = () => (
        <div
            className={`${className} flex flex-col items-center justify-center overflow-hidden border-2 border-dashed border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100`}
        >
            <div className="px-4 py-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-700">{projectTitle || 'Project'}</h3>
                    <p className="mx-auto max-w-xs text-sm leading-relaxed text-gray-500">
                        Image showcase for this project
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-1">
                        <AlertCircle className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-400">Preview unavailable</span>
                    </div>
                </div>
            </div>
        </div>
    );

    if (!imageError && src) {
        return (
            <div
                className="relative overflow-hidden rounded-lg"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setTransformOrigin('center center')}
            >
                {isLoading && <LoadingPlaceholder />}
                <Image
                    src={src}
                    alt={alt}
                    className={`${className} ${
                        isLoading ? 'absolute inset-0 opacity-0' : 'relative opacity-100'
                    } transition-transform duration-500 ease-out group-hover:scale-[2]`}
                    style={{
                        transformOrigin: transformOrigin,
                        transform: 'scale(1)',
                    }}
                    width={width}
                    height={height}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setImageError(true);
                        setIsLoading(false);
                    }}
                    sizes={`(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${width}px`}
                    unoptimized
                />
            </div>
        );
    }

    return <ErrorFallback />;
}
