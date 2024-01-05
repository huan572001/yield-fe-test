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
  { label: "APR", key: "apr" },
];

export const mockDataTablePositions = [
  {
    collateral: "APT",
    strategy: "Lending",
    protocol: "Amnis",
    amount: "12",
    interest: "12%",
    value: "$0.35K",
  },
  {
    collateral: "APT",
    strategy: "Lending",
    protocol: "Amnis",
    amount: "104",
    interest: "11%",
    value: "$73.50K",
  },
];
export const columnsPositions2 = [
  { label: "Position", key: "position" },
  { label: "Strategy", key: "strategy" },
  { label: "Protocol", key: "protocol" },
  { label: "Total Value", key: "total_value" },
  { label: "Fees APY", key: "fees_apy" },
  { label: "PnL", key: "pnl" },
];

export const mockDataTablePositions2 = [
  {
    position: "APT",
    strategy: "Liquidity",
    protocol: "Aries",
    total_value: "$12.1K",
    fees_apy: "$0.35K",
    pnl: "12%",
  },
  {
    position: "APT",
    strategy: "Liquidity",
    protocol: "Aries",
    total_value: "$10.4K",
    fees_apy: "11%",
    pnl: "11%",
  },
];

export const columnsLending = [
  { label: "Asset", key: "asset" },
  { label: "Total Supply", key: "total_supply" },
  { label: "Protocol", key: "protocol" },
  { label: "Max LTV", key: "max_ltv" },
  { label: "Risk", key: "risk" },
  { label: "Supply APY", key: "supply_apy", hidden: true },
  { label: "", key: "action" },
];

export const mockDataTableLending: { [key: string]: string }[] = [
  {
    asset: "APT",
    strategy: "Lending",
    protocol: "Aries",
    total_supply: "Assets",
    max_ltv: "Assets",
    risk: "Low",
    apy_7d: "12%",
  },
  {
    asset: "ETH",
    strategy: "Lending",
    protocol: "Aries",
    total_supply: "Assets",
    max_ltv: "Assets",
    risk: "Low",
    apy_7d: "12%",
  },
  {
    asset: "BTC",
    strategy: "Lending",
    protocol: "Aries",
    total_supply: "Assets",
    max_ltv: "Assets",
    risk: "Low",
    apy_7d: "12%",
  },
  {
    asset: "SOL",
    strategy: "Lending",
    protocol: "Aries",
    total_supply: "Assets",
    max_ltv: "Assets",
    risk: "Low",
    apy_7d: "12%",
  },
  {
    asset: "USDC",
    strategy: "Lending",
    protocol: "Aries",
    total_supply: "Assets",
    max_ltv: "Assets",
    risk: "Low",
    apy_7d: "12%",
  },
];

export const columnsStaking = [
  { label: "Asset", key: "asset" },
  { label: "Strategy", key: "strategy" },
  { label: "Protocols", key: "protocols" },
  { label: "TVL", key: "tvl" },
  { label: "Risk", key: "risk" },
  { label: "7D APY", key: "apy_7d" },
];

export const mockDataTableStaking: { [key: string]: string }[] = [
  {
    asset: "APT",
    strategy: "Staking",
    protocols: "Amnis",
    tvl: "Assets",
    risk: "Low",
    apy_7d: "12%",
  },
  {
    asset: "APT",
    strategy: "Staking",
    protocols: "Thala",
    tvl: "Assets",
    risk: "Low",
    apy_7d: "11%",
  },
];

export enum STRATEGY_TYPE {
  STAKING = "Staking",
  LENDING = "Lending",
}
