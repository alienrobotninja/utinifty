import { defineStore } from 'pinia'
import { minterStores, fetchStore } from '@/apollo/queries/queries'

export const useStore = defineStore('main', {
  state: () => ({
    wallet: undefined,
    details: {
      accountId: '',
      balance: '',
      allowance: '',
      contractName: ''
    },
    isConnected: false,
    loading: false,
    creator: true,
    stores: [],
    niftyStore: {},
    myStore: {},
    activeThing: {}
  }),
  actions: {
    setupWallet () {
      return new Promise((resolve) => {
        this.loading = true
        this.$nuxt.$walletService
          .walletProvider({ apiKey: this.$nuxt.$config.apiKey })
          .then(({ details, wallet, isConnected }) => {
            this.wallet = wallet
            this.isConnected = isConnected
            if (isConnected) {
              this.details = details
            }
            this.loading = false
            return resolve(wallet)
          })
      })
    },
    async logout ({ commit, dispatch }) {
      await this.wallet?.disconnect()
      await this.setupWallet()
    },
    fetchMinterStores () {
      this.setupWallet().then(async () => {
        const query = minterStores
        const variables = { minter: `${this.details.accountId}` }
        const data = await this.$nuxt.$graphql.default.request(query, variables)
        this.stores = data.store
        console.log('accountId is', await this.wallet)
        await console.log('wallet is', this.wallet)
      })
    },
    fetchNiftyStore () {
      this.setupWallet().then(async () => {
        const query = fetchStore
        const variables = {
          storeId: 'niftiqet.mintspace2.testnet',
          limit: 10,
          offset: 0
        }
        const data = await this.$nuxt.$graphql.default.request(query, variables)
        this.niftyStore = data.store
      })
    },
    async fetchUserStore (storeId) {
      await console.log('this is', this.$nuxt.$graphql)
      const query = fetchStore
      const variables = {
        storeId,
        limit: 10,
        offset: 0
      }
      const data = await this.$nuxt.$graphql.default.request(query, variables)
      this.myStore = data.store
    }
  }
})
