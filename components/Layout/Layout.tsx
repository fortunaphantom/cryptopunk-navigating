import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import style from "./layout.module.scss";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";

import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from "wagmi";

import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from "wagmi/providers/public";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  infuraProvider({ apiKey: process.env.NEXT_APP_INFURA_ID }),
  publicProvider(),
]);


// Set up client
const client = createClient({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    })
  ],
  provider,
  webSocketProvider,
});

interface LayoutProps {
  children: React.ReactNode;
}

let customTheme = extendTheme({
  colors: {
    primary: {
      main: "#ea34b0",
    },
    secondary: {
      main: "#34eae2",
    },
  },
});

export default function Layout({ children }: LayoutProps) {
  return (
    <WagmiConfig client={client}>
      <ChakraProvider theme={customTheme}>
        <CSSReset />
        <div id={style.layout}>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </ChakraProvider>
    </WagmiConfig>
  );
}
