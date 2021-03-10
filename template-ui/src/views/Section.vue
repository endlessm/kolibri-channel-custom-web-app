<template>
  <div
    id="section"
    :style="{ backgroundImage: backgroundImageURL }"
  >

  <b-container class="my-5">
      <SectionHeader :node="section" />
  </b-container>

  <CardGrid
    :key="section.id"
    :nodes="section.children"
    :id="section.id"
    variant="paginated"
    :itemsPerPage="6"
  />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { goToContent } from 'kolibri-api';
import dynamicRequireAsset from '@/dynamicRequireAsset';

const backgroundImage = dynamicRequireAsset('section-background.jpg');

export default {
  name: 'Section',
  data() {
    return {
      backgroundImageURL: backgroundImage ? `url(${backgroundImage})` : null,
    };
  },
  computed: {
    ...mapState(['section', 'parentSection']),
  },
  methods: {
    goToContent,
  },
};
</script>
