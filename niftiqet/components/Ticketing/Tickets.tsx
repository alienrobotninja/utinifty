import Link from 'next/link'
import {useWallet} from "../../services/providers/MintbaseWalletContext";
import {useEffect, useState} from "react";
import {Card, Image, Text, Badge, Button, Group, Modal, TextInput} from '@mantine/core';
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/client";
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
    list: TokenList
}
type TokenList = {
    id: string
    price: string
}
const Tickets = ({ thing, burner }: { thing: any, burner: Boolean }) => {
    const {wallet, isConnected, details} = useWallet()
    const [listModal, setListModal] = useState({state: false, tokenId: "", storeId: ""});
    const [price, setPrice] = useState("");
    const listToken = (tokenId: string, storeId: string, price: string) => {
        const returned = wallet?.list(tokenId, storeId, price)
        console.log('list returned', returned)
    }
    const buyToken = (tokenId: string, price: string) => {
        const returned = wallet?.makeOffer(tokenId, price)
        console.log('buy returned', returned)
    }
    return (
        <>
            <Modal centered opened={listModal.state} onClose={() => setListModal({state: false, tokenId: "", storeId: ""})} title="Ticket Collection">
                <TextInput
                    placeholder="Ticket Price"
                    label="Ticket Price"
                    required
                    onChange={(e: any) => setPrice(e.target.value)}
                />
                <Button onClick={() => listToken(listModal.tokenId, listModal.storeId, price)}>List</Button>
            </Modal>
        <div className="card-grid-4 px-6">

            {thing?.tokens.map((token: Token) => (
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
            ))}
        </div>
        </>
    )
}

export default Tickets
