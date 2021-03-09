<template>
  <b-container>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand to="/">
        <img
          v-if="channel.thumbnail"
          :src="channel.thumbnail"
          :alt="channel.title"
        />
        <span v-else>{{ channel.title }}</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <b-navbar-nav v-if="mainSectionsInDropdown">
          <b-nav-item-dropdown text="Topics" right>
            <b-dropdown-item
              v-for="section in mainSections"
              :to="getSectionUrl(section)"
              :key="'menu-' + section.id"
              :active="section === parentSection"
            >
              <span>{{ section.title }}</span>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav v-else>
          <b-nav-item
            v-for="section in mainSections"
            :to="getSectionUrl(section)"
            :key="'menu-' + section.id"
            :active="section === parentSection"
          >
            <span>{{ section.title }}</span>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-b-toggle:collapse-search>
            <b-icon-search></b-icon-search>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-collapse
      id="collapse-search"
      v-model="searchVisible"
      @shown="searchShown"
      @hidden="searchHidden"
    >
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
    </b-collapse>
  </b-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getSlug } from '@/utils';
import { goToContent } from 'kolibri-api';
import _ from 'underscore';

export default {
  name: 'Header',
  data() {
    return {
      query: '',
      searchVisible: false,
      searchNodes: [],
    };
  },
  computed: {
    ...mapState(['channel', 'nodes', 'parentSection']),
    ...mapGetters(['mainSections']),
    mainSectionsInDropdown() {
      return this.mainSections.length >= 5;
    },
  },
  watch: {
    // eslint-disable-next-line func-names
    query: _.debounce(function (q) { this.search(q); }, 500),
  },
  methods: {
    getSectionUrl(section) {
      return `/#${getSlug(section.title)}`;
    },
    searchLabel(node) {
      return node.searchText;
    },
    goToContent(node) {
      // Hide search on click on content
      this.searchVisible = false;

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
