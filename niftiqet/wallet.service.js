import { Chain, Network, Wallet } from 'mintbase'
export class WalletService {
  async walletProvider (props) {
    const { apiKey } = props

    async function initWallet () {
      const { data: walletData, error } = await new Wallet().init({
        networkName: process.env.PUBLIC_MINTBASEJS_NETWORK ?? Network.testnet,
        chain: Chain.near,
        apiKey
      })

      if (error) {
        return 'no data'
      }
      let details
      const { wallet, isConnected } = walletData
      if (isConnected) {
        try {
          const { data } = await wallet.details()
          details = data
        } catch (err) {
          return err
        }
      }
      return {
        wallet,
        isConnected,
        details
      }
    }

    const { wallet, details, isConnected } = await initWallet()
    return {
      wallet,
      isConnected,
      details
    }
  }
}
