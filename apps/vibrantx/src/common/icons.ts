import amnisLogo from "@/assets/amnis-finance-logo.svg";
import aptLogo from "@/assets/apt-logo.svg";
import ariesLogo from "@/assets/aries-logo.svg";
import btcLogo from "@/assets/bitcoin-logo.svg";
import ethLogo from "@/assets/eth-logo.svg";
import liquidSwapIcon from "@/assets/liquidswap.svg";
import pancakeLogo from "@/assets/pancake.svg";
import solLogo from "@/assets/solana-logo.svg";
import sushiLogo from "@/assets/sushi.svg";
import thalaLogo from "@/assets/thala-logo.svg";
import usdcLogo from "@/assets/usdc-logo.svg";

const iconToken: { [key: string]: string } = {
  apt: aptLogo,
  aries: ariesLogo,
  eth: ethLogo,
  btc: btcLogo,
  usdc: usdcLogo,
  sol: solLogo,
  amnis: amnisLogo,
  "thala-lsd": thalaLogo,
  thala: thalaLogo,
  liquidswap: liquidSwapIcon,
  sushi: sushiLogo,
  pancake: pancakeLogo,
  merkle: "https://merkle.network/images/logo-s.png",
};

export default iconToken;
