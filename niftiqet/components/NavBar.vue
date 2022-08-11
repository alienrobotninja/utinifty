<template>
  <div>
    <b-navbar class="container" :transparent="true">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <span class="has-text-white">NIFTIQET</span>
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item tag="div">
          <b-navbar-item :to="{ path: '/' }">
            About
          </b-navbar-item>
          <b-navbar-item tag="nuxt-link" to="/ticketing">
            Ticketing
          </b-navbar-item>
          <b-navbar-item href="#">
            FAQs
          </b-navbar-item>
          <div class="navbar-item">
            <div class="field is-grouped">
              <div class="control">
                <a
                  v-if="!isConnected"
                  class="button is-primary"
                  href="#"
                  @click.prevent="
                    store.wallet?.connect({ requestSignIn: true })
                  "
                >
                  <span class="icon-wallet">
                    <IconsWallet />
                  </span>
                  <span class="has-text-weight-semibold">{{
                    loading ? 'Processing...' : 'Connect Wallet'
                  }}</span>
                </a>
                <b-dropdown
                  v-else
                  position="is-bottom-left"
                  append-to-body
                  aria-role="menu"
                >
                  <template #trigger>
                    <!--                    <a
                      class="navbar-item"
                      role="button"
                    >
                      <span class="has-text-weight-semibold">{{ loading ? "Processing..." : details?.accountId }}</span>
                      <b-icon icon="menu-down" type="is-white" />
                    </a>-->
                    <b-button
                      :label="loading ? 'Processing...' : details?.accountId"
                      type="is-primary"
                      tag="a"
                      icon-right="menu-down"
                    />
                  </template>
                  <!--                  <b-dropdown-item value="settings">
                    Settings
                  </b-dropdown-item>-->
                  <b-dropdown-item
                    value="logout"
                    aria-role="menuitem"
                    @click="disconnectWallet"
                  >
                    Logout
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useStore } from '@/store'

export default {
  name: 'NavBar',
  setup () {
    const store = useStore()

    return { store }
  },
  data () {
    return {
      checking: 'home'
    }
  },
  computed: {
    // same as above but registers it as this.myOwnName
    ...mapState(useStore, ['wallet', 'details', 'isConnected', 'loading'])
  },
  methods: {
    async disconnectWallet () {
      await this.store?.wallet?.disconnect()
      this.store?.setupWallet()
    }
  }
}
</script>

<style scoped lang="scss"></style>
