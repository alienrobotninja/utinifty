<template>
  <div>
    <div class="p-4 flex gap-4">
      <button class="btn">Hello daisyUI</button>
      <select class="select w-full max-w-xs" v-model="colorMode.preference">
        <option disabled selected>Theme</option>
        <option v-for="theme of themes" :key="theme">{{ theme }}</option>
      </select>
    </div>
    <NuxtWelcome />
  </div>
</template>
<script setup>
    import useWallet from "./composables/use-wallet";
    const runtimeConfig = useRuntimeConfig()
    const appKey = runtimeConfig.public.API_KEY
    const { wallet, details, isConnected } = await useWallet(appKey)
    const colorMode = useColorMode();
    const themes = [
      'system',
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
    ];
</script>