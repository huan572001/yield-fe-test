export interface ITokenInfo {
  name: string;
  symbol: string;
  official_symbol: string;
  coingecko_id: string;
  decimals: number;
  logo_url: string;
  project_url: string;
  token_type: TokenType;
  extensions: Extensions;
  unique_index: number;
  source: string;
  permissioned_listing: boolean;
  hippo_symbol: string;
  pancake_symbol: string;
}

export interface Extensions {
  data: Array<string[]>;
}

export interface TokenType {
  type: `${string}::${string}::${string}`;
  account_address: string;
  module_name: string;
  struct_name: string;
}
