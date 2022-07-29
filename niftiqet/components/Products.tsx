import { useQuery } from '@apollo/client'
import { gql } from 'apollo-boost'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Card from "./Card";
import {useWallet} from "../services/providers/MintbaseWalletContext";
import { Modal } from '@mantine/core';
import Ticketing from "../pages/ticketing";
import Tickets from "./Ticketing/Tickets";

const FETCH_STORE = gql`
  query FetchStore($storeId: String!, $limit: Int = 20, $offset: Int = 0) {
    store(where: { id: { _eq: $storeId } }) {
      id
      name
      symbol
      baseUri
      owner
      minters {
        account
        enabled
      }

      tokens(
        order_by: { thingId: asc }
        where: { storeId: { _eq: $storeId }, burnedAt: { _is_null: true } }
        limit: $limit
        offset: $offset
        distinct_on: thingId
      ) {
        id
        thingId
        list {
          acceptedOfferId
          autotransfer
          contractId
          createdAt
          id
          price
          ownerId
          thingId
        }
        thing {
          id
          metaId
          memo
          storeId
          tokens {
            minter
            id
            thingId
            thing {
              metadata {
                thing_id
                media
                id
                title
                type
                extra
              }
            }
            list {
              acceptedOfferId
              autotransfer
              contractId
              createdAt
              id
              price
              ownerId
              thingId
            }
          }
          metadata {
            thing_id
            media
            id
            title
            type
            extra
          }
        }
      }
    }
  }
`

const FETCH_THING = gql`
  query FetchThing($thingId: String!) {
      thing(where: {id: {_eq: $thingId}}) {
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
        tokens {
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

const Products = ({ storeId, burner }: { storeId: string, burner: Boolean }) => {
  const [store, setStore] = useState<Store | null>(null)
  const [price, setPrice] = useState<string | null>(null)
  const [things, setThings] = useState<Thing[] | []>([])
  const [thing, setThing] = useState<Thing | null>(null)
  const [activeThing, setActiveThing] = useState<string>("")
  const [priceModal, setPriceModal] = useState(false);
  const { data, loading } = useQuery(FETCH_STORE, {
    variables: {
      storeId: storeId,
      limit: 10,
      offset: 0,
    },
  })

  const {wallet, isConnected, details} = useWallet()
  useEffect(() => {
    if (!data) return

    if (data?.store.length === 0) return

    setStore({
      ...data.store[0],
    })

    const things = data.store[0].tokens.map((token: any) => token.thing)

    setThings(things)
  }, [data])

  const listNFT = (ticket: { tokenId: string; storeId: string; }) => {
      wallet?.list(`${ticket.tokenId}`, `${ticket.storeId}`, `${price}`)
  }
  function loadThing(thing: any) {
    setThing(thing)
    setPriceModal(true)
  }
  return (
    <div className="w-full py-12">
      {!loading && (
        <>
          <Modal overflow="inside"  centered opened={priceModal} fullScreen onClose={() => setPriceModal(false)} title="Ticket Collection">
            <Tickets thing={thing} burner={burner}  />
          </Modal>
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

export default Products
