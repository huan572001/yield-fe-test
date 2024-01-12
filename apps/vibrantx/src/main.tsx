import { theme } from "@/common/theme.ts";
import { AppContext } from "@/components/AppContext.tsx";
import { AptosProvider } from "@/components/AptosContext.tsx";
import IntlProvider from "@/components/Intl.tsx";
import Fonts from "@/components/fonts/Fonts.tsx";
import QueryClientProvider from "@/queries/index.tsx";
import { store } from "@/redux/store/store.ts";
import { Aptos, AptosConfig } from "@aptos-labs/ts-sdk";
import { ChakraProvider } from "@chakra-ui/react";
import { Network } from "aptos";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
const aptosConfig = new AptosConfig({ network: Network.MAINNET });
const aptos = new Aptos(aptosConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Fonts />
      <QueryClientProvider>
        <AptosProvider aptos={aptos}>
          <IntlProvider>
            <AppContext>
              <Router basename={""}>
                <HelmetProvider>
                  <App />
                </HelmetProvider>
              </Router>
            </AppContext>
          </IntlProvider>
        </AptosProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </Provider>
  // </React.StrictMode>
);
