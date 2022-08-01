import MinterComp from "../components/MinterComp";
import Products from "../components/Products";
import {useEffect, useState} from "react";
import {gql} from "apollo-boost";
import {useLazyQuery} from "@apollo/client";
import {useWallet} from "../services/providers/MintbaseWalletContext";
import Purchased from "../components/Purchased";

const FETCH_MINTER_STORE = gql`
    query FetchMinterStores($minter: String!) {
        store(where: { minters: { account: { _eq: $minter } } }) {
            id
            name
        }
    }
`
const Ticketing = () => {
    const [minterModal, setMinterModal] = useState(false)
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
    const closeModal = () => setMinterModal(false)

    return (
        <div className="px-6">
            {minterModal && <MinterComp closeModal={closeModal}/>}
                <header className="dash--header text-gray-200">
                    <h3>Discover, Create and Sell<br/> Your Own NFT Ticket.</h3>
                </header>
                <div className="flex justify-between">
                    <h3 className="sb-bold text-gray-200 flex items-center">
                        <span>Purchased Tickets</span>
                    </h3>
                </div>
            {details && <Purchased />}
            <div className="flex justify-between">
                <h3 className="sb-bold text-gray-200 flex items-center">
                    <span>Marketplace</span>
                </h3>
                <button className="btn theme-btn" onClick={() => setMinterModal(true)}>
                    <span className="text-theme-blue">Mint Ticket</span>
                </button>
            </div>
                <div className="mb-4">
                    <label htmlFor="countries"
                           className="block mb-2 text-sm font-medium text-gray-400">Select Store</label>
                    <select id="countries"
                            onChange={(e)=> setStoreId(e.target.value)}
                            className="bg-gray-50 capitalize border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Empty Store</option>
                        <option value="niftiqet.mintspace2.testnet">Niftiqet (for viewing)</option>
                        {data?.store.map((store: { id: string }) => (
                            <option key={store.id} value={store.id}>
                                {store.name}
                            </option>
                        ))}
                    </select>
                </div>
            {storeId && <Products storeId={storeId}/>}
        </div>
    );
}

export default Ticketing