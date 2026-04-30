"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { TableCell, TableRow } from "@/components/ui/table"


export const DataTableSkeletonRow = ({ columns }: { columns: number }) => {
    return (
        <TableRow>
            {Array.from({ length: columns }).map((_, idx) => (
                <TableCell key={idx} className="p-4">
                    <Skeleton className="h-8 w-full rounded-md" />
                </TableCell>
            ))}
        </TableRow>
    )
}