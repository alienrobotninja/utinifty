import {useLazyQuery, useQuery} from '@apollo/client'
import { gql } from 'apollo-boost'
import Image from 'next/image'
import {useEffect, useRef, useState} from 'react'
import Card from "./Card";
import {useWallet} from "../services/providers/MintbaseWalletContext";
import Ticketing from "../pages/ticketing";
import Tickets from "./Ticketing/Tickets";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle
} from "@mui/material";
import JButton from '@mui/joy/Button';
import { CssVarsProvider } from '@mui/joy/styles';

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
        where: { storeId: { _eq: $storeId }, burnedAt: { _is_null: true }, thing: {metadata: {id: {_is_null: false}}} }
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

const Products = ({ storeId }: { storeId: string }) => {
  const [store, setStore] = useState<Store | null>(null)
  const [price, setPrice] = useState<string | null>(null)
  const [things, setThings] = useState<Thing[] | []>([])
  const [thing, setThing] = useState<Thing | null>(null)
  const [activeThing, setActiveThing] = useState<string>("")
  const [priceModal, setPriceModal] = useState(false);
  const [batchList, setBatchList] = useState([]);
  const [batch, setBatch] = useState(false);

  const { data, loading } = useQuery(FETCH_STORE, {
    variables: {
      storeId: storeId,
      limit: 10,
      offset: 0,
    },
  })

  const {wallet, isConnected, details} = useWallet()
  useEffect(() => {
    let newThings;
      if (!data) return

      if (data?.store.length === 0) return
      setStore({
        ...data.store[0],
      })
      newThings = data.store[0].tokens.map((token: any) => token.thing)


    return setThings(newThings)
  }, [data])

  const listNFT = (ticket: { tokenId: string; storeId: string; }) => {
      wallet?.list(`${ticket.tokenId}`, `${ticket.storeId}`, `${price}`)
  }
  function loadThing(thing: any) {
    setThing(thing)
    setOpen(true);
  }

  /*From Dialog*/
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = useState(false);
// Add/Remove checked item from list
  // @ts-ignore
  const handleCheck = ({target}, id) => {
    console.log(target.value)
    let updatedList = [...batchList];
    if (target.checked) {
      // @ts-ignore
      updatedList = [...batchList, id];
    } else {
      // @ts-ignore
      updatedList.splice(batchList.indexOf(id), 1);
    }
    setBatchList(updatedList);
  };
  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <div className="w-full py-12">
      {!loading && (
        <>
          {/*<Modal overflow="inside"  centered opened={priceModal} fullScreen onClose={() => setPriceModal(false)} title="Ticket Collection">
            <Tickets thing={thing} burner={burner}  />
          </Modal>*/}

          <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
                <DialogTitle id="scroll-dialog-title">List of Tickets</DialogTitle>
                <div className="d">
                  <CssVarsProvider>
                    {!batch && <JButton
                        onClick={() => setBatch(true)}
                        variant="solid"
                        size="sm"
                        color="primary"
                        aria-label="Batch Listing"
                        sx={{ml: 'auto', fontWeight: 600}}
                    >
                      Batch List
                    </JButton>}
                    {batch &&
                        <Box sx={{ display: 'flex', gap: 2.5 }}>
                        <JButton
                        onClick={() => setBatch(false)}
                        variant="solid"
                        size="sm"
                        color="danger"
                        aria-label="Cancel Batch Listing"
                        sx={{ml: 'auto', fontWeight: 600}}
                    >
                      Cancel Batch List
                    </JButton>
                      <JButton
                        variant="solid"
                        size="sm"
                        color="success"
                        aria-label="List Tickets"
                        sx={{ml: 'auto', fontWeight: 600}}
                    >
                      List Selected
                    </JButton>
                        </Box>

                    }
                  </CssVarsProvider>
                </div>
              </Box>
              <DialogContent dividers={scroll === 'paper'}>
                <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                  <Tickets batch={batch} batchList={batchList} setBatchList={handleCheck} thing={thing} />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Subscribe</Button>
              </DialogActions>
            </Dialog>
          </div>
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
