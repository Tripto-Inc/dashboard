import { Skeleton } from "@/components/ui/skeleton"
import clsx from "clsx"
import { LucideChevronRight } from "lucide-react"
import { FC, Fragment } from "react"
import { PageBreadcrumbLoadingProps } from "./types"
import { generateRandomWidth } from "./utils"

export const PageBreadcrumbLoading: FC<PageBreadcrumbLoadingProps> = (props) => {
    const {
        className,
        crumbCount = 2
    } = props
    const crumbs = Array.from({ length: crumbCount })

    return (
        <div className={clsx("flex items-center flex-wrap gap-1.5 sm:gap-2.5 col-span-full", className)}>
            {crumbs.map((_, index) => {
                const isLastIndex = index === crumbCount - 1

                return (
                    <Fragment key={index}>
                        <Skeleton className="h-5 rounded-sm" style={{
                            width: generateRandomWidth(),
                            minWidth: generateRandomWidth()
                        }} />
                        {!isLastIndex && <LucideChevronRight size={14} className="text-zinc-500" />}
                    </Fragment>
                )
            })}
        </div>
    )
}