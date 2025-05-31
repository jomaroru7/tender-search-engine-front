import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface CpvState {
  cpvs: Record<string, string>;
}

const initialState: CpvState = {
  cpvs: {},
};

const cpvSlice = createSlice({
  name: 'cpv',
  initialState,
  reducers: {
    setCpvs(state, action: PayloadAction<Record<string, string>>) {
      state.cpvs = action.payload;
    },
  },
});

export const { setCpvs } = cpvSlice.actions;
export default cpvSlice.reducer;
