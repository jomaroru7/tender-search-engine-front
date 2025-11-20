import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CompanyData {
  email: string;
  name: string;
  location: string;
  budget: number;
  description: string;
}

const initialState: CompanyData = (() => {
  // Solo acceder a localStorage en el cliente
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem("companyData");
    if (stored) return JSON.parse(stored);
  }
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
    setCompanyData: (state, action: PayloadAction<CompanyData>) => {
      Object.assign(state, action.payload);
      // Solo guardar en localStorage en el cliente
      if (typeof window !== 'undefined') {
        localStorage.setItem('companyData', JSON.stringify(action.payload));
      }
    },
    clearCompanyData: (state) => {
      Object.assign(state, initialState);
      // Solo limpiar localStorage en el cliente
      if (typeof window !== 'undefined') {
        localStorage.removeItem('companyData');
      }
    },
  },
});

export const { setCompanyData, clearCompanyData } = companySlice.actions;
export default companySlice.reducer;