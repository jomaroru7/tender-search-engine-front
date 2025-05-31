import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface CompanyData {
  name: string;
  location: string;
  budget: number;
  cpvs: string[];
}

const initialState: CompanyData = {
  name: '',
  location: '',
  budget: 0,
  cpvs: [],
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyData(state, action: PayloadAction<CompanyData>) {
      return action.payload;
    },
  },
});

export const { setCompanyData } = companySlice.actions;
export default companySlice.reducer;