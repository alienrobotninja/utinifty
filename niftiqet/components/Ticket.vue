<template>
  <nuxt-link :to="`/ticketing/${id}`" class="ticket">
    <img :src="token?.media" alt="">
    <h3>{{ token?.title }}</h3>
    <p>
      <b-icon icon="clock-time-four-outline" />
      <span class="text--content"> {{ token?.extra ? token?.extra : 'No time Set' }} </span>
    </p>
  </nuxt-link>
</template>

<script>
export default {
  name: 'DashTicket',
  props: {
    token: { type: Object, default: null, required: false },
    id: { type: String, default: null, required: false }
  }
}
</script>

<style lang="scss">
.ticket {
  display: flex;
  flex-direction: column;
  padding: 12px;
  background: #031C1E;
  border-radius: 14.8322px;
  transition: .3s ease-in-out;
  &:hover {
    transform: scale(1.07);
  }
  img {
    height: 150px;
    width: auto;
    object-fit: cover;
    border-radius: 11.1242px;
  }
  h3 {
    font-size: .88rem;
    color: #ADB9C7;
    font-weight: 600;
    margin-top: 15px;
  }
  p {
    color: #fafafa;
    font-size: .88rem;
    display: flex;
    align-items: center;
    margin-top: 8px;
    .text--content {
      display: block;
      margin-left: 10px;
    }
  }
}
</style>
