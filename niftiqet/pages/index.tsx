import Head from 'next/head'
import Hero from '../components/Hero'
import Container from '../components/Layout/Container'
import Card from '../components/Card'
import Link from 'next/link'
import Products from "../components/Products";
import Image from "next/image";
import HeaderImage from "../assets/img/left-section.png"
import {gql} from "apollo-boost";
import {useWallet} from "../services/providers/MintbaseWalletContext";
import {useEffect, useState} from "react";
import {useLazyQuery} from "@apollo/client";
const FETCH_MINTER_STORE = gql`
  query FetchMinterStores($minter: String!) {
    store(where: { minters: { account: { _eq: $minter } } }) {
      id
      name
    }
  }
`

const Home = () => {
  const {wallet, isConnected, details} = useWallet()
  const [storeId, setStoreId] = useState<string>("")
  const [fetchStores, {called, loading, data}] = useLazyQuery(
      FETCH_MINTER_STORE,
      {variables: {minter: details.accountId}}
  )
  useEffect(() => {
    if (!isConnected) return

    fetchStores()
  }, [isConnected])
  return (
    <>
      <Head>
        <title>Niftiqet | Mint, Buy and Sell Tickets online</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="home-header">
        <Container className="w-full flex items-center">
          <div className="left--img">
            <Image alt="header image" src={HeaderImage} objectFit="contain" />
          </div>
          <div className="right--cta">
            <span className="text-xs inline-block py-2 px-4 leading-none text-center whitespace-nowrap sb-regular align-baseline badge">
              Be on the Live Shows
            </span>
            <div className="main-text sb-bold">
              Get Any <span className="text-theme-blue">NFT</span> <br/> Tickets Online
            </div>
            <Link href="/ticketing" passHref>
              <button className="btn theme-btn">
                <span className="text-black">Buy NFT Ticket</span>
              </button>
            </Link>
          </div>
        </Container>
      </header>
    </>
  )
}

export default Home
