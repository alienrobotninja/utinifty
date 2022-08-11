<template>
  <section class="section home container">
    <div class="left--cto">
      <span class="tag is-primary is-medium">Be on the Live Shows</span>
      <h2>Get Any <span>NFT</span> Tickets <br>Online</h2>
      <nuxt-link to="/ticketing" class="btn theme-btn">
        <span>Buy NFT Ticket</span>
      </nuxt-link>
    </div>

    <div class="right--media">
      <img class="shapes--img" src="~/assets/img/shapes.png" alt="">
      <div class="nft_imgs">
        <img src="~/assets/img/nft_imgs.png" alt="NFT Images">
        <div class="nft--stats">
          <div class="media--imgs">
            <img src="~/assets/img/avatars.png" alt="NFT Images">
            <span>More than 25K Users</span>
          </div>
          <span class="text--content">Millions of people create and sell NFT Ticket at NIFTQUET
            Marketplace.</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import fetchMinterStores from '~/apollo/queries/queries.js'

export default {
  name: 'IndexPage'
  /* apollo: {
    store: {
      query: fetchMinterStores,
      prefetch: true,
      variables () {
        return {
          minter: 'aef.testnet'
        }
      }
    }
  } */
}
</script>
<style lang="scss">
.home.container {
  min-height: calc(100vh - 5.4rem);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left--cto {
    width: 40%;

    .tag.is-primary {
      color: #53b6c4;
      background: rgba(83, 182, 196, 0.1);
      border-radius: 16px;
      font-size: 1.5rem;
      font-weight: 300;
    }

    h2 {
      font-size: 4.5rem;
      font-weight: 700;
      color: #fafafa;

      span {
        background: linear-gradient(270deg, #f42a8b 1.42%, #67d2e1 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
      }
    }

    .btn {
      margin-top: 40px;

      span {
        font-weight: 700;
      }
    }
  }

  .right--media {
    height: calc(100vh - 5.4rem - 6rem);
    width: 60%;
    text-align: right;
    position: relative;

    &:hover {
      img.shapes--img {
        width: 99%;
      }

      .nft_imgs {
        & > img {
          right: 17%;
        }
      }

      .nft_imgs {
        .nft--stats {
          backdrop-filter: blur(40px);
          bottom: 24%;
        }
      }
    }

    img.shapes--img {
      transition: all 0.3s ease-in-out;
      height: 100%;
      width: 100%;
    }

    .nft_imgs {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      text-align: left;

      & > img {
        position: absolute;
        right: 16%;
        height: 50%;
        top: 40%;
        transform: translateY(-50%);
        transition: all 0.3s ease-in-out;
      }

      .nft--stats {
        position: absolute;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border-radius: 20.0558px;
        padding: 20px;
        bottom: 25%;
        left: 50%;
        transition: all 0.3s ease-in-out;
        transform: translateX(-50%);

        .media--imgs {
          display: flex;
          align-items: center;
          justify-content: space-between;

          img {
            height: 40px;
            width: auto;
            object-fit: contain;
          }

          span {
            font-weight: 700;
            background: linear-gradient(270deg, #f42a8b 1.42%, #67d2e1 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            font-size: 1.2rem;
          }
        }

        .text--content {
          margin-top: 20px;
          display: block;
          text-align: left;
          font-weight: 700;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
