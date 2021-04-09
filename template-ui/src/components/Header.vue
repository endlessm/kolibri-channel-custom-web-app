<template>
  <b-jumbotron fluid :header="channel.title" :lead="channel.description"
    :style="{ backgroundImage: headerImageURL }"
  >
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
    ...mapState(['channel']),
    ...mapState(['parentSection']),
    ...mapGetters(['mainSections']),
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
}
</style>
