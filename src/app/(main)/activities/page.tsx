import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb"
import { ActivityList } from "@/features/activity"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Activities',
}

const ActivitiesPage = () => {
    return (
        <div className="w-full flex flex-col">
            <div>
                <PageBreadcrumb currentPageTitle="Activities" className="mb-5" />
                <h3 className="text-3xl font-extrabold">
                    Activities
                </h3>
            </div>
            <ActivityList />
        </div>
    )
}

export default ActivitiesPage