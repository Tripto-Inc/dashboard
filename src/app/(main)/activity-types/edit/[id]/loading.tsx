import { PageBreadcrumbLoading } from "@/components/shared/PageBreadcrumb"
import { ActivityTypeFormSkeleton } from "@/features/activity-type"

const ActivityTypeEditPageSkeleton = () => {
    return (
        <>
            <PageBreadcrumbLoading crumbCount={3} className="mb-5" />
            <ActivityTypeFormSkeleton />
        </>
    )
}

export default ActivityTypeEditPageSkeleton