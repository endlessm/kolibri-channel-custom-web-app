<template>
  <b-row>
    <b-col md="12">
      <vue-bootstrap-typeahead
        ref="search"
        v-model="query"
        placeholder="Search"
        :serializer="searchLabel"
        :data="searchNodes"
        v-on:hit="goToContent"
      />
    </b-col>
  </b-row>
</template>

<script>
import { goToContent } from 'kolibri-api';
import { mapState } from 'vuex';
import _ from 'underscore';

export default {
  name: 'HeaderSearchBar',
  data() {
    return {
      query: '',
      searchNodes: [],
    };
  },
  computed: {
    ...mapState(['nodes']),
  },
  watch: {
    // eslint-disable-next-line func-names
    query: _.debounce(function (q) { this.search(q); }, 500),
  },
  methods: {
    searchLabel(node) {
      return node.searchText;
    },
    goToContent(node) {
      this.$emit('hit');
      if (node.kind === 'topic') {
        this.$router.push(`/${node.id}`);
      } else {
        goToContent(node);
      }
    },
    searchShown() {
      this.$nextTick(() => {
        this.$refs.search.$refs.input.focus();
      });
    },
    searchHidden() {
      // Empty search input on hide
      this.$refs.search.inputValue = '';
    },
    search(q) {
      const re = new RegExp(`(.{1,10})?${q}(.{1,10})?`, 'ig');
      this.searchNodes = this.nodes.map((node) => {
        const n = { ...node, searchText: node.title };
        if (n.description) {
          let matches = '';
          const match = [...n.description.matchAll(re)];
          if (match.length) {
            match.forEach(([m]) => {
              matches += ` ...${m}... `;
            });
            n.searchText = `${n.title}: ${matches}`;
          }
        }

        return n;
      });
    },
  },
};
</script>
