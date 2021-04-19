<template>
  <b-jumbotron fluid
    :style="{ backgroundImage: headerImageURL }"
  >
    <template v-slot:header>
      <div class="d-flex justify-content-between align-items-start">
      <div>{{ section.title }}</div>
      <b-img
        class="rounded-lg"
        :width="headerLogoWidth"
        v-if="displayLogoInHeader && channel.thumbnail"
        :src="channel.thumbnail"
      />
      </div>
    </template>
    <template v-slot:lead>
      <b-row>
        <b-col md="6" sm="12">
          <div>{{ headerDescription }}</div>
        </b-col>
      </b-row>
    </template>
    <HeaderSearchBar />
  </b-jumbotron>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import dynamicRequireAsset from '@/dynamicRequireAsset';
import { headerLogoWidth } from '@/styles.scss';
import { getSlug } from '@/utils';

export default {
  data() {
    return {
      headerLogoWidth,
    };
  },
  computed: {
    ...mapState(['channel', 'section', 'displayLogoInHeader']),
    ...mapGetters(['headerDescription', 'getAssetURL']),
    sectionImageURL() {
      if (!this.section || !this.section.title) {
        return null;
      }
      const sectionSlug = this.getSlug(this.section.title);
      const headerSectionFilename = `header-${sectionSlug}.jpg`;
      const headerSectionAsset = dynamicRequireAsset(headerSectionFilename);
      if (headerSectionAsset) {
        return `url(${headerSectionAsset})`;
      }
      return null;
    },
    headerImageURL() {
      return this.sectionImageURL || this.getAssetURL('headerImage');
    },
  },
  methods: {
    getSlug,
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles.scss';

.jumbotron {
  background-color: $body-bg;
  background-size: cover;
}

</style>
