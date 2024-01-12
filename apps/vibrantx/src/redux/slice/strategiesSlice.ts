import { StrategiesAPI } from "@/services";
import { Strategies, tokensPrice } from "@/services/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IAuthState {
  strategies: Strategies[];
  tokensPrice: tokensPrice[];

  loadingStrategies: boolean;
  loadingTokensPrice: boolean;
}

const initialState: IAuthState = {
  strategies: [],
  tokensPrice: [],

  loadingStrategies: false,
  loadingTokensPrice: false,
};

export const getStrategies = createAsyncThunk("getStrategies", async () => {
  try {
    const response = await StrategiesAPI.getStrategies();
    return response.data;
  } catch (error) {
    return [];
  }
});

export const getPrice = createAsyncThunk("getPrice", async () => {
  try {
    const response = await StrategiesAPI.getPrice();
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

    builder
      .addCase(getPrice.pending, (state) => {
        state.loadingTokensPrice = true;
      })
      .addCase(getPrice.fulfilled, (state, action) => {
        state.loadingTokensPrice = false;
        state.tokensPrice = action.payload;
      })
      .addCase(getPrice.rejected, (state) => {
        state.loadingTokensPrice = false;
      });
  },
});

export default strategiesSlice.reducer;
