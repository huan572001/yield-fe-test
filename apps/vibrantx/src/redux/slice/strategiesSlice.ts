import { StrategiesAPI } from "@/services";
import { Strategies } from "@/services/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IAuthState {
  strategies: Strategies[];

  loadingStrategies: boolean;
}

const initialState: IAuthState = {
  strategies: [],

  loadingStrategies: false,
};

export const getStrategies = createAsyncThunk("getStrategies", async () => {
  try {
    const response = await StrategiesAPI.getStrategies();
    return response.data;
  } catch (error) {
    return [];
  }
});

export const strategiesSlice = createSlice({
  name: "strategies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStrategies.pending, (state) => {
        state.loadingStrategies = true;
      })
      .addCase(getStrategies.fulfilled, (state, action) => {
        state.loadingStrategies = false;
        state.strategies = action.payload;
      })
      .addCase(getStrategies.rejected, (state) => {
        state.loadingStrategies = false;
      });
  },
});

export default strategiesSlice.reducer;
