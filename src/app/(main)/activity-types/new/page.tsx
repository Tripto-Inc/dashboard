import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb"
import { ActivityTypeForm } from "@/features/activity-type"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'New Activity Type',
}

const ActivityTypeCreatePage = () => {
    return (
        <article className="mx-auto">
            <PageBreadcrumb
                pages={[
                    {
                        route: '/activity-types',
                        title: 'Activity Types'
                    }
                ]}
                className="mb-5"
                currentPageTitle="New"
            />
            <ActivityTypeForm />
        </article>
    )
}

export default ActivityTypeCreatePage