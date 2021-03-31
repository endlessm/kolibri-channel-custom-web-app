<template>
  <div class="my-2">
    <b-dropdown
      class="mr-2"
      v-for="filter in availableFilters"
      :key="filter.name"
      :text="filter.prettyName"
      :variant="filter.variant"
    >

      <b-dropdown-group :header="filter.name">
        <b-dropdown-form
          v-for="option in filter.options"
          :key="option"
        >
          <b-form-checkbox
            :checked="isSelected(filter, option)"
            @change="onOptionClick(filter, option, ...arguments)"
          >
            {{ option }}
          </b-form-checkbox>
        </b-dropdown-form>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-form>
          <b-button variant="link" @click="clearFilter(filter)">Clear</b-button>
        </b-dropdown-form>
      </b-dropdown-group>
    </b-dropdown>
    <b-button variant="link" @click="clearAllFilters">Clear Filters</b-button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState(['filters']),
    ...mapGetters({
      name: 'filters/name',
      isFiltering: 'filters/isFiltering',
      isSelected: 'filters/isSelected',
    }),
    availableFilters() {
      return this.filters.metadata.map((f) => (
        {
          ...f,
          prettyName: this.name(f),
          variant: this.isFiltering(f) ? 'secondary' : 'outline-secondary',
        }
      ));
    },
  },
  methods: {
    onOptionClick(filter, option, checked) {
      this.$store.commit('filters/setFilterQuery', { filter, option, checked });
    },
    clearFilter(filter) {
      this.$store.commit('filters/clearFilterQuery', { filter });
    },
    clearAllFilters() {
      this.$store.commit('filters/clearFilterQuery', {});
    },
  },
};
</script>
