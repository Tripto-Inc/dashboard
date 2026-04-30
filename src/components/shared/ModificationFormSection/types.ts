import { Icon } from "@tabler/icons-react";
import { PropsWithChildren, ReactNode } from "react";

export interface ModificationFormSectionProps extends PropsWithChildren {
    icon: Icon
    title: string
    headerExtraElements?: ReactNode
}