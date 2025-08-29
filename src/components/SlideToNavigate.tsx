'use client';

import { useResponsive } from '@/hooks/useResponsive';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef, useState } from 'react';

interface SlideToViewAllProps {
    targetPath: string;
    label?: string;
    pointerWidth?: number;
}

export default function SlideToNavigate({ targetPath, label, pointerWidth = 120 }: SlideToViewAllProps) {
    const router = useRouter();
    const { isMobile } = useResponsive();
    const [value, setValue] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const dragStartPos = useRef<{ x: number; value: number } | null>(null);
    const hasMoved = useRef(false);

    const thumbPosition = useMemo(() => {
        const thumbWidth = pointerWidth;
        return `calc(${value}% - ${(value / 100) * thumbWidth}px)`;
    }, [value]);

    const handleMouseDown = useCallback(
        (e: React.MouseEvent) => {
            dragStartPos.current = {
                x: e.clientX,
                value: value,
            };
            hasMoved.current = false;
            setIsDragging(false);
        },
        [value],
    );

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (dragStartPos.current) {
            const moveDistance = Math.abs(e.clientX - dragStartPos.current.x);

            if (moveDistance > 5 && !hasMoved.current) {
                hasMoved.current = true;
                setIsDragging(true);
            }
        }
    }, []);

    const handleMouseUp = useCallback(() => {
        dragStartPos.current = null;
        hasMoved.current = false;
        setIsDragging(false);
    }, []);

    const handleTouchStart = useCallback(
        (e: React.TouchEvent) => {
            const touch = e.touches[0];
            dragStartPos.current = {
                x: touch.clientX,
                value: value,
            };
            hasMoved.current = false;
            setIsDragging(false);
        },
        [value],
    );

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (dragStartPos.current) {
            const touch = e.touches[0];
            const moveDistance = Math.abs(touch.clientX - dragStartPos.current.x);

            if (moveDistance > 5 && !hasMoved.current) {
                hasMoved.current = true;
                setIsDragging(true);
            }
        }
    }, []);

    const handleTouchEnd = useCallback(() => {
        dragStartPos.current = null;
        hasMoved.current = false;
        setIsDragging(false);
    }, []);

    const handleInput = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            if (!isDragging) return;

            const target = e.target as HTMLInputElement;
            const newValue = parseInt(target.value);
            setValue(newValue);

            if (newValue >= 93 && !isComplete) {
                setIsComplete(true);
                setTimeout(() => router.push(targetPath), 150);
            }
        },
        [isDragging, isComplete, router, targetPath],
    );

    const handleClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    return (
        <>
            <div className="flex w-full items-center gap-3">
                <div className="relative flex-1">
                    <div className="absolute top-1 right-0 z-10 bg-white">◉</div>
                    <div className="relative h-8 overflow-hidden">
                        <input
                            type="range"
                            min="0"
                            max={isMobile ? '93' : '98'}
                            value={value}
                            onInput={handleInput}
                            onClick={handleClick}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            className="slider-custom h-8 w-full appearance-none bg-transparent"
                            style={{
                                cursor: isDragging ? 'grabbing' : 'grab',
                            }}
                        />

                        <div
                            className="pointer-events-none absolute top-1/2 z-10"
                            style={{
                                left: thumbPosition,
                                transform: 'translateY(-50%)',
                            }}
                        >
                            <div
                                className={`rounded-full border-2 border-black px-3 py-1 text-xs font-medium whitespace-nowrap ${
                                    isComplete ? 'bg-lime-300 text-black' : 'bg-white'
                                } transition-colors duration-200`}
                            >
                                {isComplete ? (
                                    <div className="flex items-center gap-2">
                                        {label}
                                        <Loader2 className="h-3 w-3 animate-spin" />
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        {label}
                                        <ArrowRight className="h-3 w-3" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .slider-custom::-webkit-slider-runnable-track {
                    height: 2px;
                    background: black;
                    border-radius: 1px;
                }
                .slider-custom::-moz-range-track {
                    height: 2px;
                    background: black;
                    border-radius: 1px;
                    border: none;
                }
                .slider-custom::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 120px;
                    height: 28px;
                    border-radius: 9999px;
                    background: transparent;
                    cursor: inherit;
                    margin-top: -13px;
                }
                .slider-custom::-moz-range-thumb {
                    width: 120px;
                    height: 28px;
                    border-radius: 9999px;
                    background: transparent;
                    cursor: inherit;
                    border: none;
                }
                .slider-custom {
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    -webkit-tap-highlight-color: transparent;
                }
            `}</style>
        </>
    );
}
