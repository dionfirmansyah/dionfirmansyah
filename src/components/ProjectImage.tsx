import { AlertCircle, ImageIcon } from 'lucide-react';
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

export function ProjectImage({
    src,
    alt,
    className = '',
    width,
    height,
    projectTitle,
    // priority = false,
}: ProjectImageProps) {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Loading state component
    const LoadingPlaceholder = () => (
        <div className={`${className} flex animate-pulse items-center justify-center bg-gray-100 py-12`}>
            <div className="text-center">
                <div className="mx-auto mb-3 h-12 w-12 animate-pulse rounded-full bg-gray-300" />
                <div className="text-sm font-medium text-gray-500">Loading image...</div>
            </div>
        </div>
    );

    // Error fallback component
    const ErrorFallback = () => (
        <div
            className={`${className} flex flex-col items-center justify-center overflow-hidden border-2 border-dashed border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100`}
        >
            <div className="px-4 py-8 text-center transition-transform duration-300 hover:scale-110">
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

    // Success state with proper image
    if (!imageError && src) {
        return (
            <div className="relative overflow-hidden rounded-lg">
                {isLoading && <LoadingPlaceholder />}
                <img
                    src={src}
                    alt={alt}
                    className={`${className} ${isLoading ? 'absolute inset-0 opacity-0' : 'relative opacity-100'} transition-all duration-300 hover:scale-110`}
                    width={width}
                    height={height}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setImageError(true);
                        setIsLoading(false);
                    }}
                    sizes={`(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${width}px`}
                />
            </div>
        );
    }

    // Fallback for missing or error images
    return <ErrorFallback />;
}
