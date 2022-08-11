export default (context) => {
  return {
    httpEndpoint:
      process.env.PUBLIC_MINTBASEJS_NETWORK === 'testnet'
        ? process.env.GRAPH_TESTNET_HTTPS_URI
        : process.env.GRAPH_MAINNET_HTTPS_URI,

    // See https://www.apollographql.com/docs/link/links/http.html#options
    httpLinkOptions: {
      credentials: 'same-origin',
      headers: {
        'x-hasura-role': 'anonymous'
      }
    },

    // You can use `wss` for secure connection (recommended in production)
    // Use `null` to disable subscriptions
    wsEndpoint:
      process.env.PUBLIC_MINTBASEJS_NETWORK === 'testnet'
        ? process.env.GRAPH_TESTNET_WSS_URI
        : process.env.GRAPH_MAINNET_WSS_URI,
    // LocalStorage token
    tokenName: 'nift-token',

    // Enable Automatic Query persisting with Apollo Engine
    persisting: true,

    // Use websockets for everything (no HTTP)
    // You need to pass a `wsEndpoint` for this to work
    websocketsOnly: false
  }
}
