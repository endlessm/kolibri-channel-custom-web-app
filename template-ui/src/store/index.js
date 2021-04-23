import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'underscore';
import { getNodesTree } from '@/utils';
import dynamicRequireAsset from '@/dynamicRequireAsset';
import { MediaQuality } from '@/constants';
import filters from './modules/filters';

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

function findNodeById(node, nodeId) {
  if (node.id === nodeId) {
    return node;
  }
  if (!node.children) {
    return null;
  }
  let result = null;
  node.children.some((n) => {
    result = findNodeById(n, nodeId);
    return result;
  });
  return result;
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
  tree: {},

  // Navigation state:
  content: {},
  section: {},
  mainSection: {},

  // Asset filenames that can be overriden:
  assetFilenames: {
    defaultThumbnail: 'default-card-thumbnail.svg',
    homeBackgroundImage: 'home-background.jpg',
    sectionBackgroundImage: 'section-background.jpg',
    headerImage: 'header-background.jpg',
    footerImage: 'footer-background.jpg',
  },

  // Layout:
  cardColumns: {
    cols: 6,
    md: 3,
  },

  // Carousel config:
  carouselNodeIds: [], // if empty we'll pick nodes randomly
  carouselSlideNumber: 3, // Only used if picking randomly, defaults to 3

  mediaQuality: MediaQuality.REGULAR,
  displayLogoInHeader: true,
};

const store = new Vuex.Store({
  state: { ...initialState, ...storeData },
  mutations: {
    setChannelInformation(state, payload) {
      state.channel = payload.channel;
      state.nodes = payload.nodes;
      state.tree = getNodesTree(payload.nodes);
    },
    setContentNavigation(state, payload) {
      state.content = state.nodes.find((n) => n.id === payload.contentId);
      state.section = state.content.ancestors[state.content.ancestors.length - 1];
      [, state.mainSection] = state.content.ancestors;
    },
    setSectionNavigation(state, payload) {
      const section = findNodeById(state.tree[0], payload.topicId);
      state.content = {};
      state.section = section;
      if (section.ancestors.length === 1) {
        state.mainSection = section;
      } else {
        [, state.mainSection] = section.ancestors;
      }
    },
    setHomeNavigation(state) {
      state.content = {};
      [state.section] = state.tree;
      state.mainSection = {};
    },
  },
  getters: {
    mainSections: (state) => {
      if (state.tree[0]) {
        return state.tree[0].children.filter((n) => n.kind === 'topic');
      }
      return [];
    },
    headerDescription: (state) => {
      if (state.section === state.tree[0]) {
        return state.channel.description;
      }
      return state.section.description;
    },
    getNodeUrl: (state) => (node) => {
      if (node.id === state.channel.id) {
        return '/';
      }
      if (node.kind === 'topic') {
        return `/t/${node.id}`;
      }
      return `/c/${node.id}`;
    },
    getTopicCardSubtitle: () => (node) => {
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
      return `${leaves.length} ${kindsLabel}`;
    },
    getCardSubtitle: (state, getters) => (node) => {
      if (node.kind === 'topic') {
        return getters.getTopicCardSubtitle(node);
      }
      const byLine = node.author || node.license_owner || state.channel.title;
      return `by ${byLine}`;
    },
    getAsset: (state) => (name) => dynamicRequireAsset(state.assetFilenames[name]),
    getAssetURL: (_state, getters) => (name) => {
      const asset = getters.getAsset(name);
      return asset ? `url(${asset})` : null;
    },
    isInlineLevel: (state) => state.section.children.every((n) => n.kind === 'topic'),
    getLevel: () => (node) => node.ancestors.length,
    getParentNode: (state) => (node) => {
      if (node.ancestors.length) {
        const parentId = node.ancestors[node.ancestors.length - 1].id;
        return findNodeById(state.tree[0], parentId);
      }
      return null;
    },
    getParentNodeUrl: (state, getters) => (node) => {
      if (_.isEmpty(node)) {
        return '';
      }
      const parentNode = getters.getParentNode(node);
      if (parentNode) {
        return getters.getNodeUrl(parentNode);
      }
      return '';
    },
    isHighQualityMedia: (state) => state.mediaQuality === MediaQuality.HIGH,
  },
  modules: {
    filters,
  },
});

export default store;
