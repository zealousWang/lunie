import config from "src/../config"
import { Networks } from "../../gql"

export default function ({ apollo }) {
  const state = {
    stopConnecting: false,
    connected: true, // TODO do connection test
    network: config.network, // network id to reference network capabilities stored in Hasura
    externals: {
      config
    }
  }

  const mutations = {
    setNetworkId(state, networkId) {
      state.network = networkId
    }
  }

  const actions = {
    async checkForPersistedNetwork({ dispatch, commit }) {
      const persistedNetwork = JSON.parse(localStorage.getItem(`network`))
      console.log(persistedNetwork)
      const { data } = await apollo.query({
        query: Networks,
        fetchPolicy: "cache-first"
      })
      let availableNetworks = Object.values(data.networks).map(
        network => network.id
      )
      if (persistedNetwork && availableNetworks.includes(persistedNetwork)) {
        console.log(persistedNetwork)
        commit(`setNetworkId`, persistedNetwork)
        console.log(state.network)
      } else {
        const defaultNetwork = state.externals.config.network
        if (availableNetworks.find(network => network === defaultNetwork)) {
          await dispatch(
            `setNetwork`,
            data.networks.find(({ id }) => id === defaultNetwork)
          )
        } else {
          // otherwise we connect to a fallback network
          await dispatch(
            `setNetwork`,
            data.networks.find(
              ({ id }) => id === state.externals.config.fallbackNetwork
            )
          )
        }
      }
    },
    async persistNetwork(store, networkId) {
      console.log('setting persisted network:', networkId)
      localStorage.setItem(`network`, JSON.stringify(networkId))
    },
    async setNetwork({ commit, dispatch }, networkId) {
      console.log(2, networkId)
      dispatch(`signOut`)
      dispatch(`persistNetwork`, networkId)
      commit("setNetworkId", networkId)
      dispatch(`checkForPersistedSession`) // check for persisted session on that network
      console.info(`Connecting to: ${networkId}`)
    }
  }

  return {
    state,
    mutations,
    actions
  }
}
