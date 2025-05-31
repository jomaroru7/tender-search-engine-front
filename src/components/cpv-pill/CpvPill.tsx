import { useSelector } from "react-redux";
import type { RootState } from "../../store";

type CpvPillProps = {
    cpvCode: string
}

const CpvPill = ({ cpvCode }: CpvPillProps) => {
    const description = useSelector((state: RootState) => state.cpv.cpvs[cpvCode]);

    return (
        <span className="relative group">
            <span
                className="bg-slate-200 text-slate-700 p-1 rounded text-xs font-mono self-center cursor-pointer"
            >
                {cpvCode}
            </span>
            {description && (
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-xs bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 whitespace-pre-line">
                    {description}
                </span>
            )}
        </span>
    )
}

export default CpvPill