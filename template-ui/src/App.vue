<template>
  <div id="app" class="d-flex flex-column h-100">
    <Header />
    <HeaderOld />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { askChannelInformation } from 'kolibri-api';
import _ from 'underscore';

let mockData;
if (process.env.VUE_APP_USE_MOCK_DATA === 'true') {
  // eslint-disable-next-line global-require
  mockData = require('@/nodes.json');
}

export default {
  name: 'App',
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
  },
  computed: {
    ...mapGetters(['tree']),
  },
  methods: {
    gotChannelInformation(data) {
      this.$store.commit('setChannelInformation', data);
      this.$store.commit('setSection', { section: this.tree[0], parentSection: {} });
      const uri = window.location.search.substring(1);
      const params = new URLSearchParams(uri);
      const topicId = params.get('topicId');
      if (topicId) {
        this.$router.push(`/${topicId}`);
      }
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

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
