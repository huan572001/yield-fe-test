import {
  Box,
  Box as ChakraBox,
  Button as ChakraButton,
  Table as ChakraTable,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

export const BoxHomePage = styled(ChakraBox)`
  background-color: white;
  border-radius: 20px;
  padding: 60px 30px 30px 30px;
  width: 100%;
`;

export const StyledTableContainer = styled(Box)`
  border-radius: 24px;
  overflow: hidden;
`;

export const TableHome = styled(ChakraTable)({
  borderRadius: "24px !important",
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
  fontSize: "16px",
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
});
