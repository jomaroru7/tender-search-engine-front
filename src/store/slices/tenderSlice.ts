import { createSlice } from "@reduxjs/toolkit";
import type { CardData } from "../../models/TendersFront";

interface TenderState {
  tenders: CardData[];
}

const initialState: TenderState = {
  tenders: [],
};

const tenderSlice = createSlice({
  name: "tender",
  initialState,
  reducers: {
    setTenders(state, action) {
      state.tenders = action.payload;
    },
    clearTenders(state) {
      state.tenders = [];
    },
  },
});

export const { setTenders, clearTenders } = tenderSlice.actions;
export default tenderSlice.reducer;