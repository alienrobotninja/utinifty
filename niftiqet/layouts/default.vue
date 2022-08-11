<template>
  <div class="">
    <header class="page--header">
      <NavBar />
      <Nuxt />
    </header>
  </div>
</template>

<script>
import { useStore } from '@/store'

export default {
  name: 'DefaultLayout',
  setup () {
    const store = useStore()

    return { store }
  },
  async mounted () {
    await this.store.setupWallet()
  }
}
</script>
<style lang="scss">
.page--header {
  min-height: 100vh;
  background: url('~/assets/img/bg.png') no-repeat fixed;
  background-size: cover;
}
</style>
