<template>
  <div id="app">
    <b-container id="nav">
<b-row>
  <b-col md="auto">
      <b-button-toolbar>
        <b-button-group class="top">
          <b-button variant="light" to="/">
            <img :src="channel.thumbnail" :alt="channel.title" />
          </b-button>
          <b-button
            v-for="section in mainSections"
            variant="light"
            :to="getSectionUrl(section)"
            :key="'menu-' + section.id"
            :class="{ current: section === parentSection }"
          >
            <span>{{ section.title }}</span>
          </b-button>
          <b-button  variant="light" v-b-toggle:collapse-search>
            <b-icon-search></b-icon-search>
          </b-button>
        </b-button-group>
      </b-button-toolbar>
  </b-col>
</b-row>
<b-collapse id="collapse-search">
<b-row>
  <b-col md="12">
    <vue-bootstrap-typeahead
      v-model="query"
      placeholder="Search"
      :serializer="searchLabel"
      :data="contentNodes"
      v-on:hit="goToContent"
    />
  </b-col>
</b-row>
</b-collapse>

    </b-container>

    <router-view/>

    <div id="footer" class="mt-5 bg-secondary">
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
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
import { mapState, mapGetters } from 'vuex';
import { getSlug } from '@/utils';
import { goToContent, askChannelInformation } from 'kolibri-api';
import _ from 'underscore';

let mockData;
if (process.env.VUE_APP_USE_MOCK_DATA === 'true') {
  // eslint-disable-next-line global-require
  mockData = require('@/nodes.json');
}

export default {
  name: 'App',
  components: {
    VueBootstrapTypeahead,
  },
  data() {
    return {
      query: '',
    };
  },
  watch: {
    $route(to) {
      if (to.name !== 'Section') {
        this.$store.commit('setSection', { section: {}, parentSection: {} });
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
            parentSection: path[path.length - 2],
          });
      } else {
        this.$store.commit('setSection', { section: {}, parentSection: {} });
      }
    },
  },
  computed: {
    ...mapState(['channel', 'nodes', 'section', 'parentSection']),
    ...mapGetters(['tree', 'mainSections', 'contentNodes']),
  },
  methods: {
    gotChannelInformation(data) {
      this.$store.commit('setChannelInformation', data);
    },
    getSectionUrl(section) {
      return `/#${getSlug(section.title)}`;
    },
    searchLabel(node) {
      return node.title;
    },
    goToContent,
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
@import './styles.scss';

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

#nav {
  a {
    &.current, &.router-link-exact-active {
      color: $primary;
    }
  }
}

#footer {
  text-shadow: 1px 1px 2px #333;
}
</style>
