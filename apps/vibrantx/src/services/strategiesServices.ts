import { request } from "@/config/request";
import axios from "axios";
import { IResponseCoingecko, Strategies } from "./types";

export const StrategiesAPI = {
  getStrategies: async () => {
    return request.get<Strategies[]>("/api/v1/strategies");
  },
  getPriceFromCoingeckoId: async (coingeckoId: string) => {
    return axios.get<IResponseCoingecko[]>(
      `https://api.coingecko.com/api/v3/coins/markets?ids=${coingeckoId}&vs_currency=usd`
    );
  },
};
