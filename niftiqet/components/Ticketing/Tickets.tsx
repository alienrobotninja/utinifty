import Link from 'next/link'
import {useWallet} from "../../services/providers/MintbaseWalletContext";
import {useEffect, useRef, useState} from "react";
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/client";
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import MTypography from '@mui/material/Typography';
import {formatNearAmount, parseNearAmount} from "near-api-js/lib/utils/format";
// @ts-ignore
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import { CssVarsProvider } from '@mui/joy/styles';
import {Checkbox} from "@mui/joy";
import Modal from "@mui/material/Modal";
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Image from "next/image";
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
    storeId: string
    tokens: Token[]
}
type Token = {
    id: string
    thing: Thing
    memo: string
    metaId: string
    ownerId: string
    list: TokenList
}
type TokenList = {
    id: string
    price: string
}
const GAS = 100000000000000
const Tickets = ({ thing, batchList, setBatchList, batch, priceModal }: { thing: any, batchList: Array<any>, setBatchList: Function, batch: Boolean, priceModal: Boolean }) => {
    const {wallet, isConnected, details} = useWallet()
    const [listModal, setListModal] = useState({state: false, tokenId: "", storeId: ""});
    const [price, setPrice] = useState<string | null>("");
    const listToken = (tokenId: any, storeId: string, price: string | null) => {
        if (price != null) {
            if (typeof tokenId === "object"){
                console.log('list tokenId', tokenId)
                const returned = wallet?.batchList(tokenId, storeId, price)
            } else {
                console.log('list tokenId', tokenId)
                const returned = wallet?.list(tokenId, storeId, price)
            }
        }
    }
    const buyToken = (tokenId: string, price: string) => {
        console.log('buy returned', tokenId, price)
        const returned = wallet?.makeOffer(tokenId, price)
    }

    useEffect(() => {
        if (priceModal){
            // @ts-ignore
            setListModal({state: true, tokenId: batchList, storeId: thing?.storeId})
        }
    }, [priceModal])
    /*From Dialog*/
    return (
        <>
            <Dialog
                open={listModal.state}
                onClose={() => setListModal({state: false, tokenId: "", storeId: ""})}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <DialogTitle id="scroll-dialog-title">Sell Ticket(s)</DialogTitle>
                <DialogContent>
                    <div className="py-2"></div>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            placeholder="Ticket Price"
                            label="Ticket Price"
                            required
                            type="number"
                            onChange={(e: any) => setPrice(`${parseNearAmount(e.target.value)}`)} id="outlined-basic" variant="outlined" />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <CssVarsProvider>
                        <Button
                            size="sm"
                            color="danger"
                            onClick={() => setListModal({state: false, tokenId: "", storeId: ""})}
                        >Cancel</Button>
                        <Button size="sm" onClick={() => listToken(listModal.tokenId, listModal.storeId, price)}>Sell</Button>
                    </CssVarsProvider>
                </DialogActions>
            </Dialog>
            {/*<Modal centered opened={listModal.state} onClose={() => setListModal({state: false, tokenId: "", storeId: ""})} title="Ticket Collection">
                <TextInput
                    placeholder="Ticket Price"
                    label="Ticket Price"
                    required
                    onChange={(e: any) => setPrice(e.target.value)}
                />
                <Button onClick={() => listToken(listModal.tokenId, listModal.storeId, price)}>List</Button>
            </Modal>*/}
        <div className="card-grid-4">
            {thing?.tokens.map((token: Token) => (
            <CssVarsProvider key={token?.id} >
                <Card variant="outlined" sx={{ minWidth: '320px' }}>
                    {!token.list && batch && <Checkbox
                        variant="solid"
                        checked={batchList.includes(token.id.replace(`:${token?.thing?.storeId}`, ""))} onChange={(e) => setBatchList(e, token.id.replace(`:${token?.thing?.storeId}`, ""))}/>}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography level="h2" fontSize="md" sx={{ alignSelf: 'flex-start' }}>
                            {token.thing.metadata.title}
                        </Typography>
                        <Typography level="body2">April 24 to May 02, 2021</Typography>
                    </Box>
                    <IconButton
                        aria-label="bookmark Bahamas Islands"
                        variant="plain"
                        color="neutral"
                        size="sm"
                        sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
                    >
                        <BookmarkAdd />
                    </IconButton>

                    <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
                        <Image
                            layout="fill"
                            src={token?.thing?.metadata?.media}
                            alt="Ticket Image"
                        />
                    </AspectRatio>
                    <Box sx={{ display: 'flex' , flexWrap: 'wrap'}}>
                        <div className="w-full mb-3">
                            <Typography level="body2" fontSize="md">
                            {token.thing.metadata.description}
                            </Typography>
                        </div>
                        <div>
                            <Typography level="body3">Ticket price:</Typography>
                            <Typography fontSize="lg" fontWeight="lg">
                                { token.list ? formatNearAmount(Number(token.list.price).toLocaleString('fullwide', { useGrouping: false })) + " NEAR" : "Not Listed" }
                            </Typography>
                        </div>
                        {!token.list && !batch && token.ownerId == details.accountId && <Button
                            onClick={()=> setListModal({state: true, tokenId: token?.id.replace(`:${token?.thing?.storeId}`, ""), storeId: token?.thing?.storeId})}
                            variant="solid"
                            size="sm"
                            color="primary"
                            aria-label="Explore Bahamas Islands"
                            sx={{ml: 'auto', fontWeight: 600}}
                        >
                            Sell Ticket
                        </Button>}
                        {token.list && token.ownerId == details.accountId && <Button onClick={()=> setListModal({state: true, tokenId: token?.id, storeId: token?.thing?.storeId})}
                                                                                     variant="solid"
                            size="sm"
                            color="danger"
                            aria-label="Explore Bahamas Islands"
                            sx={{ml: 'auto', fontWeight: 600}}
                        >
                            Burn Ticket
                        </Button>}
                        {token.list && token.ownerId !== details.accountId && <Button onClick={() => buyToken(token.id,
                            Number(token?.list?.price).toLocaleString('fullwide', { useGrouping: false })
                        )}
                            variant="solid"
                            size="sm"
                            color="success"
                            aria-label="Explore Bahamas Islands"
                            sx={{ml: 'auto', fontWeight: 600}}
                        >
                            Buy Ticket
                        </Button>}
                    </Box>
                </Card>
            </CssVarsProvider>
            ))}

            {/*{thing?.tokens.map((token: Token) => (
                <Card key={token?.id} shadow="sm" p="lg" radius="md" withBorder>
                    <Card.Section>
                        <Image
                            src={token?.thing?.metadata?.media}
                            height={160}
                            alt="Norway"
                        />
                    </Card.Section>

                    <Group position="apart" mt="md" mb="xs">
                        <Text weight={500}>{token.thing.metadata.title}</Text>
                        <Badge color="pink" variant="light">
                            { token.list ?  "On Sale" : "Not for Sale" }
                        </Badge>
                    </Group>

                    <Text size="sm" color="dimmed">
                        {token.thing.metadata.description}
                    </Text>
                    {!token.list ? (
                    <Button onClick={()=> setListModal({state: true, tokenId: token?.id, storeId: token?.thing?.storeId})} variant="light" color="green" fullWidth mt="md" radius="md">
                        Put up for sale
                    </Button>
                    ) : (
                        <Button onClick={() => buyToken(token.id, token?.list.price)} variant="light" color="green" fullWidth mt="md" radius="md">
                            Buy
                        </Button>
                        )}
                </Card>
            ))}*/}
        </div>
        </>
    )
}

export default Tickets
