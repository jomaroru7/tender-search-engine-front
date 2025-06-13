import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTenderDetailData } from "../services/tenders/tendersService";
import type { TenderDetailData } from "../models/TendersFront";

const TenderDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [tender, setTender] = useState<TenderDetailData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const lastDash = id.lastIndexOf("-");
        const idRealEncoded = id.substring(lastDash + 1);
        const idReal = decodeURIComponent(idRealEncoded);

        getTenderDetailData({ ID: idReal })
            .then(setTender)
            .catch(() => navigate("/"))
            .finally(() => setLoading(false));
    }, [id, navigate]);

    if (loading) return <div className="p-8 text-center">Cargando...</div>;
    if (!tender) return <div className="p-8 text-center">No se encontró la licitación.</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white/80 backdrop-blur shadow-lg rounded-2xl border border-slate-200 mt-10">
            <h1 className="text-3xl font-bold mb-6 text-slate-800" data-testid="tender-name">{tender.tenderName}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-slate-700 mb-2">Información general</h2>
                    <ul className="text-slate-700 space-y-1">
                        <li data-testid="tender-record"><span className="font-semibold">Expediente:</span> {tender.record}</li>
                        <li data-testid="tender-contract-type"><span className="font-semibold">Tipo de contrato:</span> {tender.contractType}</li>
                        <li data-testid="tender-procedure-type"><span className="font-semibold">Tipo de procedimiento:</span> {tender.procedureType}</li>
                        <li data-testid="tender-lots-number"><span className="font-semibold">Nº de lotes:</span> {tender.lotsNumber}</li>
                        <li data-testid="tender-cpvs"><span className="font-semibold">CPVs:</span> {tender.CPVCodes.join(", ")}</li>
                        <li data-testid="tender-warranty">
                            <span className="font-semibold">Garantía:</span>{" "}
                            {Array.isArray(tender.warrantyType)
                                ? tender.warrantyType.join(", ")
                                : tender.warrantyType
                                    ? tender.warrantyType
                                    : <span className="text-slate-400">No disponible</span>
                            }
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-slate-700 mb-2">Fechas</h2>
                    <ul className="text-slate-700 space-y-1">
                        <li data-testid="tender-publication-date"><span className="font-semibold">Publicación:</span> {tender.publicationDate}</li>
                        <li data-testid="tender-start-date"><span className="font-semibold">Inicio:</span> {tender.startDate}</li>
                        <li data-testid="tender-end-date"><span className="font-semibold">Fin:</span> {tender.endDate}</li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-slate-700 mb-2">Presupuestos</h2>
                    <ul className="text-slate-700 space-y-1">
                        <li data-testid="tender-budget-no-iva"><span className="font-semibold">Presupuesto sin IVA:</span> {tender.budgetNoIva?.toLocaleString()} €</li>
                        <li data-testid="tender-budget-total"><span className="font-semibold">Presupuesto total:</span> {tender.budgetTotal?.toLocaleString()} €</li>
                        <li data-testid="tender-budget"><span className="font-semibold">Presupuesto estimado:</span> {tender.budget?.toLocaleString()} €</li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-slate-700 mb-2">Otros datos</h2>
                    <ul className="text-slate-700 space-y-1">
                        <li data-testid="tender-location"><span className="font-semibold">Localización:</span> {tender.location}</li>
                        <li data-testid="tender-url">
                            <span className="font-semibold">Enlace oficial:</span>{" "}
                            <a
                                href={tender.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline break-all"
                                data-testid="tender-url-link"
                            >
                                {tender.url}
                            </a>
                        </li>
                        <li data-testid="tender-administrative-doc">
                            <span className="font-semibold">Pliego administrativo:</span>{" "}
                            {tender.administrativeDocumexnt ? (
                                <a
                                    href={tender.administrativeDocumexnt}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline break-all"
                                    data-testid="tender-administrative-doc-link"
                                >
                                    Descargar
                                </a>
                            ) : (
                                <span className="text-slate-400">No disponible</span>
                            )}
                        </li>
                        <li data-testid="tender-specifications-sheet">
                            <span className="font-semibold">Pliego de prescripciones:</span>{" "}
                            {tender.specificationsSheet ? (
                                <a
                                    href={tender.specificationsSheet}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline break-all"
                                    data-testid="tender-specifications-sheet-link"
                                >
                                    Descargar
                                </a>
                            ) : (
                                <span className="text-slate-400">No disponible</span>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-2">Resumen</h2>
                <p className="text-slate-700" data-testid="tender-resume">{tender.resume}</p>
            </div>
            <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition"
                onClick={() => navigate(-1)}
            >
                Volver
            </button>
        </div>
    );
};

export default TenderDetailPage;