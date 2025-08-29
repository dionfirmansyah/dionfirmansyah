// Loading Skeleton Component
export default function ProjectSkeleton() {
    return (
        <div className="animate-pulse bg-white">
            <div className="px-4 py-4 lg:px-8 lg:py-8">
                <div className="flex items-center justify-between">
                    <div className="flex flex-1 items-start space-x-3 lg:items-center lg:space-x-6">
                        <div className="h-4 w-12 rounded bg-gray-200 lg:h-6 lg:w-16"></div>
                        <div className="min-w-0 flex-1">
                            <div className="mb-2 h-6 w-3/4 rounded bg-gray-200 lg:h-8"></div>
                            <div className="h-3 w-1/2 rounded bg-gray-200 lg:h-4"></div>
                        </div>
                    </div>
                    <div className="h-5 w-5 rounded bg-gray-200 lg:h-6 lg:w-6"></div>
                </div>
            </div>
        </div>
    );
}
