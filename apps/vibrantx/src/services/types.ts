export interface IResponse<Data> {
  data: Data;
  message: string;
  status: number;
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
