import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import About from '@/components/sections/About';
import Hero from '@/components/sections/Hero';
import { LoaderIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

const FeaturedWorkSection = dynamic(() => import('@/components/sections/Projects'), {
    loading: () => (
        <div className="animate-spin">
            <LoaderIcon className="mr-2" /> {'Loading..'}
        </div>
    ),
});
const ContactSection = dynamic(() => import('@/components/sections/Contacts'), {
    loading: () => (
        <div className="animate-spin">
            <LoaderIcon className="mr-2" /> {'Loading..'}
        </div>
    ),
});

export default function Page({ params }: { params: { locale: string } }) {
    return (
        <main>
            <Header />
            <Hero />
            <About />
            <FeaturedWorkSection />
            <ContactSection locale={params.locale} />
            <Footer />
        </main>
    );
}
