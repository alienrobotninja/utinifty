<template>
  <header>
    <img class="bg--svg" src="/bg.svg" />
    <nav-bar />
    <div class="cto--container container px-4">
      <div class="cto--left">
        <h3 class="text-primary">NFTs TICKETING <br>
          <span class="text-base-content">MANAGEMENT SOLUTION</span></h3>
        <p class="text-base-content/80">
          Using our developer toolkits on NEAR, create, Buy and Sell your own NFT Ticket in marketplace. Let's begin creating your collections right away.
        </p>
        <nif-btn class="px-12 mr-5 mt-10">
          <i class="isax text-xl isax-designtools mr-2" />
          Explore
        </nif-btn>
        <nif-btn class="px-12 mt-10">
          <i class="isax text-xl isax-pen-add mr-2" />
          Create
        </nif-btn>
        <div class="avatar--group mt-10 flex items-center">
          <div class="avatar-group mr-5 -space-x-2">
            <div class="avatar">
              <div class="w-10">
                <img src="https://placeimg.com/192/192/people" />
              </div>
            </div>
            <div class="avatar">
              <div class="w-10">
                <img src="https://placeimg.com/192/192/people" />
              </div>
            </div>
            <div class="avatar">
              <div class="w-10">
                <img src="https://placeimg.com/192/192/people" />
              </div>
            </div>
            <div class="avatar placeholder">
              <div class="w-10 bg-accent-focus text-black">
                <span class="font-bold">2M</span>
              </div>
            </div>
          </div>
          <div class="">
            <span class="font-extrabold">
              2M+ <br>NFT TICKETS
            </span>
          </div>
        </div>
      </div>
      <div class="cto--right">
        <div class="card--layers">
          <div class="top--ly-card">
            <NifCard class="w-1/2" />
          </div>
          <div class="bottom--ly-card grid grid-cols-2 gap-10">
            <NifCard />
            <NifCard />
          </div>
        </div>
      </div>
    </div>
  </header>
  <slot />
</template>
<style lang="scss">
header {
  min-height: 100vh;
  position: relative;
  background: hsla(var(--b1) / var(--tw-bg-opacity, 0.37));
  backdrop-filter: blur(4px);
  .bg--svg {
    position: absolute;
    top: 0;
    right: 0;
    filter: contrast(80.1) blur(.1px) brightness(60%);
    //background: hsl(var(--b2)) url(/bg.png);
    width: auto;
    height: 120%;
    //opacity: .2;
    object-fit: cover;
    object-position: right top;
    opacity: .7;
  }
  & > * {
    position: relative;
    z-index: 2;
    &.sticky {
      z-index: 3;
    }
  }
  .cto--container {
    min-height: calc(100vh - 6rem);
    width: 100%;
    display: flex;
    align-items: center;
    .cto--left {
      width: 50%;
      padding-right: 30px;
      h3 {
        font-size: 2.3rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
      }
      p {
        font-size: 1.3rem;
      }
    }
    .cto--right {
      width: 50%;
      padding-left: 30px;
      height: 100%;
      .top--ly-card {
        display: flex;
        justify-content: center;
        position: relative;
        z-index: 2;
      }
      .bottom--ly-card {
        margin-top: -75px;
        position: relative;
      }
    }
  }
}
</style>
