import { store } from "@/redux/store";
import defaultList from "@/utils/defaultList.mainnet.json";
import { BigNumber } from "bignumber.js";
import { ITokenInfo } from "./utils.type";

function truncate(
  str: string,
  frontLen: number,
  backLen: number,
  truncateStr: string
) {
  if (!str) {
    return "";
  }

  if (!Number.isInteger(frontLen) || !Number.isInteger(backLen)) {
    throw `${frontLen} and ${backLen} should be an Integer`;
  }

  const strLen = str.length;
  truncateStr = truncateStr || "…";
  if (
    (frontLen === 0 && backLen === 0) ||
    frontLen >= strLen ||
    backLen >= strLen ||
    frontLen + backLen >= strLen
  ) {
    return str;
  } else if (backLen === 0) {
    return str.slice(0, frontLen) + truncateStr;
  } else {
    return str.slice(0, frontLen) + truncateStr + str.slice(strLen - backLen);
  }
}

export function truncateAddress(accountAddress: string) {
  return truncate(accountAddress, 6, 4, "…");
}

export function formatDate(originalDateString: string): string {
  let originalDate = new Date(originalDateString);

  let day = originalDate.getDate();
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = monthNames[originalDate.getMonth()];
  let year = originalDate.getFullYear();
  let hours = originalDate.getHours();
  let minutes = originalDate.getMinutes();

  let newDay = day < 10 ? "0" + day : day;
  let newMinutes = minutes < 10 ? "0" + minutes : minutes;

  let formattedDateString =
    newDay + " " + month + " " + year + " " + hours + ":" + newMinutes;
  return formattedDateString;
}
export function formatMonney(number: number): string {
  if (isNaN(number)) {
    return "Invalid input";
  }

  if (number < 1e3) {
    return number.toFixed(2); // No abbreviation for less than 1000
  } else {
    var abbreviations = ["K", "M", "B", "T"];
    var index = 0;

    while (number >= 1e3 && index < abbreviations.length - 1) {
      number /= 1e3;
      index++;
    }

    return `${number.toFixed(2)}${abbreviations[index - 1]}`;
  }
}

export const getDecimalAndLogoUrl = (symbol: string) => {
  const cryptoInfo = defaultList.find(
    (crypto) =>
      crypto.symbol.toLocaleUpperCase() === symbol.toLocaleUpperCase() ||
      crypto.hippo_symbol.toLocaleUpperCase() === symbol.toLocaleUpperCase()
  );
  if (cryptoInfo) {
    return {
      decimals: cryptoInfo.decimals,
      logo_url: cryptoInfo.logo_url,
      coingecko_id: cryptoInfo.coingecko_id,
      tokenAddress: cryptoInfo?.token_type?.type,
      tokenName: cryptoInfo?.symbol,
    };
  } else {
    return {
      decimals: 4,
      logo_url: "",
      coingecko_id: "",
      tokenAddress: "",
      tokenName: "",
    }; // Symbol not found
  }
};

export const calculateValueWithDecimals = (
  value: number | string,
  decimals: number
): string => {
  const valueBigNumber =
    typeof value === "string"
      ? new BigNumber(value)
      : new BigNumber(Number(value));
  const divisor = new BigNumber(10).exponentiatedBy(decimals);

  const result = valueBigNumber.dividedBy(divisor);

  return result.toString();
};

export const convertValueToDecimals = (
  value: number | string,
  decimals: number
): string => {
  const valueBigNumber =
    typeof value === "string"
      ? new BigNumber(value)
      : new BigNumber(Number(value));
  const multiplier = new BigNumber(10).exponentiatedBy(decimals);

  const result = valueBigNumber.multipliedBy(multiplier);

  return result.toString();
};

export const formatLargeNumber = (value: number | string): string => {
  const bigNumber = new BigNumber(value);

  if (bigNumber.abs().lt(1e3)) {
    return bigNumber.toNumber().toString();
  } else if (bigNumber.abs().lt(1e6)) {
    return bigNumber.div(1e3).toFixed(2) + "K";
  } else if (bigNumber.abs().lt(1e9)) {
    return bigNumber.div(1e6).toFixed(2) + "M";
  } else if (bigNumber.abs().lt(1e12)) {
    return bigNumber.div(1e9).toFixed(2) + "B";
  } else {
    return bigNumber.div(1e12).toFixed(2) + "T";
  }
};

