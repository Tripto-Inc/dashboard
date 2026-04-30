import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb"
import { CurrencyForm } from "@/features/currency"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'New Currency',
}

const CurrencyCreatePage = () => {
    return (
        <article className="mx-auto">
            <PageBreadcrumb
                pages={[
                    {
                        route: '/currencies',
                        title: 'Currencies'
                    }
                ]}
                className="mb-5"
                currentPageTitle="New"
            />
            <CurrencyForm />
        </article>
    )
}

export default CurrencyCreatePage