import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CardData } from "../../models/TendersFront";

type TenderFilters = {
  invoicing: number;
  place: string;
  activity: string;
  cpv_list: string[];
  exact_place: boolean;
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
  filters: { 
    invoicing: 0, 
    place: "", 
    activity: "",
    cpv_list: [],
    exact_place: false
  },
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
        filters: TenderFilters;
      }>
    ) => {
      state.tenders = action.payload.tenders;
      state.totalResults = action.payload.totalResults;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.filters = action.payload.filters;
    },
    clearTendersData: (state) => {
      state.tenders = [];
      state.totalResults = 0;
      state.page = 1;
      state.pageSize = 10;
      state.filters = { 
        invoicing: 0, 
        place: "", 
        activity: "",
        cpv_list: [],
        exact_place: false
      };
    },
  },
});

export const { setTendersData, clearTendersData } = tenderSlice.actions;
export default tenderSlice.reducer;