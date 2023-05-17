import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { polygon, optimism, arbitrum } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import React from "react";

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit demo",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>HollowDB Auth</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
        }}
      >
        <WagmiConfig client={wagmiClient}>
          <Notifications />

          <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </MantineProvider>
    </>
  );
}
