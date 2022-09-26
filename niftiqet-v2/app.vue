<template>
  <NuxtLayout>
    <NuxtPage />
    <div>
      <div class="flex gap-4 p-4">
        <button class="btn">Hello daisyUI</button>
        <select class="w-full max-w-xs select" v-model="colorMode.preference">
          <option disabled selected>Theme</option>
          <option v-for="theme of themes" :key="theme">{{ theme }}</option>
        </select>
      </div>
      <div class="m-4">
        <FormKit
          type="datetime-local"
          value="2020-03-13T18:22"
          label="End of the world"
          help="When will the end of the world take place?"
          validation="required|after"
          validation-visibility="live"
        />
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
import useWallet from "./composables/use-wallet";
const runtimeConfig = useRuntimeConfig();
const appKey = runtimeConfig.public.API_KEY;
const { wallet, details, isConnected } = await useWallet(appKey);
const colorMode = useColorMode();
const themes = ["light", "dark"];
</script>
