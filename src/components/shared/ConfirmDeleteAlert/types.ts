import { PropsWithChildren } from "react";

export interface ConfirmDeleteAlertProps extends PropsWithChildren {
    onDelete: () => void
}