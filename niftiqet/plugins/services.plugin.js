import { WalletService } from '@/wallet.service'

export default ({ app }, inject) => {
  // new Instance of Api class.
  const walletService = new WalletService()
  // injects imported api class into vue instance and nuxt root context
  inject('walletService', walletService)
}
