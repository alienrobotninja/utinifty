import {useForm} from 'react-hook-form'

import {MetadataField} from 'mintbase'

import {gql} from 'apollo-boost'
import {useLazyQuery} from '@apollo/client'

import {useState, useEffect} from 'react'

import {useWallet} from '../services/providers/MintbaseWalletContext'
import firebase from "firebase";
import functions = firebase.functions;

const FETCH_MINTER_STORE = gql`
    query FetchMinterStores($minter: String!) {
        store(where: { minters: { account: { _eq: $minter } } }) {
            id
        }
    }
`

const MinterComp = ({closeModal}: { closeModal: Function }) => {
    const {wallet, isConnected, details} = useWallet()
    const [coverImage, setCoverImage] = useState<File | null>(null)
    const [isMinting, setIsMinting] = useState<boolean>(false)

    const [fetchStores, {called, loading, data}] = useLazyQuery(
        FETCH_MINTER_STORE,
        {variables: {minter: details.accountId}}
    )

    useEffect(() => {
        if (!isConnected) return

        fetchStores()
    }, [isConnected])

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const handleCoverImage = (e: any) => {
        const file = e.target.files[0]

        setCoverImage(file)
    }

    const onSubmit = async (data: any) => {
        if (!wallet || !wallet.minter) return
        if (!coverImage) return

        setIsMinting(true)

        const {data: fileUploadResult, error: fileError} =
            await wallet.minter.uploadField(MetadataField.Media, coverImage)

        if (fileError) {
            console.error(fileError)
            return
        }

        wallet.minter.setMetadata({
            title: data.title,
            description: data.description,
            extra: data.time
        })

        setIsMinting(false)

        wallet.mint(+data.amount, data.store, undefined, undefined, undefined)
    }

    if (!isConnected) return <div>Connect your wallet</div>

    if (loading) return <div>Loading...</div>

    return (
        <div
            className="fixed z-50 inset-0 overflow-y-auto"
        >
            <div
                className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
            >
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div
                        className="absolute inset-0 bg-gray-800 bg-opacity-75 modal-blur"
                    >
                    </div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
                >&#8203;</span
                >

                <div
                    className="main inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                        <button
                            onClick={()=> closeModal()}
                            type="button"
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2
                        focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="sr-only">Close</span>
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="w-full minter-modal">
                        <form
                            className="bg-white rounded px-8 pt-6 pb-8 mb-4"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="mb-4">
                                <h1 className="font-semibold mb-2 text-xl leading-tight sm:leading-normal">
                                    Simple Minter
                                </h1>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Contract
                                </label>

                                <select
                                    {...register('store', {required: true})}
                                    className="text-sm"
                                >
                                    {data?.store.map((store: { id: string }) => (
                                        <option key={store.id} value={store.id}>
                                            {store.id}
                                        </option>
                                    ))}
                                </select>

                                {errors.store && (
                                    <p className="text-red-500 text-xs italic">
                                        Please select a store.
                                    </p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Title
                                </label>
                                <input
                                    {...register('title', {required: true})}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Title"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-xs italic">Please add title.</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Description
                                </label>
                                <input
                                    {...register('description', {required: true})}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Description"
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-xs italic">
                                        Please add a description.
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Time
                                </label>
                                <input
                                    {...register('time', {required: true})}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Time"
                                />
                                {errors.time && (
                                    <p className="text-red-500 text-xs italic">
                                        Please add a Time for Event.
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Ticket Count
                                </label>
                                <input
                                    {...register('amount', {required: true})}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Ticket Count"
                                />
                                {errors.time && (
                                    <p className="text-red-500 text-xs italic">
                                        Please the Ticket Count.
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Attach Cover Image
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label
                                        className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                        <div
                                            className="h-full w-full text-center flex flex-col items-center justify-center">
                                            {!coverImage && (
                                                <p className="pointer-none text-gray-500 ">Select a file</p>
                                            )}
                                            {coverImage && (
                                                <p className="pointer-none text-gray-500">
                                                    {coverImage.name}
                                                </p>
                                            )}
                                        </div>
                                        <input
                                            {...register('coverImage', {required: true})}
                                            type="file"
                                            className="hidden"
                                            onChange={handleCoverImage}
                                        />
                                    </label>
                                </div>
                                {errors.coverImage && (
                                    <p className="text-red-500 text-xs italic">
                                        Please add a cover image.
                                    </p>
                                )}
                            </div>

                            {isMinting ? (
                                <div
                                    className="w-full py-2 px-4 rounded bg-gray-200 text-center text-black font-bold mb-2">
                                    Creating your mint transaction...
                                </div>
                            ) : (
                                <div className="flex items-center flex-row-reverse justify-between">
                                    <input
                                        className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
                                        type="submit"
                                        value="Mint"
                                    />
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MinterComp
