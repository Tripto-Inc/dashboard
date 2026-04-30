"use client"

import { Field, FieldLabel } from "@/components/ui/field"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { MouseEvent } from "react"
import { DataTablePaginationProps } from "./types"

export const DataTablePagination = <TData,>({
    table,
    total,
}: DataTablePaginationProps<TData>) => {
    const { pageIndex, pageSize } = table.getState().pagination
    const pageCount = Math.ceil(total / pageSize)

    const visiblePages = Array.from({ length: pageCount }, (_, i) => i + 1)

    const handleClick = (e: MouseEvent<HTMLAnchorElement>, page: number) => {
        e.preventDefault()
        table.setPageIndex(page - 1)
    }

    const startRow = pageIndex * pageSize + 1
    const endRow = Math.min((pageIndex + 1) * pageSize, total)

    return (
        <div className="flex justify-end py-2 gap-4">
            {/* Rows per page selector */}
            <Field orientation="horizontal">
                <FieldLabel htmlFor="select-rows-per-page" className="flex-none!">Rows per page</FieldLabel>
                <Select
                    value={String(pageSize)}
                    onValueChange={(value) => {
                        table.setPageSize(Number(value))
                        table.setPageIndex(0)
                    }}
                >
                    <SelectTrigger className="w-20" id="select-rows-per-page">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="start">
                        <SelectGroup>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {/* Total rows display */}
                <div className="text-sm text-muted-foreground">
                    {startRow}-{endRow} of {total}
                </div>
            </Field>

            {/* Pagination */}
            <Pagination className="mx-0! w-fit!">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                if (pageIndex > 0) handleClick(e, pageIndex)
                            }}
                            className={pageIndex === 0 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>

                    {visiblePages.map((page) => {
                        if (
                            page === 1 ||
                            page === pageCount ||
                            (page >= pageIndex + 1 - 2 && page <= pageIndex + 1 + 2)
                        ) {
                            return (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        href="#"
                                        isActive={pageIndex + 1 === page}
                                        onClick={(e) => handleClick(e, page)}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        } else if (
                            page === pageIndex + 1 - 3 ||
                            page === pageIndex + 1 + 3
                        ) {
                            return (
                                <PaginationItem key={`ellipsis-${page}`}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )
                        }
                        return null
                    })}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                if (pageIndex < pageCount - 1) handleClick(e, pageIndex + 2)
                            }}
                            className={pageIndex === pageCount - 1 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}