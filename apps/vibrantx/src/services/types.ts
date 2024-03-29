import { ReactNode } from "react";

export interface IResponse<Data> {
  data: Data;
  message: string;
  status: number;
}

export interface IParamsGetStrategies {
  mode?: string;
  protocol?: string;
}
export interface IResponseGetStrategies {
  data: Strategies[];
}

export interface Strategies {
  id: string;
  isEnabled: boolean;
  protocols: string[];
  apr: string;
  description: string;
  pid: string;
  poolType: `${string}::${string}::${string}`;
  stakeToken: `${string}::${string}::${string}`[];
  totalValueLocked: string;
  name: string;
  displayName: string;
  strategyType: string;
  rewardToken: `${string}::${string}::${string}`[];
  ariesDetail: AriesDetail | null;
  positionToken: `${string}::${string}::${string}`;
  feeToken: string[] | string;
  depositFee: string;
  withdrawalFee: string;
  depositSwapFee: string;
  withdrawalSwapFee: string;
}

export interface AriesDetail {
  depositLimit: string;
  borrowLimit: string;
  borrowFee: string;
  maximumLtv: string;
  liquidationThreshold: string;
  liquidationBonus: string;
  optionalUtilization: string;
  maxInterestRate: string;
  optionalInterestRate: string;
  flashLoanFee: string;
}
export interface IResponseCoingecko {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null;
  last_updated: string;
}

export interface tokensPrice {
  name: string;
  price: string;
  tokenAddress: string;
}
export interface AptosCoin {
  success: number;
  data: {
    success: boolean;
    data: {
      current_price: number;
    };
    metadata: object;
  };
  metadata: object;
}
export interface CartOfferData {
  title: ReactNode;
  body: ReactNode;
  bodyHover: ReactNode;
  icon: string;
}

export interface HistoryStratragis {
  apr: string;
  strategyId: string;
  totalValueLocked: string;
  createdAt: string;
  timestamp: string;
}

export interface IParamsGetPosition {
  address: string;
}
export interface IPositions {
  id: string;
  isEnabled: boolean;
  protocols: string[];
  apr: string;
  description: string;
  pid: string;
  poolType: `${string}::${string}::${string}`;
  stakeToken: `${string}::${string}::${string}`[];
  totalValueLocked: string;
  name: string;
  displayName: string;
  strategyType: string;
  rewardToken: `${string}::${string}::${string}`[];
  ariesDetail: AriesDetail | null;
  positionToken: `${string}::${string}::${string}`;
  feeToken: string[] | string;
  depositFee: string;
  withdrawalFee: string;
  depositSwapFee: string;
  withdrawalSwapFee: string;
  positions: string[];
}

export interface IWithdrawInfo {
  type: string;
  data: WithDraw;
}

export interface WithDraw {
  last_withdraw_reset_timestamp: string;
  withdraw_amount: string;
  withdraw_limit: string;
}
