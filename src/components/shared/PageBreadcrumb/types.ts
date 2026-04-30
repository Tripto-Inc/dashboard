export interface PageBreadcrumbProps {
    pages?: Array<{
        route: string
        title: string
    }>
    className?: string
    hasHomePage?: boolean
    currentPageTitle: string
}

export interface PageBreadcrumbLoadingProps {
    className?: string
    crumbCount?: number
}