import { recursiveExistsNodes, flattenNodes } from '@/utils';

const StructuredTagsRegExp = new RegExp('(.*)=(.*)');

// ['foo', 'foo', 'bar'] => { 'foo': 2, 'bar': 1 }
function weightOptions(options) {
  return options.reduce((weighted, option) => ({
    ...weighted,
    [option]: (weighted[option] || 0) + 1,
  }), {});
}

function sortOptionsByWeight(root, getOptionsFunc) {
  const weightedOptions = weightOptions(getOptionsFunc(root));
  return Object.keys(weightedOptions).sort((a, b) => weightedOptions[b] - weightedOptions[a]);
}

function getTagOptions(node) {
  console.log(node);
  return flattenNodes(node)
    .flatMap((n) => (n.tags ? n.tags : []))
    .filter((t) => t !== '')
    .filter((t) => !t.match(StructuredTagsRegExp));
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
      maxTags: 10,
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
    name: (_state, getters) => (filter) => {
      const selectedFilters = getters.getFilterOptions(filter);
      if (selectedFilters.length === 1) {
        return selectedFilters[0];
      }
      return filter.name;
    },
    isFiltering: (_state, getters) => (filter) => (
      getters.getFilterOptions(filter).length > 0
    ),
    isSelected: (_state, getters) => (filter, option) => {
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
          const { maxTags } = filter;
          return sortOptionsByWeight(root, getTagOptions)
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
