import { Aptos } from "@aptos-labs/ts-sdk";
import { ReactNode, createContext, useContext } from "react";

interface AptosContextProps {
  aptos: Aptos;
  children: ReactNode;
}

const AptosContext = createContext<Aptos | undefined>(undefined);

export function AptosProvider({ aptos, children }: AptosContextProps) {
  return (
    <AptosContext.Provider value={aptos}>{children}</AptosContext.Provider>
  );
}

export function useAptos(): Aptos {
  const aptos = useContext(AptosContext);
  if (!aptos) {
    throw new Error("useAptos must be used within an AptosProvider");
  }
  return aptos;
}
