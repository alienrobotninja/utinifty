import {useLazyQuery, useQuery} from '@apollo/client'
import { gql } from 'apollo-boost'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Card from "./Card";
import {useWallet} from "../services/providers/MintbaseWalletContext";
import Ticketing from "../pages/ticketing";
import Tickets from "./Ticketing/Tickets";

const FETCH_BOUGHT_TOKENS = gql`
  query FetchBoughtTokens($ownerId: String!) {
    token(where: {ownerId: {_eq: $ownerId}, lists: {offer: {from: {_eq: $ownerId}}}}) {
      burnedAt
      createdAt
      crossHolder
      crossRootKey
      depth
      holder
      id
      lastTransferred
      loan
      list {
        acceptedOfferId
        autotransfer
        contractId
        createdAt
      }
      thing {
        id
        memo
        metaId
        metadata {
          thing_id
          media
          id
          title
          type
          extra
        }
        storeId
      }
    }
  }
`
const NFT = ({ media, title, description }: { media: string; title: string; description: string }) => {
  return (
      <Card title={title} description={description} media={media} />
  )
}

type Store = {
  id: string
  name: string
  symbol: string
  baseUri: string
  owner: string
  minters: {
    account: string
    enabled: string
  }[]
}

type Thing = {
  id: string
  metadata: {
    title: string
    media: string
    description: string
    extra: string
  }
  memo: string
  metaId: string
}

const Purchased = () => {
  const [price, setPrice] = useState<string | null>(null)
  const [things, setThings] = useState<Thing[] | []>([])
  const [thing, setThing] = useState<Thing | null>(null)
  const [activeThing, setActiveThing] = useState<string>("")
  const [priceModal, setPriceModal] = useState(false);
  const [store, setStore] = useState<Store | null>(null)

  const {wallet, isConnected, details} = useWallet()
  const {called: buyCalled, loading: buyLoading, data: buyData} = useQuery(
      FETCH_BOUGHT_TOKENS,
      {variables: {ownerId: details.accountId}}
  )
  useEffect(() => {
    let newThings;
      console.log('buyData',buyData)
      if (!buyData) return

      if (buyData?.token.length === 0) return
      setStore({
        ...buyData.token,
      })
      newThings = buyData.token.map((token: any) => token.thing)
      setThings(newThings)
  }, [buyData])

  const listNFT = (ticket: { tokenId: string; storeId: string; }) => {
      wallet?.list(`${ticket.tokenId}`, `${ticket.storeId}`, `${price}`)
  }
  function loadThing(thing: any) {
    setThing(thing)
    setPriceModal(true)
  }
  return (
    <div className="w-full py-12">
      {!buyLoading && (
        <>
          {/*<Modal overflow="inside"  centered opened={priceModal} fullScreen onClose={() => setPriceModal(false)} title="Ticket Collection">
            <Tickets thing={thing} burner={burner}  />
          </Modal>*/}
          <div className="mx-auto pb-10 card-grid-4">
            {things.map((thing: Thing) => (
                <div onClick={() => loadThing(thing)} key={thing?.metaId}>
                  <NFT
                    title={thing?.metadata?.title}
                    media={thing?.metadata?.media}
                    description={thing?.metadata?.description}
                  />
                </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Purchased
