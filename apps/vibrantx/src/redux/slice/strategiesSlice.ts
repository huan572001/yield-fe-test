import { StrategiesAPI } from "@/services";
import {
  IParamsGetPosition,
  IParamsGetStrategies,
  IPositions,
  Strategies,
  tokensPrice,
} from "@/services/types";
import {
  calculateValue,
  calculateValueWithDecimals,
  getTokenInfo,
  getTokenPrice,
} from "@/utils/functions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export interface IUserPositions extends IPositions {
  amount: string;
  value: string;
  rewards: string;
}
export interface IAuthState {
  strategies: Strategies[];
  tokensPrice: tokensPrice[];
  userPositions: IUserPositions[];

  loadingStrategies: boolean;
  loadingTokensPrice: boolean;
  loadingUserPosition: boolean;
}

const initialState: IAuthState = {
  strategies: [],
  tokensPrice: [],
  userPositions: [],

  loadingStrategies: false,
  loadingTokensPrice: false,
  loadingUserPosition: false,
};

export const getStrategies = createAsyncThunk(
  "getStrategies",
  async (payload?: IParamsGetStrategies) => {
    try {
      const response = await StrategiesAPI.getStrategies({ ...payload });
      return response.data;
    } catch (error) {
      return [];
    }
  },
);

export const getPrice = createAsyncThunk("getPrice", async () => {
  try {
    const response = await StrategiesAPI.getPrice();
    return response.data;
  } catch (error) {
    return [];
  }
});

export const getPositions = createAsyncThunk(
  "getPositions",
  async (payload: IParamsGetPosition) => {
    try {
      const response = await StrategiesAPI.getUserPositions(payload);
      const positions = response.data
        .map((position) => {
          if (position && Number(position.positions[0]) !== 0) {
            const tokenInfo = getTokenInfo(position.positionToken);
            const amount = calculateValueWithDecimals(
              Number(position.positions[0]),
              tokenInfo?.decimals,
            );
            const tokenPrice = getTokenPrice(position.positionToken);
            const value = calculateValue(amount, tokenPrice);

            const rewardsInfo = getTokenInfo(position.rewardToken[0]);
            const rewards =
              position && position.positions[1] ? position.positions[1] : 0;
            const amountRewards = calculateValueWithDecimals(
              Number(rewards),
              rewardsInfo.decimals ?? 8,
            );
            const rewardsPrice = getTokenPrice(position.rewardToken[0]);
            const valueRewards = calculateValue(amountRewards, rewardsPrice);

            if (Number(value) > 0.01 || Number(valueRewards) > 0.01) {
              return {
                ...position,
                amount,
                value,
                rewards: valueRewards,
              };
            }
          }
          return null;
        })
        .filter((position) => position !== null);

      return positions as IUserPositions[];
    } catch (error) {
      return [];
    }
  },
);

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

    builder
      .addCase(getPositions.pending, (state) => {
        state.loadingUserPosition = true;
      })
      .addCase(getPositions.fulfilled, (state, action) => {
        state.loadingUserPosition = false;
        state.userPositions = action.payload;
      })
      .addCase(getPositions.rejected, (state) => {
        state.loadingUserPosition = false;
      });
  },
});

export default strategiesSlice.reducer;
