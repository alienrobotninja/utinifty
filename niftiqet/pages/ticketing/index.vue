<template>
  <section class="ticketing">
    <div class="ticketing--header">
      <div class="banner" :class="{'w-full' : !creator}">
        <h2>Discover, Create and <br>Sell Your Own NFT <br>Ticket.</h2>
        <a
          class="button mt-3 is-primary"
          href="#"
          @click.prevent="createStore = true"
        >
          <span class="has-text-weight-semibold ">
            Create Store
          </span>
        </a>
        <img src="~/assets/img/banner-inner.png" alt="Inner banner image">
      </div>
      <div v-if="creator" class="minter">
        <img src="~/assets/img/mint-img.png" alt="Minter image">
        <nuxt-link
          class="w-full button is-primary"
          to="/ticketing/mint"
        >
          <span class="has-text-weight-semibold ">
            Mint Ticket
          </span>
        </nuxt-link>
      </div>
    </div>
    <div class="tickets">
      <h3 class="has-text-white has-text-weight-semibold mb-3">
        Niftiqet Store Tickets
      </h3>
      <div v-if="store?.niftyStore?.length" class="ticket--grid mb-5">
        <DashTicket v-for="(token, i) in store?.niftyStore[0].tokens" :id="token?.id" :key="i" :token="token?.thing?.metadata" @click="setThing($event, token)" />
      </div>
      <h3 class="has-text-white has-text-weight-semibold mb-3">
        My Store Tickets
      </h3>
      <b-field class="mt-5" label="Select Store" label-position="inside">
        <b-select v-model="selectedStore" class="custom" placeholder="Select a store" @input="setSTore">
          <option value="" disabled>
            Select a store
          </option>
          <option v-for="(aStore, i) in store.stores" :key="i" :value="aStore.id">
            {{ aStore.name }}
          </option>
        </b-select>
      </b-field>
      <div v-if="store?.myStore?.length" class="ticket--grid">
        <DashTicket v-for="(token, i) in store?.myStore[0].tokens" :id="token?.id" :key="i" :token="token?.thing?.metadata" @click="setThing($event, token)" />
      </div>
    </div>
    <b-modal
      v-model="createStore"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Example Modal"
      close-button-aria-label="Close"
      aria-modal
    >
      <template #default="props">
        <StoreForm @close="props.close" />
      </template>
    </b-modal>
  </section>
</template>

<script>
import { mapWritableState } from 'pinia'
import { useStore } from '@/store'
import DashTicket from '@/components/Ticket'

export default {
  name: 'TicketingPage',
  components: { DashTicket },
  layout: 'dashboard',
  setup () {
    const store = useStore()

    return { store }
  },
  data () {
    return {
      createStore: false,
      selectedStore: ''
    }
  },
  computed: {
    // same as above but registers it as this.myOwnName
    ...mapWritableState(useStore, ['wallet', 'details', 'isConnected', 'loading', 'creator', 'activeThing'])
  },
  methods: {
    async setSTore (e) {
      console.log('event is', e)
      await this.store.fetchUserStore(e)
    },
    setThing (_, thing) {
      this.activeThing = thing
      this.$router.push('/ticketing/thing')
    }
  }
}
</script>
<style lang="scss">
.ticketing {
  .ticketing--header {
    height: 250px;
    display: flex;
    .banner {
      width: calc(100% - 290px);
      background:  url(~/assets/img/banner.png) no-repeat, linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 0px 1px rgba(0, 0, 0, 0.04);
      background-size: cover;
      height: 100%;
      border-radius: 35px;
      padding: 40px;
      position: relative;
      transition: .3s ease-in-out;
      &.w-full {
        width: 100%;
      }
      h2 {
        color: #ffffff;
        font-size: 2rem;
        line-height: 1;
        font-weight: 700;
      }
      img {
        position: absolute;
        right: 50px;
        top: 20%;
        height: 250px;
      }
    }
    .minter {
      width: 250px;
      height: 100%;
      background: #031C1E;
      margin-left: 40px;
      border-radius: 35px;
      padding: 20px;
      transition: .3s ease-in-out;
      .button.is-primary {
        background: linear-gradient(270deg, #f42a8b 1.42%, #67d2e1 100%);
        border-radius: 8px;
        border: 0;
        transition: all 0.3s ease-in-out;
        .icon {
          color: transparent;
        }
        &.hover {
          background: linear-gradient(270deg, #f42a8b 10.42%, #67d2e1 90%);
        }
      }
    }
  }
  .tickets {
    padding-top: 50px;
    .ticket--grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 20px;
    }
  }
}
.w-full {
  width: 100%;
}
</style>
