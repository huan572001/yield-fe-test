export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "VibrantX finance",
  description: "Explore and Earn on Aptos.",
  navItems: [
    {
      label: "navBar.lending",
      href: "#Lending",
      id: "Lending",
    },
    {
      label: "navBar.staking",
      href: "#Staking",
      id: "Staking",
    },
    {
      label: "navBar.positions",
      href: "#Positions",
      id: "Positions",
    },
  ],
  navMenuItems: [
    {
      label: "navBar.positions",
      href: "#positions",
      id: "positions",
    },
    {
      label: "navBar.lending",
      href: "#lending",
      id: "lending",
    },
    {
      label: "navBar.staking",
      href: "#staking",
      id: "staking",
    },
  ],
};
export const optionsDropdownLending = [
  { key: "Earn", label: "Earn" },
  { key: "Lending", label: "Lend" },
  { key: "Staking", label: "Stake" },
];
