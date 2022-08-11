<template>
  <b-sidebar
    position="static"
    type="is-primary"
    :fullheight="true"
    :mobile="mobile"
    :expand-on-hover="expandOnHover"
    :reduce="reduce"
    :delay="expandWithDelay ? 500 : null"
    open
  >
    <div class="px-6">
      <div class="block py-6">
        <nuxt-link to="/" class="has-text-white">
          NIFTIQET
        </nuxt-link>
      </div>
      <b-menu class="is-custom-mobile">
        <b-menu-list label="MarketPlace">
          <b-menu-item tag="nuxt-link" to="/ticketing" icon="view-dashboard-outline" label="Home" />
          <b-menu-item tag="nuxt-link" to="/ticketing" icon="storefront-outline" label="Burn" />
        </b-menu-list>
        <b-menu-list class="pt-3" label="Manage">
          <b-menu-item
            v-if="isConnected"
            tag="a"
            href="#"
            icon="logout"
            label="Logout"
            @click.prevent="disconnectWallet"
          />
          <b-menu-item
            v-else
            tag="a"
            href="#"
            icon="login"
            label="Login"
            @click.prevent="
              store.wallet?.connect({ requestSignIn: true })
            "
          />
        </b-menu-list>
      </b-menu>
    </div>
  </b-sidebar>
<!--  <div class="sidebar-page">
    <section class="sidebar-layout">
    </section>
  </div>-->
</template>

<script>
import { mapState } from 'pinia'
import { useStore } from '../store'

export default {
  name: 'DashSideBar',
  setup () {
    const store = useStore()

    return { store }
  },
  data () {
    return {
      expandOnHover: false,
      expandWithDelay: false,
      mobile: 'hide',
      reduce: false
    }
  },
  computed: {
    // same as above but registers it as this.myOwnName
    ...mapState(useStore, ['wallet', 'details', 'isConnected', 'loading', 'creator'])
  },
  methods: {
    async disconnectWallet () {
      await this.store?.wallet?.disconnect()
      this.store?.setupWallet()
    }
  }
}
</script>

<style lang="scss">
  .p-1 {
    padding: 1em;
  }

  .sidebar-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;

    // min-height: 100vh;
    .sidebar-layout {
      display: flex;
      flex-direction: row;
      min-height: 100%;
      // min-height: 100vh;
    }
  }
  .b-sidebar {
    .sidebar-content {
      .menu-list {
        li {
          padding-top: 10px;
        }
      }
    }
  }

  @media screen and (max-width: 1023px) {
    .b-sidebar {
      .sidebar-content {
        .menu-list {
          li {
            padding: 10px 0;
          }
        }
        &.is-mini-mobile {

          &:not(.is-mini-expand),
          &.is-mini-expand:not(:hover):not(.is-mini-delayed) {
            .menu-list {
              li {
                a {
                  span:nth-child(2) {
                    display: none;
                  }
                }

                ul {
                  padding-left: 0;

                  li {
                    a {
                      display: inline-block;
                    }
                  }
                }
              }
            }

            .menu-label:not(:last-child) {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 1024px) {
    .b-sidebar {
      .sidebar-content {
        &.is-mini {

          &:not(.is-mini-expand),
          &.is-mini-expand:not(:hover):not(.is-mini-delayed) {
            .menu-list {
              li {
                a {
                  span:nth-child(2) {
                    display: none;
                  }
                }

                ul {
                  padding-left: 0;

                  li {
                    a {
                      display: inline-block;
                    }
                  }
                }
              }
            }

            .menu-label:not(:last-child) {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }

  .is-mini-expand {
    .menu-list a {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
