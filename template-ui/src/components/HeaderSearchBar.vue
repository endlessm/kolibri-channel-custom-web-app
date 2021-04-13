<template>
  <b-row>
    <b-col md="6" sm="12">
      <vue-bootstrap-typeahead
        ref="search"
        v-model="query"
        inputClass="rounded-pill"
        placeholder="What do you want to learn about?"
        :serializer="searchLabel"
        :data="searchNodes"
        v-on:hit="goToContent"
      >
        <template #prepend>
          <span class="input-group-text">
            <b-icon-search />
          </span>
        </template>
      </vue-bootstrap-typeahead>

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
      this.$refs.search.inputValue = '';
      if (node.kind === 'topic') {
        this.$router.push(`/${node.id}`);
      } else {
        goToContent(node);
      }
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

<style lang="scss" scoped>
@import '@/styles.scss';

::v-deep .input-group {
  > input {
    padding-left: add($input-padding-x * 2, 1em);
  }
}
.input-group-text {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 4;
  background-color: transparent;
  border: none;
}
</style>
