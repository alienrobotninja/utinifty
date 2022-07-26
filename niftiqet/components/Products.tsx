import { useQuery } from '@apollo/client'
import { gql } from 'apollo-boost'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Card from "./Card";
import {useWallet} from "../services/providers/MintbaseWalletContext";
import { Modal } from '@mantine/core';

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
        thing {
          id
          metaId
          memo
          tokens {
            minter
          }
          metadata {
            title
            media
            description
          }
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
  }
  memo: string
  metaId: string
}

const Products = ({ storeId }: { storeId: string }) => {
  const [store, setStore] = useState<Store | null>(null)
  const [price, setPrice] = useState<string | null>(null)
  const [things, setThings] = useState<Thing[] | []>([])
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
  return (
    <div className="w-full py-12">
      {!loading && (
        <>
          <Modal centered opened={priceModal} onClose={() => setPriceModal(false)} title="Set NFT ticket Price">
            Modal without header, press escape or click on overlay to close
          </Modal>
          <div className="mx-auto pb-10 card-grid-4">
            {things.map((thing: Thing) => (
              <NFT
                key={thing?.metaId}
                title={thing?.metadata?.title}
                media={thing?.metadata?.media}
                descriprtion={thing?.metadata?.description}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Products
