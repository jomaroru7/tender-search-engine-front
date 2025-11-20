import type { getTenderRequest, getTenderResponse } from "../../models/TendersApi";
import type { TenderDetailData } from "../../models/TendersFront";
import { requestWithoutAuth } from "../_http";

/**
 * Low-level call to /get-tender (sin autenticación)
 */
export const getTender = async ({ ID }: getTenderRequest): Promise<getTenderResponse> => {
  const res = await requestWithoutAuth<getTenderResponse>("/get-tender", {
    method: "POST",
    body: JSON.stringify({ ID }),
  });

  if (res.status === 200) return res.data as getTenderResponse;
  throw new Error(res.errors ? JSON.stringify(res.errors) : `Server error: ${res.status}`);
};

/**
 * Map to UI detail shape
 */
export const getTenderDetailData = async ({ ID }: getTenderRequest): Promise<TenderDetailData> => {
  const tender = await getTender({ ID });
  return {
    id: tender.ID,
    publicationDate: tender.Fecha_publicacion,
    tenderName: tender.Contratacion,
    endDate: tender.Plazo_limite,
    budget: tender.Importe_estimado,
    resume: tender.Titulo,
    location: tender.Lugar_Ejecucion,
    CPVCodes: tender.Codigo_CPV,
    url: tender.URL,
    budgetNoIva: tender.Presupuesto_sin_IVA,
    budgetTotal: tender.Importe_total,
    record: tender.Expediente,
    startDate: tender.Fecha_inicio,
    contractType: tender.Tipo_contrato,
    procedureType: tender.Tipo_procedimiento,
    lotsNumber: tender.Número_lotes,
    warrantyType: tender.Tipo_garantia,
    administrativeDocumexnt: tender.Pliego_admvo,
    specificationsSheet: tender.Pliego_prescripciones,
  };
};