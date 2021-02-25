import Vue from 'vue';
import Vuex from 'vuex';
import { getNodesTree } from '@/utils';

let storeData;
try {
  // eslint-disable-next-line global-require, import/no-unresolved
  storeData = require('@/overrides/options.json');
} catch {
  storeData = {};
}

Vue.use(Vuex);

const initialState = {
  // Channel and nodes, as they come from kolibri:
  channel: {},
  nodes: [],

  // Navigation state:
  section: {},
  parentSection: {},
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
  getters: {
    tree: (state) => getNodesTree(state.nodes),
    mainSections: (_, getters) => {
      if (getters.tree[0]) {
        return getters.tree[0].children.filter((n) => n.kind === 'topic');
      }
      return [];
    },
  },
});

export default store;
