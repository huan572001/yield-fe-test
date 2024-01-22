export const LAYOUT_STORAGE_KEY = "VITE_LAYOUT";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initialStateLayout: Record<string, any> = {
  locale: "en-EN",
};

export const footerSupport = [
  { content: "footer.request-form", link: "/" },
  { content: "footer.advertising", link: "/" },
  { content: "footer.candy-rewards Listing", link: "/" },
  { content: "footer.help-center", link: "/" },
  { content: "footer.bug-bounty", link: "/" },
  { content: "footer.faq", link: "/" },
];

export const footerResources = [
  { content: "footer.perpetuals", link: "/" },
  { content: "footer.crypto-news", link: "/" },
  { content: "footer.bitcoin-treasury", link: "/" },
  { content: "footer.crypto-heatmap", link: "/" },
  { content: "footer.crypto-api", link: "/" },
];

export const footerAboutVibrantX = [
  { content: "footer.contact", link: "/" },
  { content: "footer.terms-of-service", link: "/" },
  { content: "footer.privacy-policy", link: "/" },
  { content: "footer.ad-policy", link: "/" },
  { content: "footer.cookie-preferences", link: "/" },
];

export const columnsPositions = [
  { label: "Collateral", key: "collateral" },
  { label: "Strategy", key: "strategy" },
  { label: "Protocol", key: "protocol" },
  { label: "Amount", key: "amount" },
  { label: "Value", key: "value" },
  { label: "APR", key: "apr", hidden: true },
  { label: "Rewards", key: "rewards" },
  { label: "Action", key: "action" },
];

export const columnsPositions2 = [
  { label: "Position", key: "position" },
  { label: "Strategy", key: "strategy" },
  { label: "Protocol", key: "protocol" },
  { label: "Total Value", key: "total_value" },
  { label: "Fees APY", key: "fees_apy" },
  { label: "PnL", key: "pnl" },
];

export const columnsLending = [
  { label: "Asset", key: "asset" },
  { label: "Protocol", key: "protocol" },
  { label: "Risk", key: "risk" },
  { label: "Total Supply", key: "total_supply" },
  { label: "Max LTV", key: "max_ltv" },
  { label: "Supply APY", key: "supply_apy", hidden: true },
  { label: "", key: "action" },
];

export const columnsStaking = [
  { label: "Asset", key: "asset" },
  { label: "Strategy", key: "strategy" },
  { label: "Protocols", key: "protocols" },
  { label: "TVL", key: "tvl" },
  { label: "Risk", key: "risk" },
  { label: "7D APY", key: "apy_7d" },
];

export enum STRATEGY_TYPE {
  STAKING = "Staking",
  LENDING = "Lending",
  LIQUIDITY = "Liquidity",
}
export enum ASSET_TYPE {
  LAYERZERO = "layerzero",
  NATIVE = "native",
  WORMHOLE = "wormhole",
}
