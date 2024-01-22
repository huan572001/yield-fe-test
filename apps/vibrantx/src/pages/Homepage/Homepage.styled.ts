import {
  Box,
  Box as ChakraBox,
  Button as ChakraButton,
  Table as ChakraTable,
  Tr,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

export const BoxHomePage = styled(ChakraBox)`
  background-color: white;
  border-radius: 20px;
  padding: 60px 30px 30px 30px;
  width: 100%;
`;
export const BorderGradientTable = styled(Box)`
  // background: linear-gradient(99deg, #8781e7 5%, #a4ecea 96.68%);
  padding: 1px;
  border-radius: 24px;
`;
export const StyledTableContainer = styled(Box)`
  border-radius: 24px;
  overflow: hidden;
  // border: 10px solid transparent;
  // border-image: linear-gradient(to right, #8781e7 69%, #a4ecea 59%);
`;

export const TableHome = styled(ChakraTable)({
  borderRadius: "24px !important",
  overflow: "auto",
  ["thead tr th"]: {
    textTransform: "none",
    color: `#8B8B8B`,
    fontSize: "16px",
    fontStyle: "normal",
    lineHeight: "24px",
    padding: "24px",
    fontWeight: "500",
    // borderBottom: "1px solid #EAEAEA",
  },
  ["tbody tr"]: {
    borderBottom: "1px solid #EAEAEA",
  },
  ["tbody tr td"]: {
    border: "none",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "500",
    color: "#3D3D3D",
    lineHeight: "28px",
    borderBottom: "none",
    padding: "16px 24px",
  },
});

export const AppButton = styled(ChakraButton)({
  padding: "10px 18px",
  height: "auto",
  borderRadius: "120px",
  minWidth: "90px",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "24px",
  transition: "all 0.2s ease-in",
  ":hover": {
    backgroundColor: "inherit",
    transform: "scale(0.98)",
  },
  ":active": {
    transform: "scale(0.98)",
  },
  "&.disabled": {
    color: "#8B8B8B !important",
    background: "rgba(214, 214, 214, 0.50) !important",
    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
    opacity: "1 !important",
  },
  "&.disabled:hover": {
    backgroundColor: "inherit",
    transform: "none",
  },
});

export const TrTable = styled(Tr)({
  ":hover": {
    transition: "box-shadow 400ms ease 0s",
    cursor: "pointer",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 8px",
  },
});
