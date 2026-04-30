import { FieldWithErrorSkeleton } from "@/components/shared/FieldWithError";
import { Skeleton } from "@/components/ui/skeleton";
import { Fragment, type FC } from "react";

export const ActivityTypeFormSkeleton: FC = () => {
    return (
        <Fragment>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <Skeleton className="h-9 w-60" />
                    <Skeleton className="h-6 min-w-75 w-full mt-1 rounded-sm" />
                </div>
                <Skeleton className="h-10 w-37" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                            <Skeleton className="h-6 w-45 rounded-sm" />
                            <Skeleton className="h-6 w-30 rounded-sm" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FieldWithErrorSkeleton />
                            <FieldWithErrorSkeleton />
                            <FieldWithErrorSkeleton />
                            <FieldWithErrorSkeleton />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col bg-white p-6 rounded-3xl border border-slate-200">
                    <Skeleton className="h-7 w-40 rounded-sm mb-2" />
                    <Skeleton className="h-5 w-full rounded-sm mb-1" />
                    <Skeleton className="h-5 w-3/5 rounded-sm mb-3" />
                    <Skeleton className="h-9 w-full mt-auto" />
                </div>
            </div>
        </Fragment>
    );
};