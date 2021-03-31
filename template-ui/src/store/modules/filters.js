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

// Filter taxonomy, that can be overriden
const initialState = {
  // Object with all filters selected
  // key -> filter name
  // value -> array with all the selected options
  query: {},
  metadata: [
    {
      name: 'Media Type',
      options: [
        'Video',
        'Worksheet',
        'Game',
        'Simulation',
        'Book',
      ],
    },
  ],
};

export default {
  namespaced: true,
  state: { ...initialState, ...storeData },
  getters: {
    getFilterOptions: (state) => (filter) => {
      if (!state.query) {
        return [];
      }
      return state.query[filter.name] || [];
    },
    name: (state, getters) => (filter) => {
      const selectedFilters = getters.getFilterOptions(filter);
      if (selectedFilters.length === 1) {
        return selectedFilters[0];
      }
      return filter.name;
    },
    filtering: (state, getters) => (filter) => (
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
