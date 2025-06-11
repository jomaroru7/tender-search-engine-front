import type { ReactNode } from "react"

type InfoPillProps = {
    text: string,
    dataTestId: string,
    icon?: ReactNode,
    textColor?: string,
    backgroundColor?: string,
}

const InfoPill = ({ text, icon, dataTestId, textColor, backgroundColor }: InfoPillProps) => {
    return (
        <div
            data-testid={dataTestId}
            className={`flex flex-row align-middle ${backgroundColor || "bg-slate-200"} ${textColor || "text-slate-700"} px-3 py-1 rounded-full font-medium w-fit`}>
            <span className="flex mr-1 items-center">{icon}</span>: {text}
        </div>
    )
}

export default InfoPill