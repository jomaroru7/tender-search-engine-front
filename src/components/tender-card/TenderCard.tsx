import { GrMoney } from "react-icons/gr";
import InfoPill from "../info-pill/InfoPill"
import { LuCalendarClock } from "react-icons/lu";
import { MdLocationPin } from "react-icons/md";
import CpvPill from "../cpv-pill/CpvPill";
import ScoreGraph from "../score-graph/ScoreGraph";

type TenderCardProps = {
    tenderName: string,
    endDate: string,
    budget: number,
    resume: string,
    location: string,
    CPVCodes: string[],
    score: number
}

const TenderCard = ({ tenderName, endDate, budget, resume, location, CPVCodes, score = 0 }: TenderCardProps) => {
    const normalizedScore = Math.round(score * 5 * 100) / 100;
    return (
        <article
            data-testid="tender-card"
            className="bg-white shadow-lg rounded-3xl p-6 mb-6 border border-gray-200 transition-transform hover:scale-105 hover:shadow-2xl flex flex-col justify-between"
        >
            <header className="flex flex-col gap-2 pb-4 border-b border-gray-100 mb-4">
                <h1 data-testid="tender-name" className="text-2xl font-bold text-slate-800">{tenderName}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                    <InfoPill text={`${endDate}`} icon={<LuCalendarClock />} dataTestId="tender-end-date" backgroundColor="bg-orange-100" textColor="text-orange-700" />
                    <InfoPill text={`${budget.toLocaleString()}€`} icon={<GrMoney />} dataTestId="tender-budget" backgroundColor="bg-green-100" textColor="text-green-700" />
                    <InfoPill text={`${location}`} icon={<MdLocationPin />} dataTestId="tender-location" backgroundColor="bg-blue-100" textColor="text-blue-700" />
                </div>
            </header>
            <main className="pb-4">
                <p data-testid="tender-resume" className="text-slate-700">{resume}</p>
            </main>
            <footer data-testid="tender-cpv-codes" className="pt-2 border-t border-gray-100 flex flex-row justify-between items-end">
                <div className="flex flex-wrap gap-2 flex-5">
                    <p>CPVs:</p>
                    {[...new Set(CPVCodes)].map((CPVCode) => (
                        <CpvPill key={CPVCode} cpvCode={CPVCode} />
                    ))}
                </div>
                <div data-testid="tender-score" className="flex items-end gap-1 mt-2 flex-1">
                    <ScoreGraph score={score} max={5} />
                </div>
            </footer>
        </article>
    )
}

export default TenderCard