import { PageBreadcrumbLoading } from "@/components/shared/PageBreadcrumb"
import { CurrencyFormSkeleton } from "@/features/currency"

const CurrencyEditPageSkeleton = () => {
    return (
        <>
            <PageBreadcrumbLoading crumbCount={3} className="mb-5" />
            <CurrencyFormSkeleton />
        </>
    )
}

export default CurrencyEditPageSkeleton