'use client';

import { GrMoney } from "react-icons/gr";
import InfoPill from "../info-pill/InfoPill"
import { LuCalendarClock } from "react-icons/lu";
import { MdLocationPin } from "react-icons/md";
import CpvPill from "../cpv-pill/CpvPill";
import ScoreGraph from "../score-graph/ScoreGraph";
import Link from "next/link";
import { MouseEvent } from "react";

type TenderCardProps = {
    id: string,
    tenderName: string,
    endDate: string,
    budget: number,
    resume: string,
    location: string,
    CPVCodes: string[],
    score: number,
    scoreBreakdown?: {
        score_activity?: number;
        score_invoicing?: number;
        score_place?: number;
    }
}

// Generar un hash estable basado en el ID
function generateStableHash(id: string): string {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        const char = id.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convertir a entero de 32 bits
    }
    return Math.abs(hash).toString(36).substring(0, 6);
}

const TenderCard = ({ id, tenderName, endDate, budget, resume, location, CPVCodes, score = 0, scoreBreakdown }: TenderCardProps) => {
    const hash = generateStableHash(id);
    const url = `/tender/${hash}-${encodeURIComponent(id)}`;
    
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        // Si es clic con botón central, ctrl+clic, cmd+clic, o clic derecho
        // dejamos que el navegador maneje el comportamiento nativo
        if (e.button === 1 || e.ctrlKey || e.metaKey) {
            return;
        }
    };

    const handleAuxClick = (e: MouseEvent<HTMLAnchorElement>) => {
        // Botón central del ratón
        if (e.button === 1) {
            e.preventDefault();
            window.open(url, '_blank');
        }
    };

    return (
        <Link 
            href={url} 
            className="block h-full cursor-pointer"
            onClick={handleClick}
            onAuxClick={handleAuxClick}
        >
            <article
                data-testid="tender-card"
                className="h-full bg-white shadow-lg rounded-3xl p-6 mb-6 border border-gray-200 transition-transform hover:scale-105 hover:shadow-2xl flex flex-col justify-between overflow-visible"
            >
                <header className="flex flex-col gap-2 pb-4 border-b border-gray-100 mb-4">
                    <h1 data-testid="tender-name" className="text-2xl font-bold text-slate-800">{tenderName}</h1>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                        <InfoPill text={`${endDate}`} icon={<LuCalendarClock />} dataTestId="tender-end-date" backgroundColor="bg-orange-100" textColor="text-orange-700" />
                        <InfoPill text={`${new Intl.NumberFormat("es-ES").format(budget)}€`} icon={<GrMoney />} dataTestId="tender-budget" backgroundColor="bg-green-100" textColor="text-green-700" />
                        <InfoPill text={`${location}`} icon={<MdLocationPin />} dataTestId="tender-location" backgroundColor="bg-blue-100" textColor="text-blue-700" />
                    </div>
                </header>

                <p data-testid="tender-resume" className="pb-4 text-slate-700">{resume}</p>

                <footer data-testid="tender-cpv-codes" className="pt-2 border-t border-gray-100 flex gap-4 items-center">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                        <p className="whitespace-nowrap shrink-0">CPVs:</p>
                        <div
                            className="flex gap-2 overflow-x-auto overflow-y-hidden min-w-0 pr-2"
                            aria-label="Lista de CPVs"
                            data-testid="cpv-list-scroll"
                        >
                            {[...new Set(CPVCodes)].map((CPVCode) => (
                                <CpvPill key={CPVCode} cpvCode={CPVCode} />
                            ))}
                        </div>
                    </div>
                    <div data-testid="tender-score" className="flex items-center gap-1 ml-4 shrink-0 min-w-[72px]">
                        <ScoreGraph 
                            score={score} 
                            max={5} 
                            scoreBreakdown={scoreBreakdown}
                        />
                    </div>
                </footer>
            </article>
        </Link>
    )
}

export default TenderCard
