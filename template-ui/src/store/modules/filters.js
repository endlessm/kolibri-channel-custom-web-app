import { recursiveExistsNodes } from '@/utils';

// Get all the tags present in the root node and children as an Object with
// tags as key and the weight as value
function getWeightedTags(root) {
  // The key is the tag name and the value is the number of content with that tag
  const weightedTags = {};

  if (root.tags) {
    root.tags.forEach((t) => {
      const count = weightedTags[t] || 0;
      weightedTags[t] = count + 1;
    });
  }
  if (root.children) {
    root.children.forEach((leaf) => {
      // Add tag count for every child
      const childrenWeightedTags = getWeightedTags(leaf);
      Object.keys(childrenWeightedTags).forEach((k) => {
        const count = weightedTags[k] || 0;
        const childCount = childrenWeightedTags[k];
        weightedTags[k] = count + childCount;
      });
    });
  }
  return weightedTags;
}

// Get all the tags present in the root node and children, sorted by most used
function getAllTags(root) {
  const tags = getWeightedTags(root);
  return Object.keys(tags).sort((a, b) => tags[a] - tags[b]).reverse();
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

const MediaFilterName = 'Media Type';
const TagFilterName = 'Common Keywords';

// Filter taxonomy, that can be overriden
const initialState = {
  // Object with all filters selected
  // key -> filter name
  // value -> array with all the selected options
  query: {},
  metadata: [
    {
      name: MediaFilterName,
      options: ContentNodeKinds,
    },
    {
      name: TagFilterName,
      options: [],
      maxTags: 10,
      exclude: [],
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
      const mediaType = query[MediaFilterName];
      if (mediaType && mediaType.length) {
        filtered = filtered.filter((node) => (
          mediaType.some((m) => recursiveExistsNodes(node, (n) => n.kind === m))
        ));
      }
      // Filter by tag
      const tags = query[TagFilterName];
      if (tags && tags.length) {
        filtered = filtered.filter((node) => (
          tags.some((t) => recursiveExistsNodes(node, (n) => n.tags && n.tags.includes(t)))
        ));
      }

      return filtered;
    },
    possibleOptions: () => (filter, root) => {
      switch (filter.name) {
        case MediaFilterName:
          return filter.options.filter((m) => recursiveExistsNodes(root, (n) => n.kind === m));
        case TagFilterName: {
          const { maxTags, options, exclude } = filter;
          if (options.length) {
            return options;
          }

          return getAllTags(root)
            .filter((t) => !exclude.includes(t))
            .slice(0, maxTags);
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
