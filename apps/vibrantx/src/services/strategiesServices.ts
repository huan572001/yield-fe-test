import { request } from "@/config/request";
import axios from "axios";
import { IResponseCoingecko, Strategies, tokensPrice } from "./types";

export const StrategiesAPI = {
  getStrategies: async () => {
    return request.get<Strategies[]>("/api/v1/strategies");
  },
  getPrice: async () => {
    return request.get<tokensPrice[]>("/api/v1/price");
  },
  getPriceFromCoingeckoId: async (coingeckoId: string) => {
    return axios.get<IResponseCoingecko[]>(
      `https://api.coingecko.com/api/v3/coins/markets?ids=${coingeckoId}&vs_currency=usd`
    );
  },
  getStrategiesById: async (id: string) => {
    return request.get<Strategies>(`/api/v1/strategies/{id}?id=${id}`);
  },
};