export const calculateValue = (
  amount: string | number,
  price: string | number
): string => {
  const amountBN = new BigNumber(amount);
  const priceBN = new BigNumber(price);

  const valueBN = amountBN.times(priceBN);

  return valueBN.toString();
};

export const addBigNumbers = (...numbers: string[]): string => {
  if (numbers.length < 2) {
    throw new Error("At least two numbers must be passed to perform addition.");
  }

  let result: BigNumber = new BigNumber(numbers[0]);
  for (let i = 1; i < numbers.length; i++) {
    const bigNum: BigNumber = new BigNumber(numbers[i]);
    result = result.plus(bigNum);
  }

  return result.toString();
};

export const multiplyBigNumbers = (num1: string, num2: string): string => {
  if (!num1 || !num2) return "0";

  const bigNum1: BigNumber = new BigNumber(num1);
  const bigNum2: BigNumber = new BigNumber(num2);
  const result: BigNumber = bigNum1.multipliedBy(bigNum2);

  return result.toString();
};

export const getProtocolNameAndFunc = (
  protocolName: string
): {
  protocol: string;
  protocolDisplayName: string;
  funcUnstake: string;
  funcUserPosition: string;
  funcClaimRewards: string;
} => {
  switch (protocolName.toLocaleLowerCase()) {
    case "amnis":
      return {
        protocol: "amnis",
        protocolDisplayName: "Amnis",
        funcUnstake: "unstake_and_swap",
        funcUserPosition: "get_users_position",
        funcClaimRewards: "",
      };
    case "thala-lsd":
      return {
        protocol: "thala_lsd",
        protocolDisplayName: "Thala",
        funcUnstake: "unstake_and_swap",
        funcUserPosition: "get_users_position",
        funcClaimRewards: "",
      };
    case "aries":
      return {
        protocol: "aries",
        protocolDisplayName: "Aries",
        funcUnstake: "withdraw",
        funcUserPosition: "get_position",
        funcClaimRewards: "claim_rewards",
      };
    default:
      return {
        protocol: "",
        funcUnstake: "",
        funcUserPosition: "",
        protocolDisplayName: "",
        funcClaimRewards: "",
      };
  }
};

export const getTokenPrice = (tokenAddress: string): string | number => {
  const tokenData = store.getState().strategies.tokensPrice;
  const token = tokenData.find(
    (item) =>
      item.tokenAddress.toLocaleLowerCase() === tokenAddress.toLocaleLowerCase()
  );

  if (token) {
    return token.price;
  }

  return "0"; // Trả về  0 nếu không tìm thấy token
};

export const getPercentFeeWithProtocol = (protocol: string) => {
  switch (protocol.toLocaleLowerCase()) {
    case "amnis":
      return 0.04 / 100;

    case "thala-lsd":
      return 0.01 / 100;
    default:
      return 0.04 / 100;
  }
};

export const formatNumberWithDecimal = (
  input: string,
  maxDecimalPlaces: number
): string => {
  const [integerPart, decimalPart] = input.split(".");

  const formattedIntegerPart = integerPart || "";

  let formattedDecimalPart = "";
  if (decimalPart !== undefined) {
    formattedDecimalPart = `.${decimalPart.slice(0, maxDecimalPlaces)}`;
  }
  const result = formattedIntegerPart + formattedDecimalPart;

  return result;
};

export const keepNumericAndDecimal = (input: string): string => {
  const regexPattern = /[^\d.]/g;
  return input.replace(regexPattern, "");
};

export const getTokenInfo = (
  tokenAddress: `${string}::${string}::${string}`
): ITokenInfo => {
  const cryptoInfo = defaultList.find(
    (crypto) =>
      crypto.token_type.type.toLocaleLowerCase() ===
      tokenAddress.toLocaleLowerCase()
  );

  if (cryptoInfo) {
    return cryptoInfo as ITokenInfo;
  }
  return {} as ITokenInfo;
};
