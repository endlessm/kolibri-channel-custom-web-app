<template>
  <div id="app" class="d-flex flex-column h-100">
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
          <b-navbar-nav>
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

    <router-view />

    <div
      id="footer"
      class="mt-auto bg-secondary"
      :style="{ backgroundImage: footerImageURL }"
    >
      <b-container>
        <b-card class="border-0 bg-transparent text-light text-center">
          <h3>About {{ channel.title }}</h3>
          <p class="font-weight-bold">{{ channel.description }}</p>
        </b-card>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getSlug } from '@/utils';
import { goToContent, askChannelInformation } from 'kolibri-api';
import _ from 'underscore';
import dynamicRequireAsset from '@/dynamicRequireAsset';

const footerImage = dynamicRequireAsset('footer-background.jpg');

let mockData;
if (process.env.VUE_APP_USE_MOCK_DATA === 'true') {
  // eslint-disable-next-line global-require
  mockData = require('@/nodes.json');
}

export default {
  name: 'App',
  data() {
    return {
      query: '',
      searchVisible: false,
      searchNodes: [],
      footerImageURL: footerImage ? `url(${footerImage})` : null,
    };
  },
  watch: {
    $route(to) {
      if (to.name !== 'Section') {
        this.$store.commit('setSection', { section: this.tree[0], parentSection: {} });
        return;
      }

      let path;
      function hasPath(node, matchId) {
        path.push(node);

        // match!
        if (node.id === matchId) {
          return true;
        }

        // is a leaf?
        if (!node.children) {
          path.pop();
          return false;
        }

        // what about children? do recursion:
        const f = _.partial(hasPath, _, matchId);
        if (node.children.some(f)) {
          return true;
        }

        // not found in children:
        path.pop();
        return false;
      }

      path = [];
      if (hasPath(this.tree[0], to.params.topicId)) {
        this.$store.commit('setSection',
          {
            section: path[path.length - 1],
            parentSection: path[1],
          });
      } else {
        this.$store.commit('setSection', { section: this.tree[0], parentSection: {} });
      }
    },
    // eslint-disable-next-line func-names
    query: _.debounce(function (q) { this.search(q); }, 500),
  },
  computed: {
    ...mapState(['channel', 'nodes', 'section', 'parentSection']),
    ...mapGetters(['tree', 'mainSections']),
  },
  methods: {
    gotChannelInformation(data) {
      this.$store.commit('setChannelInformation', data);
      this.$store.commit('setSection', { section: this.tree[0], parentSection: {} });
    },
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
  created() {
    if (process.env.VUE_APP_USE_MOCK_DATA === 'true') {
      this.gotChannelInformation(mockData);
    } else {
      askChannelInformation(this.gotChannelInformation);
    }
  },
};
</script>

<style lang="scss">
@import '@/styles.scss';

html,
body {
  height: 100%;
}

.btn-group {
  display: initial !important;
}

.btn-toolbar img {
  height: 2em;
}

.btn-group > a:hover {
  color: $primary !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#footer {
  text-shadow: 1px 1px 2px #333;
}
</style>
