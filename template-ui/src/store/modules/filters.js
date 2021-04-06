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
  ],
};

export default {
  namespaced: true,
  state: { ...initialState, ...storeData },
  getters: {
    getFilterOptions: (state) => (filter) => (
      state.query[filter.name] || []
    ),
    query: (state) => state.query,
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
