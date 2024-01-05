import defaultList from "@/utils/defaultList.mainnet.json";
import { BigNumber } from "bignumber.js";

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
    };
  } else {
    return undefined; // Symbol not found
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

export const getProtocolName = (protocolName: string): string => {
  switch (protocolName.toLocaleLowerCase()) {
    case "amnis":
      return "amnis";
    case "thala-lsd":
      return "thala_lsd";
    default:
      return "";
  }
};
