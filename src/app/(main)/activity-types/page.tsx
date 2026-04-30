import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb"
import { ActivityTypeList } from "@/features/activity-type"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Activity Types',
}

const ActivityTypesPage = () => {
    return (
        <div className="w-full flex flex-col">
            <div>
                <PageBreadcrumb currentPageTitle="Activity Types" className="mb-5" />
                <h3 className="text-3xl font-extrabold">
                    Activity Types
                </h3>
            </div>
            <ActivityTypeList />
        </div>
    )
}

export default ActivityTypesPage