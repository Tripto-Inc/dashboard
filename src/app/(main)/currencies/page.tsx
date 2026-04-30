import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb"
import { CurrencyList } from "@/features/currency"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Currencies',
}

const CurrenciesPage = () => {
    return (
        <div className="w-full flex flex-col">
            <div>
                <PageBreadcrumb currentPageTitle="Currencies" className="mb-5" />
                <h3 className="text-3xl font-extrabold">
                    Currencies
                </h3>
            </div>
            <CurrencyList />
        </div>
    )
}

export default CurrenciesPage