import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CardData } from "../../models/TendersFront";

type TenderFilters = {
  invoicing: number;
  place: string;
  activity: string;
};

interface TenderState {
  tenders: CardData[];
  totalResults: number;
  page: number;
  pageSize: number;
  filters: TenderFilters;
}

const initialState: TenderState = {
  tenders: [],
  totalResults: 0,
  page: 1,
  pageSize: 10,
  filters: { invoicing: 0, place: "", activity: "" },
};

const tenderSlice = createSlice({
  name: "tender",
  initialState,
  reducers: {
    setTendersData: (
      state,
      action: PayloadAction<{
        tenders: CardData[];
        totalResults: number;
        page: number;
        pageSize: number;
        filters: { invoicing: number; place: string; activity: string };
      }>
    ) => {
      state.tenders = action.payload.tenders;
      state.totalResults = action.payload.totalResults;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.filters = action.payload.filters;
    },
  },
});

export const { setTendersData } = tenderSlice.actions;
export default tenderSlice.reducer;