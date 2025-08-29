import { useInstantDB } from './useInstantDB';

export function useProject() {
    const { db } = useInstantDB();

    const defaultState = {
        data: null,
        isLoading: true,
        error: null,
    };

    const queryResult = db
        ? db.useQuery({
              projects: {
                  $: {
                      order: {
                          serverCreatedAt: 'desc',
                      },
                  },
                  images: {
                      $files: {},
                  },
                  descriptions: {},
                  technologies: {},
              },
              featured_works: {
                  projects: {
                      descriptions: {},
                      technologies: {},
                      images: {
                          $: {
                              where: {
                                  isShowcase: true,
                              },
                          },
                          $files: {},
                      },
                  },
                  $: {
                      order: {
                          order: 'desc',
                      },
                  },
              },
          })
        : defaultState;

    const { data, isLoading, error } = queryResult;

    const featured_works =
        data?.featured_works?.flatMap((item) => {
            if (!item?.projects || !Array.isArray(item.projects)) {
                console.warn('item.projects is not an array:', item?.projects);
                return [];
            }

            return item.projects.map((project) => ({
                ...project,
                showcaseImages: Array.isArray(project?.images)
                    ? project.images.filter((img) => img?.isShowcase).flatMap((img) => img?.$files || [])
                    : [],
            }));
        }) ?? [];

    const allWorks =
        data?.projects?.map((item) => ({
            id: item.id,
            title: item.title,
            descriptions: {
                indonesia: item.descriptions?.[0]?.indonesia ?? '',
                english: item.descriptions?.[0]?.english ?? '',
            },
            slug: item.slug,
            category: item.category,
            client: item.client,
            status: item.status,
            year: item.year,
            githubUrl: item.githubUrl,
            liveUrl: item.liveUrl,
            imgUrl: item.images?.flatMap((img) => img.$files).map((f) => f.url) ?? [],
            technologies: item.technologies?.map((t) => t.name) ?? [],
        })) ?? [];

    return {
        allWorks,
        featured_works,
        isLoading: isLoading,
        error: error,
    };
}
