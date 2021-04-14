<template>
  <b-jumbotron fluid :lead="headerDescription"
    :style="{ backgroundImage: headerImageURL }"
  >
    <template v-slot:header>
      <div class="d-flex justify-content-between align-items-start">
      <div>{{ section.title }}</div>
      <b-img
        v-if="displayLogoInHeader && channel.thumbnail"
        :src="channel.thumbnail"
        :alt="channel.title"
      />
      </div>
    </template>
    <HeaderSearchBar />
  </b-jumbotron>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState(['channel', 'section', 'displayLogoInHeader']),
    ...mapGetters(['headerDescription', 'getAssetURL']),
    headerImageURL() {
      return this.getAssetURL('headerImage');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles.scss';

.jumbotron {
  background-color: $body-bg;
  background-size: cover;
}

@include media-breakpoint-up(lg) {
  .lead {
    width: 50%;
  }
  .img {
    width: $header-logo-width;
  }
}
</style>
