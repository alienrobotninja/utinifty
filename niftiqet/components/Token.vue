<template>
  <a href="#" class="ticket" @click="$emit('click')">
    <img :src="token?.thing?.metadata.media" alt="">
    <h3>{{ token?.thing?.metadata.title }}</h3>
    <p>
      <b-icon icon="clock-time-four-outline" />
      <span class="text--content"> {{ token?.thing?.metadata.extra ? token?.thing?.metadata.extra : 'No time Set' }} </span>
    </p>
    <div class="text--content mt-3 has-text-white"> {{ token.list ? formatNearAmount(Number(token.list.price).toLocaleString('fullwide', { useGrouping: false })) + " NEAR" : "Not Listed" }} </div>
  </a>
</template>

<script>
import { formatNearAmount } from 'near-api-js/lib/utils/format'
export default {
  name: 'DashToken',
  props: {
    token: { type: Object, default: null, required: false },
    id: { type: String, default: null, required: false }
  },
  setup () {
    return {
      formatNearAmount
    }
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
    border: solid 2px #f74d4d;
  }
  &.token--active {
    border: solid 2px #f74d4d;
  }
  &.token--burned {
    position: relative;
    background: hsl(348, 55%, 18%);
    &:after {
      content: 'Burned';
      position: absolute;
      top: 50%;
      font-size: 2.5rem;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-weight: bold;
      color: #fafafa;
      box-shadow: 1px 1px 10px #031C1E;
      padding: 10px;
      background: #000;
      border-radius: 25px;
      opacity: .7;
    }
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
