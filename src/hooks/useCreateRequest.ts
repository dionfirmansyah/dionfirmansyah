import { i, id, init, InstaQLEntity } from '@instantdb/react';

const APP_ID = process.env.NEXT_PUBLIC_INSTANTDB_APP_ID ?? '';

const schema = i.schema({
    entities: {
        $files: i.entity({
            path: i.string().unique().indexed(),
            url: i.string().optional(),
        }),
        $users: i.entity({
            email: i.string().unique().indexed().optional(),
        }),
        descriptions: i.entity({
            english: i.string(),
            indonesia: i.string(),
            name: i.string().indexed(),
        }),
        featured_works: i.entity({
            order: i.number().unique().indexed(),
        }),
        images: i.entity({
            isShowcase: i.boolean().indexed().optional(),
        }),
        project_requests: i.entity({
            company: i.string().optional(),
            createdAt: i.number().optional(),
            email: i.string().optional(),
            message: i.string().optional(),
            name: i.string().optional(),
        }),
        projects: i.entity({
            category: i.string(),
            client: i.string().optional(),
            githubUrl: i.string().optional(),
            liveUrl: i.string().optional(),
            slug: i.string().unique().indexed(),
            status: i.string(),
            title: i.string().indexed(),
            year: i.number().indexed().optional(),
        }),
        request_projects: i.entity({
            company: i.string().optional(),
            createdAt: i.date().indexed().optional(),
            email: i.string().indexed(),
            message: i.string().optional(),
            name: i.string(),
        }),
        request_demo: i.entity({
            nameOrCompany: i.string(),
            email: i.string().indexed(),
            message: i.string().optional(),
            projectName: i.string().indexed(),
            date: i.string(),
            createdAt: i.date().indexed().optional(),
        }),
        technologies: i.entity({
            name: i.string().indexed(),
        }),
    },
    links: {
        featured_worksProjects: {
            forward: {
                on: 'featured_works',
                has: 'one',
                label: 'projects',
            },
            reverse: {
                on: 'projects',
                has: 'many',
                label: 'featured_works',
            },
        },
        images$files: {
            forward: {
                on: 'images',
                has: 'many',
                label: '$files',
            },
            reverse: {
                on: '$files',
                has: 'many',
                label: 'images',
            },
        },
        projectsDescriptions: {
            forward: {
                on: 'projects',
                has: 'one',
                label: 'descriptions',
            },
            reverse: {
                on: 'descriptions',
                has: 'many',
                label: 'projects',
            },
        },
        projectsImages: {
            forward: {
                on: 'projects',
                has: 'many',
                label: 'images',
            },
            reverse: {
                on: 'images',
                has: 'many',
                label: 'projects',
            },
        },
        projectsTechnologies: {
            forward: {
                on: 'projects',
                has: 'many',
                label: 'technologies',
            },
            reverse: {
                on: 'technologies',
                has: 'many',
                label: 'projects',
            },
        },
    },
    rooms: {},
});

const db = init({ appId: APP_ID, schema });

type RequestProject = InstaQLEntity<typeof schema, 'request_projects'>;
type RequestDemo = InstaQLEntity<typeof schema, 'request_demo'>;
export function useCreateRequest() {
    const addRequestProject = (formData: RequestProject) => {
        db.transact(
            db.tx.request_projects[id()].create({
                ...formData,
            }),
        );
    };

    const addRequestDemo = (formData: RequestDemo) => {
        db.transact(
            db.tx.request_demo[id()].create({
                ...formData,
            }),
        );
    };

    return {
        addRequestProject,
        addRequestDemo,
    };
}
