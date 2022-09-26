<template>
  <div class="card shadow-xl">
    <figure class="px-5 pt-5">
      <img src="https://placeimg.com/400/225/arch" alt="Shoes" class="rounded-xl" />
    </figure>
    <div class="card-body items-center px-5 pt-5 text-left">
      <p><i class="cf cf-near mr-2"></i> Tickets for Everyone</p>
      <div class="divider"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NifCard"
}
</script>

<style lang="scss">
.card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  figure {
    height: 200px;
    img {
      height: 100%;
    }
  }
  .divider {
    margin: 0;
  }
}
</style>