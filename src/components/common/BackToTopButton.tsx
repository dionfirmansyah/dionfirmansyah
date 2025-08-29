import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function BackToTopButton() {
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [isInFooter, setIsInFooter] = useState(false);
    const [isIdle, setIsIdle] = useState(false);
    const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

    const scrollToHero = () => {
        document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // tampilkan jika > 500px
            setShowBackToTop(currentScrollY > 500);

            // reset idle timer
            setIsIdle(false);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            idleTimerRef.current = setTimeout(() => {
                setIsIdle(true);
            }, 2000); // hilang setelah 2 detik idle

            // deteksi footer
            const footer = document.querySelector('#footer');
            if (footer) {
                const footerTop = footer.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                setIsInFooter(footerTop <= windowHeight - 50);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        };
    }, []);

    return (
        <Button
            variant={'limeOutline'}
            onClick={scrollToHero}
            className={`fixed right-6 bottom-6 z-40 h-12 w-12 rounded-full bg-lime-300 p-0 shadow-lg transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-xl active:scale-95 ${showBackToTop && !isIdle ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-16 opacity-0'} ${isInFooter ? 'bg-black text-white hover:bg-black' : ''}`}
            size="icon"
        >
            <ChevronUp className="h-5 w-5" />
        </Button>
    );
}
