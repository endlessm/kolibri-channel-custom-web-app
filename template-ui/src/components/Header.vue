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
import { headerLogoWidth } from '@/styles.scss';

export default {
  data() {
    return {
      headerLogoWidth,
    };
  },
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

</style>
