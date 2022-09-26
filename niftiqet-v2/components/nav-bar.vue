<template>
  <nav class="sticky top-0 backdrop-blur-md bg-base-100/5 transition-colors">
    <div class="container px-4 navbar">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabindex="0"
            class="p-2 mt-3 shadow menu dropdown-content rounded-box w-52"
          >
            <li><a>Marketplace</a></li>
            <li tabindex="0">
              <a class="justify-between">
                Resources
                <svg
                  class="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </a>
              <ul class="p-2">
                <li><a><icons-store /> Royalties</a></li>
                <li><a>Blog</a></li>
              </ul>
            </li>
            <li><a>Create</a></li>
          </ul>
        </div>
        <nuxt-link to="/" class="text-xl normal-case btn btn-ghost logo--link">
          <img src="/logo.png" class="logo--light" alt="">
          <img src="/logo-dark.png" class="logo--dark" alt="">
        </nuxt-link>
      </div>
      <div class="hidden navbar-center lg:flex">
        <ul class="p-0 menu menu-horizontal">
          <li tabindex="0">
            <a>
              Resources
              <svg
                class="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul class="p-2">
              <li><a><icons-store /> Store</a></li>
              <li><a>Blog</a></li>
            </ul>
          </li>
          <li><a>Marketplace</a></li>
          <li><a>Create</a></li>
        </ul>
      </div>
      <div class="navbar-end">
        <button class="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>

        <button @click.prevent="toggleMode" class="btn btn-ghost btn-circle mr-5">
          <!-- sun icon -->
          <svg class="swap-on fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
          <!-- moon icon -->
          <svg class="swap-off fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>

        </button>
        <nif-btn>
          <i class="cf cf-near mr-2"></i> NEAR Login
        </nif-btn>
      </div>
    </div>
  </nav>
</template>
<style lang="scss">
nav {
  //background-color: hsla(var(--b1) / var(--tw-bg-opacity, 0.3));
  //backdrop-filter: blur(2px);
  .navbar {
    background: transparent;
    min-height: 6rem;
    // backdrop-filter: blur(25px);
  }
  .logo--link {
    height: 35px;
    img {
      display: none;
      height: 100%;
    }
  }
}
[data-theme="dark"] {
  nav {
    .logo--light {
      display: none;
    }
    .logo--dark {
      display: block;
    }
    .swap-on {
      display: none;
    }
    .swap-off {
      display: block;
    }
  }
}
[data-theme="light"] {
  nav {
    .logo--dark {
      display: none;
    }
    .logo--light {
      display: block;
    }
    .swap-on {
      display: block;
    }
    .swap-off {
      display: none;
    }
  }
}
.menu-horizontal {
  ul {
    background: hsla(var(--b1)/0.9);
    backdrop-filter: blur(2px);
  }
}
  .dropdown-content {
    background: hsla(var(--b1)/0.9);
    backdrop-filter: blur(2px);
    ul {
      background: hsla(var(--b1)/0.9);
      backdrop-filter: blur(2px);
    }
  }
</style>
<script setup>
const colorMode = useColorMode();
let on = colorMode.preference === "dark"
const toggleMode = () => {
  on = !on;
  colorMode.preference = on ? 'dark' : 'light'
}
</script>
