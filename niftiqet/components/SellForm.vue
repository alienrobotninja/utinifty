<template>
  <div class="modal-card" style="width: auto">
    <h3 class="has-text-weight-semibold has-text-white">
      Sell Ticket
    </h3>
    <form class="mt-5" action="">
      <div class="field">
        <label class="label has-text-white">Ticket Price</label>
        <div class="control">
          <input v-model="price" class="input" type="number" placeholder="2 NEAR">
        </div>
        <p class="help">
          Price the ticket would sell for
        </p>
      </div>
      <b-button :loading="loading" class="w-full" type="is-primary" @click.prevent="listTicket">
        Put up for sale
      </b-button>
    </form>
  </div>
</template>

<script>
import { mapWritableState } from 'pinia'
import { useStore } from '@/store'

export default {
  name: 'SellForm',
  props: {
    tokenId: { type: String, default: null, required: false },
    storeId: { type: String, default: null, required: false }
  },
  data () {
    return {
      price: '',
      loading: false
    }
  },
  computed: {
    // same as above but registers it as this.myOwnName
    ...mapWritableState(useStore, ['wallet', 'details', 'isConnected', 'loading', 'creator'])
  },
  methods: {
    listTicket () {
      if (!this.price) {
        this.$buefy.toast.open({
          duration: 5000,
          message: 'Kindly the price field',
          type: 'is-danger'
        })
        return
      }
      this.wallet?.list(`${this.tokenId}`, `${this.storeId}`, `${this.price}`)
    }
  }
}
</script>

<style lang='scss'>
  .modal-card {
    padding: 40px;
    background: #031f23;
    border-radius: 25px;
    h3 {
      font-size: 1.3rem;
    }
  }
</style>
