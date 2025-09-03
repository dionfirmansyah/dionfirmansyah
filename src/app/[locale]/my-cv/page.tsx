import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Link from 'next/link';
import CVPreview from './CVPreview';

export default function MyCvPage() {
    return (
        <>
            <div className="flex h-full items-center justify-center p-2">
                <div className="h-ful relative w-full max-w-7xl overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-2 md:flex-row">
                        <div className="flex w-full items-center justify-between">
                            <h1 className="font-mono text-2xl font-black tracking-[0.2em] text-black uppercase">
                                CV{' '}
                                <span className="font-mono text-sm font-medium tracking-wider text-gray-600 uppercase">
                                    DION FIRMANSYAH
                                </span>
                            </h1>
                            <Button
                                title="CLOSE"
                                variant={'outline'}
                                size={'icon'}
                                className="rounded-full border-2 border-black bg-white text-black"
                                asChild
                            >
                                <Link href={'/#home'}>
                                    <X className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <CVPreview />
                </div>
            </div>
        </>
    );
}
