type SortItem = {
    id: string;
    desc: boolean;
};

type SortOrder = "asc" | "desc";

const buildNestedSortObject = (
    path: string[],
    sortOrder: SortOrder
): Record<string, unknown> => {
    return path.reduceRight<Record<string, unknown>>(
        (acc, key) => ({ [key]: acc }),
        sortOrder as unknown as Record<string, unknown>
    );
};

export const buildPrismaSingleOrderBy = <TOrderBy>(
    sort: SortItem | undefined,
    fallback: TOrderBy
): TOrderBy => {
    if (!sort?.id) return fallback;

    const sortOrder: SortOrder = sort.desc ? "desc" : "asc";

    return buildNestedSortObject(
        sort.id.split("_"),
        sortOrder
    ) as TOrderBy;
};