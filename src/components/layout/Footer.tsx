// Footer.tsx
import { Github, Linkedin, Mail } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const TextLoop = dynamic(() => import('@/components/TextLoop'));

export default async function Footer() {
    const t = await getTranslations('footer');
    const socialLinks = [
        {
            name: t('social.github'),
            url: 'https://github.com/dionfirmansyah',
            icon: Github,
            color: 'hover:text-gray-400',
        },
        {
            name: t('social.linkedin'),
            url: 'https://linkedin.com/in/dion-firmansyah',
            icon: Linkedin,
            color: 'hover:text-blue-400',
        },
        {
            name: t('social.email'),
            url: 'mailto:dioonfirmansyah@gmail.com',
            icon: Mail,
            color: 'hover:text-red-400',
        },
    ];
    return (
        <footer className="relative w-full border-t border-black bg-lime-300" id="footer">
            <div className="w-full py-2">
                <TextLoop
                    marqueeText="Let's Create Something Together ✦ EMAIL ME ✦ Let's Create Something Together ✦ EMAIL ME ✦ Let's Create Something Together ✦ EMAIL ME ✦"
                    direction="left"
                    speed={4}
                    curveAmount={0}
                    className="flex flex-col items-center md:text-6xl"
                />
            </div>

            <div className="flex w-full items-center justify-between border-t border-black px-2">
                <p className="font-[QurovaBold] text-2xl">dionfirmansyah.</p>
                <div className="flex items-center space-x-3">
                    {socialLinks.map((social) => (
                        <Link
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group relative rounded-full p-2 transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color} before:absolute before:inset-0 before:scale-0 before:rounded-full before:bg-current before:opacity-0 before:transition-all before:duration-300 hover:before:scale-100 hover:before:opacity-10`}
                        >
                            <social.icon className="relative z-10 h-5 w-5" />
                            <span className="sr-only">{social.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}
