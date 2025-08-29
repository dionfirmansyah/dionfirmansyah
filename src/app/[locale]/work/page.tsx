import { getTranslations } from 'next-intl/server';
import { ProjectLists } from './ProjectLists';

export default async function WorkPage() {
    const t = await getTranslations('projects');

    return (
        <ProjectLists
            translations={{
                allwork: t('allwork'),
                'allwork-desc': t('allwork-desc'),
                location: t('location'),
                availableFor: t('availableFor'),
                newProjects: t('newProjects'),
                tech: t('tech'),
                viewProject: t('viewProject'),
                sourceCode: t('sourceCode'),
                'cta-1': t('cta-1'),
                'cta-2': t('cta-2'),
                'cta-3': t('cta-3'),
                'cta-4': t('cta-4'),
            }}
        />
    );
}

export async function generateMetadata() {
    const t = await getTranslations('projects');

    return {
        title: t('allwork'),
        description: t('allwork-desc'),
    };
}
