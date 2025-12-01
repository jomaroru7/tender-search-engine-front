export type CardData = {
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

export type getTenderResponse = {
    'ID': string,
    'Titulo': string,
    'Fecha_publicacion': string,
    'URL': string,
    'Expediente': string,
    'Presupuesto_sin_IVA': number,
    'Importe_estimado': number,
    'Importe_total': number,
    'Fecha_inicio': string,
    'Lugar_Ejecucion': string,
    'Codigo_CPV': string[],
    'Tipo_contrato': string,
    'Tipo_procedimiento': string,
    'Contratacion': string,
    'Número_lotes': number,
    'Tipo_garantia': string[],
    'Pliego_admvo': string,
    'Pliego_prescripciones': string,
    'Plazo_limite': string
}

export type TenderDetailData = {
    id: string,
    tenderName: string,
    publicationDate: string,
    url: string,
    budgetNoIva: number,
    budgetTotal: number,
    record: string,
    startDate: string,
    contractType: string,
    procedureType: string,
    endDate: string,
    lotsNumber: number,
    warrantyType: string[],
    budget: number,
    resume: string,
    location: string,
    CPVCodes: string[],
    administrativeDocumexnt: string,
    specificationsSheet: string,
}