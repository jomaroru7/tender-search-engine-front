export type getTendersRequest = {
    invoicing: number,
    place: string,
    activity: string,
    page?: number,
    page_size?: number,
    cpv_list?: string[] | number[],
    exact_place?: boolean
}

export type tendersResults = {
    Codigo_CPV: string[],
    Contratacion: string,
    Fecha_publicacion: string,
    ID: string,
    Importe_estimado: number,
    Lugar_Ejecucion: string,
    Plazo_limite: string,
    Titulo: string,
    URL: string,
    score: number
}

export type getTendersResponse = {
    page: number,
    page_size: number,
    total_results: number,
    results: tendersResults[]
}

export type getTenderRequest = {
    ID: string
}

export type getTenderResponse = {
    ID: string,
    Titulo: string,
    Fecha_publicacion: string,
    URL: string,
    Expediente: string,
    Presupuesto_sin_IVA: number,
    Importe_estimado: number,
    Importe_total: number,
    Fecha_inicio: string,
    Lugar_Ejecucion: string,
    Codigo_CPV: string[],
    Tipo_contrato: string,
    Tipo_procedimiento: string,
    Contratacion: string,
    Número_lotes: number,
    Tipo_garantia: string[],
    Pliego_admvo: string,
    Pliego_prescripciones: string,
    Plazo_limite: string
}