import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAuthState {
  token: string | null;
  username: string | null;
}

const initialState: IAuthState = {
  token: null,
  username: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUsername: (state, action: PayloadAction<string | null>) => {
      state.username = action.payload;
    },
  },
});

export const { setToken, setUsername } = authSlice.actions;

export default authSlice.reducer;
