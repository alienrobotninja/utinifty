import {useWallet} from '../services/providers/MintbaseWalletContext'
import {useForm} from 'react-hook-form'
import {MetadataField} from "mintbase";

const Form = () => {
  const { wallet, isConnected, details } = useWallet()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data: any) => {
    if (!isConnected) return
    console.log(data.coverImage)
    const coverImage = data.coverImage[0]
    const {data: uploadData, error:uploadError} = await wallet?.minter?.uploadField(MetadataField.Media, coverImage)
    if (uploadError || !uploadData) {
      console.error(uploadError)
    }

    wallet?.minter?.setMetadata({
      title: data.title,
      description: data.description
    })

    wallet?.mint(1, "niftiqet.mintspace2.testnet", undefined,undefined, "ticket")
  }
  return (
    <div className="w-full">
      <form className="bg-white rounded p-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            {...register('title', { required: true })}
            className="pl-3 shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <input
            {...register('description', { required: true })}
            className="pl-3 shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Description"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Cover Image
          </label>
          <input
            {...register('coverImage', { required: true })}
            className="pl-3 shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            placeholder="Description"
          />
        </div>
        <input
          className="bg-black p-2 cursor-pointer rounded w-full text-white"
          type="submit"
          value="Mint"
        />
      </form>
    </div>
  )
}

export default Form
