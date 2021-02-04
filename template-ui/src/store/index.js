import Vue from 'vue';
import Vuex from 'vuex';
import storeData from '@/overrides/store.json';

Vue.use(Vuex);

const initialState = {
  channel: {},
  nodes: [],
  section: {},
  parentSection: {},
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
});

export default store;
