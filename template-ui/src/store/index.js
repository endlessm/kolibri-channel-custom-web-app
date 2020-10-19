import Vue from 'vue';
import Vuex from 'vuex';
import storeData from '@/overrides/store.json';

Vue.use(Vuex);

const initialState = {
  channel: {},
  nodes: [],
  section: {},
  parentSection: {},
  appName: '',
  logoAsset: 'logo.png',
  defaultThumbnailAsset: 'default-thumb.svg',
};

const store = new Vuex.Store({
  state: { ...initialState, ...storeData },
  mutations: {
    setChannelInformation(state, payload) {
      state.channel = payload.channel;
      state.nodes = payload.nodes;
    },
    setSection(state, payload) {
      state.section = payload.section;
      if ('parentSection' in payload) {
        state.parentSection = payload.parentSection;
      }
    },
  },
  // state: initialState,
  // mutations: {
  //   setAppName(state, appName) {
  //     state.appName = appName;
  //   },
  //   setLogoAsset(state, logoAsset) {
  //     state.logoAsset = logoAsset;
  //   },
  // },
});

// const setInitialState = () => {
//   if ('appName' in storeData) {
//     store.commit('setAppName', storeData.appName);
//   }
//   if ('logoAsset' in storeData) {
//     store.commit('setLogoAsset', storeData.logoAsset);
//   }
// };

// setInitialState();

export default store;
