<template>
  <section class="thing--details">
    <div class="tokens">
      <DashToken
        v-for="(token, i) in tokens"
        :id="token?.id"
        :key="i"
        :class="{'token--active': activeToken?.id === token?.id}"
        :token="token"
        @click="setActiveToken($event, token)"
      />
    </div>
    <div class="token--details">
      <div class="token--info">
        <h3>{{ activeToken ? activeToken.thing.metadata.title : "Loading...." }}</h3>
        <div class="owner--minter">
          <div class="minter">
            <h2>
              Creator
            </h2>
            <div class="user--img">
              <i class="cf cf-near" />
              <p class="ml-2">
                {{ activeToken ? activeToken?.minter : "Loading...." }}
              </p>
            </div>
          </div>
          <div class="owner">
            <h2>
              Owner
            </h2>
            <div class="user--img">
              <i class="cf cf-near" />
              <p class="ml-2">
                {{ activeToken ? activeToken?.ownerId : "Loading...." }}
              </p>
            </div>
          </div>
        </div>
        <div class="splits mt-5">
          <div class="forever--royalties">
            <h4>Forever Royalties</h4>
            <p>{{ activeToken?.royaltyPercent || "0" }}%</p>
          </div>
          <div class="split--revenue">
            <h4>Split Revenue</h4>
            <p>{{ activeToken?.splits?.percent || "0" }}%</p>
          </div>
          <div class="market--percent">
            <h4>Market Percentage</h4>
            <p>2.5%</p>
          </div>
        </div>
      </div>
      <div class="token--actions">
        <b-button type="is-success" :disabled="details?.accountId === activeToken?.ownerId || activeToken?.list?.ownerId === details?.accountId">
          Buy
        </b-button>
        <b-button type="is-danger" :disabled="details?.accountId !== activeToken?.ownerId">
          Burn
        </b-button>
        <b-button type="is-dark" :disabled="details?.accountId !== activeToken?.ownerId" @click.prevent="sellTIcket = true">
          Sell
        </b-button>
      </div>
    </div>
    <b-modal
      v-model="sellTIcket"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Example Modal"
      close-button-aria-label="Close"
      aria-modal
    >
      <template #default="props">
        <SellForm :store-id="activeToken?.thing?.storeId" :token-id="strip(activeToken?.id, '', ':')" @close="props.close" />
      </template>
    </b-modal>
  </section>
</template>

<script>
import { mapWritableState } from 'pinia'
import { useStore } from '@/store'
import DashToken from '@/components/Token'

export default {
  name: 'ThingPage',
  components: { DashToken },
  layout: 'dashboard',
  setup () {
    const store = useStore()

    return { store }
  },
  data () {
    return {
      sellTIcket: false,
      selectedStore: '',
      activeToken: null
    }
  },
  computed: {
    storeName () {
      return this.$route?.params?.thing?.slice(this.$route?.params?.thing?.indexOf(':') + 1)
      // .match(/\[(.*)\]/).pop();
    },
    tokens () {
      const that = this
      return this.myStore[0]?.tokens?.find((myToken) => {
        return myToken?.id === that?.ticketId
      })?.thing?.tokens
    },
    ticketId () {
      return this.$route?.params?.thing
      // .match(/\[(.*)\]/).pop();
    },
    // same as above but registers it as this.myOwnName
    ...mapWritableState(useStore, ['wallet', 'details', 'isConnected', 'loading', 'creator', 'myStore'])
  },
  async mounted () {
    await this.store.fetchUserStore(this.storeName)
  },
  beforeDestroy () {
    this.store.myStore = {}
  },
  methods: {
    async setSTore (e) {
      console.log('event is', e)
      await this.store.fetchUserStore(e)
    },
    strip (text, begin, end) {
      const firstChar = text.indexOf(begin) + begin.length
      const lastChar = text.indexOf(end)
      return text.substring(firstChar, lastChar)
    },
    setActiveToken (_, token) {
      this.activeToken = token
    },
    sellToken () {

    }
  }
}
</script>
<style lang="scss">
hr {
  background-color: rgba(13, 135, 139, 0.65);
  border: none;
  display: block;
  height: 1px;
  margin: .7rem 0;
}
  .thing--details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
    .tokens {
      display: grid;
      padding: 10px;
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      grid-auto-rows: max-content
    }
    .token--details {
      background: #031C1E;
      border-radius: 10px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h3 {
        color: #fafafa;
        font-weight: 600;
        font-size: 1.3rem;
        width: 80%;
      }
      .owner--minter {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
        margin-top: 80px;
        & > div {
          padding: 10px;
          background: rgb(6, 52, 53);
          border-radius: 15px;
          border: solid .5px rgba(247, 77, 77, 0.35);
        }
        h2 {
          color: rgba(17, 173, 178, 0.65);
        }
        .user--img {
          position: relative;
          display: flex;
          align-items: center;
          margin-top: 8px;
          color: #fafafa;
          i {
            display: inline-block;
            border-radius: 50%;
            padding: 10px;
            border: solid rgba(13, 135, 139, 0.65) .5px;
            color: #f74d4d;
          }
        }
      }
      .splits {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 20px;
        h4 {
          font-weight: 300;
          font-size: .96rem;
          color: rgba(17, 173, 178, 0.65);
        }
        p {
          color: #fafafa;
          font-size: .8rem;
        }
        & > div {
          padding: 10px;
          background: rgb(6, 52, 53);
          border-radius: 15px;
          border: solid .5px rgba(247, 77, 77, 0.35);
        }
      }
      .token--actions{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 20px;
        button.is-success {
          background: rgba(13, 135, 139, 0.65);
          &:hover {
            background: rgba(7, 75, 77, 0.65);
          }
        }
        button.is-danger {
          background: hsl(348, 55%, 37%);
          &:hover {
            background: hsl(348, 55%, 18%);
          }
        }
        button.is-dark {
          background: hsl(0, 0%, 14%);
          &:hover {
            background: hsl(0, 2%, 10%);
          }
        }
      }
    }
  }
</style>
