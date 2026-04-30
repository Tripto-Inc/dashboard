import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { FC, Fragment } from "react"
import { PageBreadcrumbProps } from "./types"

export const PageBreadcrumb: FC<PageBreadcrumbProps> = ({
    pages = [],
    className = '',
    currentPageTitle,
    hasHomePage = true,
}) => {
    const allPages = [
        ...(hasHomePage ? [{ title: "Tripto", route: "/" }] : []),
        ...pages,
    ]

    return (
        <Breadcrumb className={className}>
            <BreadcrumbList>
                {allPages.map((page, index) => (
                    <Fragment key={`${page.title}-${page.route}`}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={page.route}>
                                {page.title}
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        {index < allPages.length - 1 && <BreadcrumbSeparator />}
                    </Fragment>
                ))}

                {allPages.length > 0 && <BreadcrumbSeparator />}

                <BreadcrumbItem>
                    <BreadcrumbPage>{currentPageTitle}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}