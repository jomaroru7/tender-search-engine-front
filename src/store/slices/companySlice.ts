import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface CompanyData {
  name: string;
  location: string;
  budget: number;
  cpvs: string[];
}

const initialState: CompanyData = (() => {
  const stored = localStorage.getItem("companyData");
  if (stored) return JSON.parse(stored);
  return {
    name: '',
    location: '',
    budget: 0,
    cpvs: [],
  };
})();

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyData(_state, action: PayloadAction<CompanyData>) {
      localStorage.setItem("companyData", JSON.stringify(action.payload));
      return action.payload;
    },
  },
});

export const { setCompanyData } = companySlice.actions;
export default companySlice.reducer;