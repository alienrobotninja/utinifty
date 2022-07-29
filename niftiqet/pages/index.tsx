import Head from 'next/head'
import Hero from '../components/Hero'
import Container from '../components/Layout/Container'
import Card from '../components/Card'
import Link from 'next/link'
import Products from "../components/Products";
import Image from "next/image";
import HeaderImage from "../assets/img/left-section.png"

const links = [
  {
    href: 'https://testnet.mintbase.io/developer',
    title: 'Get an API Key',
    description:
      'The key to authenticate your app. This is used for file uploads and fetching useful information.',
  },
  {
    href: 'https://docs.mintbase.io/dev/getting-started',
    title: 'Documentation',
    description: 'Find in-depth information about Mintbase features and API.',
  },
  {
    href: 'https://github.com/mintbase/examples',
    title: 'Examples',
    description: 'Discover and deploy boilerplate example Mintbase projects.',
  },
  {
    href: 'https://testnet.mintbase.io/create',
    title: 'Deploy a contract',
    description: 'The first step for an on-chain adventure.',
  },
]

const Home = () => {
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
      <section className="w-full pb-20">
        <Container>
          <h3 className="text-xl font-light uppercase text-theme-blue">Latest entries</h3>
          <Products burner={false} storeId="niftiqet.mintspace2.testnet"/>
        </Container>
      </section>
    </>
  )
}

export default Home
