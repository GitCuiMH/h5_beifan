import { Commit } from 'vuex'
export default{
  namespaced: true,
  state: {
    userInfo: {},
    addrInfo: {},
    tabIndex: 0,
    skuInfos: {},
    userList: [],
    gdindtl: -1,
    loading: false,
    introType: 0,
    name: 'username',
    value: 'uservalue'
  },
  mutations: {
    SET_userInfo: (state: any, infos: any) => {
      state.userInfo = infos
    },
    SET_tabIndex: (state: any, infos: any) => {
      state.tabIndex = infos
    },
    SET_ADDRINFO: (state: any, infos: any) => {
      state.addrInfo = infos
    },
    TOGGLE_VALUE: (state: any, device: string) => {
      state.value = device
    },
    TOGGLE_gdindtl: (state: any, infos: number) => {
      state.gdindtl = infos
    },
    TOGGLE_USERLISTS: (state: any, infos: number) => {
      state.userList = infos
    },
    TOGGLE_DOCINFO: (state: any, info: string) => {
      state.skuInfos = info
    },
    TOGGLE_LOADING: (state: any, device: boolean) => {
      state.loading = device
    },
    TOGGLE_NAME: (state: any, device: string) => {
      state.name = device
    },
    SET_TYPE: (state: any, type: number) => {
      state.introType = type
    }
  },
  actions: {
    setName( context: { commit: Commit }, newName: string) {
      context.commit('TOGGLE_NAME', newName)
    },
    setVal( context: { commit: Commit }, newVal: string) {
      context.commit('TOGGLE_VALUE', newVal)
    },
    setLoading( context: { commit: Commit }, newVal: boolean) {
      context.commit('TOGGLE_LOADING', newVal)
    }
  }
};
