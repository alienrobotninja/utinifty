<template>
  <div class="modal-card" style="width: auto">
    <h3 class="has-text-weight-semibold has-text-white">
      Create a new Store
    </h3>
    <form class="mt-5" action="">
      <div class="field">
        <label class="label has-text-white">Store name</label>
        <div class="control">
          <input v-model="storeId" class="input" type="text" placeholder="mintbase-store">
        </div>
        <p class="help">
          Name of the store (small letters only)
        </p>
      </div>
      <div class="field mt-3">
        <label class="label has-text-white">Store Symbol</label>
        <div class="control">
          <input v-model="symbol" class="input" type="text" placeholder="MNTSTR">
        </div>
        <p class="help">
          Short form for store
        </p>
      </div>
      <button class="button is-primary w-full" @click.prevent="deployStore">
        Deploy Store
      </button>
    </form>
  </div>
</template>

<script>
import { mapWritableState } from 'pinia'
import { useStore } from '@/store'

export default {
  name: 'StoreForm',
  data () {
    return {
      storeId: '',
      symbol: ''
    }
  },
  computed: {
    // same as above but registers it as this.myOwnName
    ...mapWritableState(useStore, ['wallet', 'details', 'isConnected', 'loading', 'creator'])
  },
  methods: {
    deployStore () {
      if (!this.symbol || !this.storeId) {
        this.$buefy.toast.open({
          duration: 5000,
          message: 'Kindly fill all fields',
          type: 'is-danger'
        })
        return
      }
      this.wallet?.deployStore(this.storeId, this.symbol)
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
