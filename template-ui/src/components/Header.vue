<template>
  <b-container>
    <HeaderNavBar>
      <template v-slot:right>
        <b-nav-item v-b-toggle.collapse-search>
          <b-icon-search></b-icon-search>
        </b-nav-item>
      </template>
    </HeaderNavBar>

    <b-collapse
      id="collapse-search"
      v-model="searchVisible"
      @shown="searchShown"
      @hidden="searchHidden"
    >
      <HeaderSearchBar
        ref="searchBar"
        @hit="searchVisible = false"
      />
    </b-collapse>
  </b-container>
</template>

<script>

export default {
  name: 'Header',
  data() {
    return {
      searchVisible: false,
    };
  },
  methods: {
    searchShown() {
      this.$refs.searchBar.searchShown();
    },
    searchHidden() {
      // Empty search input on hide
      this.$refs.searchBar.searchHidden();
    },
  },
};
</script>
