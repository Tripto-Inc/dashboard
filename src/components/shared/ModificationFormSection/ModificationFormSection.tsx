import { FC } from "react"
import { ModificationFormSectionProps } from "./types"

export const ModificationFormSection: FC<ModificationFormSectionProps> = (props) => {
    const {
        title,
        children,
        icon: Icon,
        headerExtraElements
    } = props

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-2">
                    <Icon className="text-blue-600" size={20} />
                    <h2 className="font-bold text-slate-800">{title}</h2>
                </div>
                {headerExtraElements}
            </div>
            {children}
        </div>
    )
}