import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface CompanyData {
  email: string;
  name: string;
  location: string;
  budget: number;
  description: string;
}

const initialState: CompanyData = (() => {
  const stored = localStorage.getItem("companyData");
  if (stored) return JSON.parse(stored);
  return {
    email: '',
    name: '',
    location: '',
    budget: 0,
    description: '',
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