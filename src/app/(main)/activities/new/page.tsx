import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb"
import { ActivityForm } from "@/features/activity"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'New Activity',
}

const ActivityCreatePage = () => {
    return (
        <article className="mx-auto">
            <PageBreadcrumb
                pages={[
                    {
                        route: '/activities',
                        title: 'Activities'
                    }
                ]}
                className="mb-5"
                currentPageTitle="New"
            />
            <ActivityForm />
        </article>
    )
}

export default ActivityCreatePage