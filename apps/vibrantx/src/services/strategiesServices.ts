import { request } from "@/config/request";
import axios from "axios";
import {
  HistoryStratragis,
  IParamsGetPosition,
  IParamsGetStrategies,
  IPositions,
  IResponseCoingecko,
  IWithdrawInfo,
  Strategies,
  tokensPrice,
} from "./types";

export const StrategiesAPI = {
  getStrategies: async (params?: IParamsGetStrategies) => {
    return await request.get<Strategies[]>(
      `/api/v1/strategies?mode=${params?.mode}&protocol=${params?.protocol}`,
    );
  },
  getUserPositions: async (params: IParamsGetPosition) => {
    return await request.get<IPositions[]>(
      `/api/v1/positions/${params.address}`,
    );
  },
  getPrice: async () => {
    return await request.get<tokensPrice[]>("/api/v1/price");
  },
  getPriceFromCoingeckoId: async (coingeckoId: string) => {
    return axios.get<IResponseCoingecko[]>(
      `https://api.coingecko.com/api/v3/coins/markets?ids=${coingeckoId}&vs_currency=usd`,
    );
  },
  getWithdrawInfo: async (address: string) => {
    return axios.get<IWithdrawInfo>(
      `https://fullnode.mainnet.aptoslabs.com/v1/accounts/${address}/resource/0x5ae6789dd2fec1a9ec9cccfb3acaf12e93d432f0a3a42c92fe1a9d490b7bbc06::house_lp::UserWithdrawInfo`,
    );
  },
  getStrategiesById: async (id: string) => {
    return await request.get<Strategies>(`/api/v1/strategies/${id}`);
  },
  getHistoryStrategiesById: async (id: string, data?: any) => {
    return await request.get<HistoryStratragis[]>(
      `/api/v1/history/strategy/${id}?from=${data?.from || ""}&to=${
        data?.to || ""
      }`,
    );
  },
};
