import Vue from 'vue';
import Vuex from 'vuex';
import { getNodesTree } from '@/utils';
import dynamicRequireAsset from '@/dynamicRequireAsset';

let storeData;
try {
  // eslint-disable-next-line global-require, import/no-unresolved
  storeData = require('@/overrides/options.json');
} catch {
  storeData = {};
}

Vue.use(Vuex);

function getLeaves(node) {
  if (!node.children) {
    return [node];
  }
  return node.children
    .map(getLeaves)
    .reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
}

const defaultKindLabel = 'items';

// See https://github.com/learningequality/le-utils/blob/master/le_utils/constants/content_kinds.py
const labelPerKind = {
  video: 'videos',
  audio: 'audios',
  document: 'documents',
  html5: 'applications',
};

const initialState = {
  // Channel and nodes, as they come from kolibri:
  channel: {},
  nodes: [],

  // Navigation state:
  section: {},
  parentSection: {},

  // Asset filenames that can be overriden:
  assetFilenames: {
    defaultThumbnail: 'default-card-thumbnail.svg',
    homeBackgroundImage: 'home-background.jpg',
    sectionBackgroundImage: 'section-background.jpg',
    footerImage: 'footer-background.jpg',
  },

  // Layout:
  cardColumns: {
    cols: 6,
    md: 4,
  },
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
    getCardLabel: () => (node) => {
      const leaves = getLeaves(node);
      const leavesKinds = leaves.map((leaf) => leaf.kind);
      const uniqueLeavesKinds = new Set(leavesKinds);
      let kindsLabel;
      if (uniqueLeavesKinds.size > 1) {
        kindsLabel = defaultKindLabel;
      } else {
        const kind = uniqueLeavesKinds.values().next().value;
        kindsLabel = labelPerKind[kind] || defaultKindLabel;
      }
      return `${node.title} - ${leaves.length} ${kindsLabel}`;
    },
    getAsset: (state) => (name) => dynamicRequireAsset(state.assetFilenames[name]),
    getAssetURL: (_, getters) => (name) => {
      const asset = getters.getAsset(name);
      return asset ? `url(${asset})` : null;
    },
    isInlineLevel: (state) => state.section.children.every((n) => n.kind === 'topic'),
    getLevel: () => (node) => node.ancestors.length,
  },
});

export default store;
