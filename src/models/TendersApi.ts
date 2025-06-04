export type getTendersRequest = {
    "invoicing": number,
    "place": string,
    "activity": string
}

export type getTendersResponse = {
    "Codigo_CPV": string[],
    "Contratacion": string,
    "Fecha_publicacion": string,
    "ID": string,
    "Importe_estimado": number,
    "Lugar_Ejecucion": string,
    "Plazo_limite": string,
    "Titulo": string,
    "URL": string,
    "score": number
}

export type getTenderRequest = {
    "ID": string
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