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
    <b-button-toolbar key-nav aria-label="Sections">
      <b-button-group
        class="mx-1 my-1"
        v-for="section in mainSections"
        :key="'menu-' + section.id"
      >
      <b-button pill variant="primary"
        :to="getSectionUrl(section)"
        :active="section === parentSection"
      >
        {{ section.title }}
      </b-button>
      </b-button-group>
    </b-button-toolbar>
  </b-jumbotron>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getSlug } from '@/utils';

export default {
  computed: {
    ...mapState(['channel', 'section', 'parentSection', 'displayLogoInHeader']),
    ...mapGetters(['headerDescription', 'mainSections']),
    mainSectionsInDropdown() {
      return this.mainSections.length >= 5;
    },
    ...mapGetters(['getAssetURL']),
    headerImageURL() {
      return this.getAssetURL('headerImage');
    },
  },
  methods: {
    getSectionUrl(section) {
      return `/#${getSlug(section.title)}`;
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
