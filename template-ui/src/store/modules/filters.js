import { recursiveExistsNodes } from '@/utils';

// Get all the tags present in the root node and children
function getAllTags(root) {
  let tags = [...(root.tags || [])];
  if (root.children) {
    root.children.forEach((leaf) => {
      tags = [...tags, ...getAllTags(leaf)];
    });
  }
  // Remove duplicates
  tags = tags.sort().filter((t, index, array) => t !== array[index - 1]);
  return tags;
}

let storeData;
try {
  // eslint-disable-next-line global-require, import/no-unresolved
  const data = require('@/overrides/options.json');
  if (data.filters) {
    storeData = data.filters;
  }
} catch {
  storeData = {};
}

// All the media types are defined in kolibri, this list is a subset of all the
// possible content node kinds defined here:
// https://github.com/learningequality/kolibri/blob/release-v0.14.x/kolibri/core/assets/src/constants.js#L17
const ContentNodeKinds = [
  'audio',
  'document',
  'video',
  'exercise',
  'html5',
  'exam',
  'lesson',
  'slideshow',
];

// Filter taxonomy, that can be overriden
const initialState = {
  // Object with all filters selected
  // key -> filter name
  // value -> array with all the selected options
  query: {},
  metadata: [
    {
      name: 'Media Type',
      options: ContentNodeKinds,
    },
    {
      name: 'Common Keywords',
      options: [],
    },
  ],
};

export default {
  namespaced: true,
  state: { ...initialState, ...storeData },
  getters: {
    isEmpty: (state) => {
      if (Object.keys(state.query).length === 0) {
        return true;
      }

      return !Object.keys(state.query).some((k) => state.query[k].length > 0);
    },
    getFilterOptions: (state) => (filter) => (
      state.query[filter.name] || []
    ),
    name: (state, getters) => (filter) => {
      const selectedFilters = getters.getFilterOptions(filter);
      if (selectedFilters.length === 1) {
        return selectedFilters[0];
      }
      return filter.name;
    },
    isFiltering: (state, getters) => (filter) => (
      getters.getFilterOptions(filter).length > 0
    ),
    isSelected: (state, getters) => (filter, option) => {
      const selectedFilters = getters.getFilterOptions(filter);
      return selectedFilters.includes(option);
    },
    filterNodes: (state) => (nodes) => {
      const { query } = state;
      let filtered = nodes;

      // Filter by media type
      const mediaType = query['Media Type'];
      if (mediaType && mediaType.length) {
        filtered = filtered.filter((node) => (
          mediaType.some((m) => recursiveExistsNodes(node, (n) => n.kind === m))
        ));
      }
      // Filter by tag
      const tags = query['Common Keywords'];
      if (tags && tags.length) {
        filtered = filtered.filter((node) => (
          tags.some((t) => recursiveExistsNodes(node, (n) => n.tags && n.tags.includes(t)))
        ));
      }

      return filtered;
    },
    possibleOptions: () => (filter, root) => {
      switch (filter.name) {
      // Filter by media type
        case 'Media Type':
          return filter.options.filter((m) => recursiveExistsNodes(root, (n) => n.kind === m));
        case 'Common Keywords': {
          return getAllTags(root);
        }
        default:
          return filter.options;
      }
    },
  },
  mutations: {
    setFilterQuery(state, payload) {
      const { filter, checked, option } = payload;
      const query = state.query || {};
      const selectedFilters = query[filter.name] || [];

      if (checked) {
        selectedFilters.push(option);
      } else {
        selectedFilters.splice(selectedFilters.indexOf(option), 1);
      }

      state.query = { ...query, [filter.name]: selectedFilters };
    },
    clearFilterQuery(state, payload) {
      const { filter } = payload;
      const query = state.query || {};
      let newQuery = {};
      if (filter) {
        newQuery = { ...query, [filter.name]: [] };
      }
      state.query = newQuery;
    },
  },
};
