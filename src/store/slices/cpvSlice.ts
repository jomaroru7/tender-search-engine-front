import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface CpvState {
  // Mapa { códigoCPV: descripción, ... }
  cpvs: Record<string, string>;
}

const initialState: CpvState = {
  cpvs: {},
};

const cpvSlice = createSlice({
  name: 'cpv',
  initialState,
  reducers: {
    // payload: objeto { [code]: description }
    setCpvs(state, action: PayloadAction<Record<string, string>>) {
      state.cpvs = action.payload;
    },
  },
});

export const { setCpvs } = cpvSlice.actions;
export default cpvSlice.reducer;
