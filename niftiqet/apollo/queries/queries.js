import { gql } from 'nuxt-graphql-request'

export const minterStores = gql`
    query FetchMinterStores($minter: String!) {
    store(where: { minters: { account: { _eq: $minter } } }) {
      id
      name
    }
  }
`

export const fetchStore = gql`
  query FetchStore($storeId: String!, $limit: Int = 20, $offset: Int = 0) {
    store(where: { id: { _eq: $storeId } }) {
      id
      name
      symbol
      baseUri
      owner
      minters {
        account
        enabled
      }

      tokens(
        order_by: { thingId: asc }
        where: { storeId: { _eq: $storeId }, burnedAt: { _is_null: true }, thing: {metadata: {id: {_is_null: false}}} }
        limit: $limit
        offset: $offset
        distinct_on: thingId
      ) {
        id
        thingId
        list {
          acceptedOfferId
          autotransfer
          contractId
          createdAt
          id
          price
          ownerId
          thingId
        }
        thing {
          id
          metaId
          memo
          storeId
          tokens {
            minter
            id
            thingId
            ownerId
            royaltyPercent
            burnedAt
            splits {
              id
              percent
            }
            thing {
              storeId
              metadata {
                thing_id
                media
                id
                title
                type
                description
                extra
              }
            }
            list {
              acceptedOfferId
              autotransfer
              contractId
              createdAt
              id
              price
              ownerId
              thingId
            }
          }
          metadata {
            thing_id
            media
            id
            title
            type
            description
            extra
          }
        }
      }
    }
  }
`
