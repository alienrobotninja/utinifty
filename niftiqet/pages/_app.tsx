import type {AppProps} from 'next/app'
import {WalletProvider} from '../services/providers/MintbaseWalletContext'
import {ApolloProvider} from '@apollo/client'
import Head from 'next/head';
import {useApollo} from '../services/apolloClient'

import 'tailwindcss/tailwind.css'

import {GRAPH_MAINNET_HTTPS_URI, GRAPH_TESTNET_HTTPS_URI,} from '../constants/mintbase'
import Base from '../components/Layout/Base'
import "../assets/scss/style.scss"
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const apolloClient = useApollo({
        ...pageProps,
        network: {
            graphUri:
                process.env.NEXT_PUBLIC_MINTBASEJS_NETWORK === 'testnet'
                    ? GRAPH_TESTNET_HTTPS_URI
                    : GRAPH_MAINNET_HTTPS_URI,
        },
    })
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <WalletProvider apiKey={process.env.NEXT_PUBLIC_MINTBASEJS_API_KEY || ''}>
            <ApolloProvider client={apolloClient}>
                <CacheProvider value={emotionCache}>
                    <Head>
                        <title>Welcome to Niftiqet</title>
                        <meta name="viewport" content="initial-scale=1, width=device-width" />
                    </Head>
                    <ThemeProvider theme={theme}>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        <Base>
                            {/* @ts-ignore*/}
                            <Component {...pageProps} />
                        </Base>
                    </ThemeProvider>
                </CacheProvider>
            </ApolloProvider>
        </WalletProvider>
    )
}
