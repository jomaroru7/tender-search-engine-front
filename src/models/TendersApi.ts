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