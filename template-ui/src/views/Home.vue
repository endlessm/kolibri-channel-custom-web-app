<template>
  <div
    id="home"
    :style="{ backgroundImage: backgroundImageURL }"
  >

    <CardGrid
      :nodes="contentNodes"
      id="content-nodes"
      v-if="contentNodes"
    />

    <CardGrid
      v-for="section in mainSections"
      :key="section.id"
      :nodes="section.children"
      :id="section.id"
    >
      <b-row>
        <SectionTitle :section="section" />
      </b-row>
    </CardGrid>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import dynamicRequireAsset from '@/dynamicRequireAsset';

const backgroundImage = dynamicRequireAsset('home-background.jpg');

export default {
  name: 'Home',
  data() {
    return {
      backgroundImageURL: backgroundImage ? `url(${backgroundImage})` : null,
    };
  },
  computed: {
    ...mapState(['channel', 'nodes', 'section']),
    ...mapGetters(['mainSections']),
    contentNodes() {
      if (!this.section || !this.section.children) {
        return null;
      }
      return this.section.children.filter((n) => n.kind !== 'topic') || null;
    },
  },
};
</script>
