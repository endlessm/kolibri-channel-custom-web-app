<template>
  <div id="app" class="d-flex flex-column h-100">
    <router-view>
      <Header />
    </router-view>
    <Footer />
  </div>
</template>

<script>
import { askChannelInformation } from 'kolibri-api';
import { mapMutations } from 'vuex';

let mockData;
if (process.env.VUE_APP_USE_MOCK_DATA === 'true') {
  // eslint-disable-next-line global-require
  mockData = require('@/nodes.json');
}

export default {
  name: 'App',
  watch: {
    $route(to) {
      // Watch the router "to" parameter, and set the navigation state accordingly.
      switch (to.name) {
        case 'Content':
          this.setContentNavigation({
            contentId: this.$route.params.contentId,
          });
          return;
        case 'Section':
          this.setSectionNavigation({
            topicId: this.$route.params.topicId,
          });
          return;
        case 'Home':
        default:
          this.setHomeNavigation();
      }
    },
  },
  methods: {
    ...mapMutations(['setContentNavigation', 'setSectionNavigation', 'setHomeNavigation']),
    gotChannelInformation(data) {
      this.$store.commit('setChannelInformation', data);
      this.$store.commit('setHomeNavigation');
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
